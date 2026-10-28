/* Copyright (c) 2026 Marcin Kowalski. SPDX-License-Identifier: GPL-3.0-only */
'use strict';

// Each generator yields immutable algorithm states. Back/forward navigation uses
// these same states, so rewinding also restores partial results and highlights.
(() => {
  const definition = window.LabDefinition;
  const { $: byId, svg: shape, element } = LabDom;
  const make = (tag, text, className) => element(tag, className ? { class: className } : {}, text);
  let mode, iterator, history = [], position = 0, timer = null, running = false, valid = false;
  const method = byId('method');
  for (const [key, value] of Object.entries(definition.modes)) method.add(new Option(value.title, key));
  const requested = new URLSearchParams(location.search).get('method');
  if (Object.hasOwn(definition.modes, requested)) method.value = requested;
  method.disabled = method.options.length === 1;

  function stop() {
    clearTimeout(timer);
    timer = null;
    running = false;
  }

  function synchronize() {
    const done = Boolean(history[position]?.done);
    byId('startBtn').disabled = !valid || running || done;
    byId('pauseBtn').disabled = !running;
    byId('stepBtn').disabled = !valid || running || done;
    byId('backBtn').disabled = running || position === 0;
    byId('stopBtn').disabled = !valid;
    byId('statusText').textContent = !valid ? 'Sprawdź dane' : done ? 'Zakończono' : running ? 'W trakcie' : position ? 'Pauza' : 'Gotowe';
    byId('stepCount').textContent = position;
  }

  function renderGraph(graph) {
    const svg = shape('svg');
    svg.setAttribute('viewBox', '0 0 640 320');
    svg.setAttribute('class', 'lab-board');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', graph.label || 'Graf skierowany. Krawędzie i stan wierzchołków opisano w tabelach poniżej.');
    const defs = shape('defs', {});
    const marker = shape('marker', { id: 'arrow', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' });
    marker.append(shape('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: 'context-stroke' }));
    defs.append(marker); svg.append(defs);
    const points = Array.from({ length: graph.size }, (_, index) => {
      const angle = 2 * Math.PI * index / graph.size - Math.PI / 2;
      return [320 + 235 * Math.cos(angle), 160 + 112 * Math.sin(angle)];
    });
    graph.edges.forEach((edge, index) => {
      const [x1, y1] = points[edge.from], [x2, y2] = points[edge.to];
      const distance = Math.hypot(x2 - x1, y2 - y1) || 1;
      const dx = (x2 - x1) * 23 / distance, dy = (y2 - y1) * 23 / distance;
      const reverse = graph.edges.some(other => other.from === edge.to && other.to === edge.from);
      const bend = reverse ? 24 : 0;
      const middleX = (x1 + x2) / 2 - (y2 - y1) * bend / distance;
      const middleY = (y1 + y2) / 2 + (x2 - x1) * bend / distance;
      const path = edge.from === edge.to
        ? `M ${x1 + 17} ${y1 - 14} C ${x1 + 80} ${y1 - 60}, ${x1 + 80} ${y1 + 60}, ${x1 + 17} ${y1 + 14}`
        : `M ${x1 + dx} ${y1 + dy} Q ${middleX} ${middleY} ${x2 - dx} ${y2 - dy}`;
      svg.append(shape('path', { d: path, class: `lab-edge ${graph.activeEdges?.includes(index) ? 'current' : ''}`, 'marker-end': 'url(#arrow)' }));
      if (edge.weight !== undefined) svg.append(shape('text', { x: edge.from === edge.to ? x1 + 62 : middleX, y: edge.from === edge.to ? y1 + 4 : middleY - 7, class: 'lab-node-note' }, edge.weight));
    });
    points.forEach(([x, y], index) => {
      const state = graph.activeNodes?.includes(index) ? 'current' : graph.acceptedNodes?.includes(index) ? 'accepted' : '';
      svg.append(shape('circle', { cx: x, cy: y, r: 20, class: `lab-node ${state}` }));
      svg.append(shape('text', { x, y: y + 5, class: `lab-number ${state}` }, index));
    });
    const viewport = make('div', undefined, 'lab-viewport');
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Przewijany graf');
    viewport.append(svg);
    return viewport;
  }

  function render() {
    const state = history[position];
    byId('panels').replaceChildren();
    if (!state) { synchronize(); return; }
    byId('operation').textContent = state.message;
    byId('resultText').textContent = state.result ?? 'Wynik pojawi się po zakończeniu.';
    if (state.graph) byId('panels').append(renderGraph(state.graph));
    if (state.tree) byId('panels').append(renderTree(state.tree));
    for (const panel of state.panels) {
      const viewport = make('div', undefined, 'lab-dp-viewport');
      viewport.tabIndex = 0;
      viewport.setAttribute('role', 'region');
      viewport.setAttribute('aria-label', panel.title);
      const table = make('table', undefined, 'graph-table lab-dp');
      table.append(make('caption', panel.title));
      const head = make('thead'), heading = make('tr');
      panel.headers.forEach(value => { const cell = make('th', value); cell.scope = 'col'; heading.append(cell); });
      head.append(heading); table.append(head);
      const body = make('tbody');
      panel.rows.forEach((row, rowIndex) => {
        const tr = make('tr');
        row.forEach((value, columnIndex) => {
          const cell = make(columnIndex === 0 ? 'th' : 'td', value === Infinity ? '∞' : value === -Infinity ? '−∞' : value ?? '·');
          if (columnIndex === 0) cell.scope = 'row';
          const contains = list => list.some(([r, c]) => r === rowIndex && c === columnIndex);
          if (contains(panel.active)) { cell.className = 'lab-current'; cell.setAttribute('aria-label', `${cell.textContent}, bieżący element`); }
          else if (contains(panel.accepted)) cell.className = 'lab-accepted';
          tr.append(cell);
        });
        body.append(tr);
      });
      table.append(body); viewport.append(table); byId('panels').append(viewport);
    }
    synchronize();
  }

  function renderTree(tree) {
    const children = new Map(tree.nodes.map(node => [node.id, []]));
    tree.nodes.forEach(node => { if (node.parent !== null) children.get(node.parent).push(node.id); });
    const positions = new Map();
    let leaves = 0, depth = 0;
    function place(id, level) {
      depth = Math.max(depth, level);
      const descendants = children.get(id);
      descendants.forEach(child => place(child, level + 1));
      const x = descendants.length ? descendants.reduce((sum, child) => sum + positions.get(child).x, 0) / descendants.length : 45 + 78 * leaves++;
      positions.set(id, { x, y: 40 + level * 80 });
    }
    tree.nodes.filter(node => node.parent === null).forEach(node => place(node.id, 0));
    const width = Math.max(580, leaves * 78 + 20), height = depth * 80 + 90;
    const svg = shape('svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width); svg.setAttribute('height', height);
    svg.setAttribute('class', 'lab-tree-board'); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Drzewo. Szczegóły węzłów i przedziałów znajdują się w tabeli poniżej.');
    tree.nodes.forEach(node => {
      if (node.parent === null) return;
      const from = positions.get(node.parent), to = positions.get(node.id);
      svg.append(shape('line', { x1: from.x, y1: from.y, x2: to.x, y2: to.y, class: `lab-edge ${node.active ? 'current' : ''}` }));
    });
    tree.nodes.forEach(node => {
      const { x, y } = positions.get(node.id);
      const state = node.active ? 'current' : node.accepted ? 'accepted' : '';
      svg.append(shape('circle', { cx: x, cy: y, r: 23, class: `lab-node ${state}` }));
      svg.append(shape('text', { x, y: y + 5, class: `lab-number ${state}` }, node.label));
      svg.append(shape('text', { x, y: y + 40, class: 'lab-node-note' }, node.note || ''));
    });
    const viewport = make('div', undefined, 'lab-viewport');
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Przewijane drzewo');
    viewport.append(svg);
    return viewport;
  }

  function reset() {
    stop();
    history = []; position = 0; valid = false;
    try {
      const input = Object.fromEntries(mode.fields.map(field => [field.id, byId(field.id).value]));
      iterator = mode.run(input);
      const initial = iterator.next(); // Parsing occurs before the first frame.
      if (initial.done) throw new Error('Brak stanu początkowego.');
      history.push(initial.value); valid = true;
      byId('inputError').textContent = '';
    } catch (error) {
      byId('inputError').textContent = error.message;
      byId('operation').textContent = 'Popraw dane wejściowe, aby uruchomić symulację.';
      byId('resultText').textContent = 'Brak wyniku.';
    }
    render();
  }

  function next() {
    if (!valid || history[position].done) return;
    if (position + 1 < history.length) position++;
    else {
      const step = iterator.next();
      if (step.done) { stop(); return; }
      history.push(step.value); position++;
    }
    if (history[position].done) stop();
    render();
  }

  function start() {
    if (!valid || running || history[position].done) return;
    running = true;
    const tick = () => {
      next();
      if (running) timer = setTimeout(tick, 1000 / Number(byId('speed').value));
    };
    tick();
  }

  function selectMode() {
    stop(); mode = definition.modes[method.value];
    byId('lessonTitle').textContent = mode.title;
    byId('explanation').textContent = mode.explanation;
    byId('correctness').textContent = mode.correctness;
    byId('applications').textContent = mode.applications;
    byId('complexityNote').textContent = mode.note;
    byId('rule').textContent = mode.rule;
    byId('timeComplexity').textContent = mode.time;
    byId('spaceComplexity').textContent = mode.space;
    byId('steps').replaceChildren(...mode.steps.map(step => make('li', step)));
    byId('inputFields').replaceChildren();
    for (const field of mode.fields) {
      const wrapper = make('div', undefined, 'field');
      const label = make('label', field.label); label.htmlFor = field.id;
      let input;
      if (field.options) {
        input = make('select');
        field.options.forEach(([value, title]) => input.add(new Option(title, value)));
      } else {
        input = make(field.multiline ? 'textarea' : 'input');
        if (field.multiline) { input.rows = 3; input.className = 'lab-textarea'; }
        else input.type = field.type || 'text';
        if (field.min !== undefined) input.min = field.min;
        if (field.max !== undefined) input.max = field.max;
        if (field.type === 'number') input.step = '1';
      }
      input.id = field.id; input.value = field.value;
      input.addEventListener(field.options ? 'change' : 'input', () => { byId('scenario').value = 'custom'; reset(); });
      wrapper.append(label, input); byId('inputFields').append(wrapper);
    }
    byId('scenario').replaceChildren();
    mode.examples.forEach((example, index) => byId('scenario').add(new Option(example.label, index)));
    byId('scenario').add(new Option('Własne dane', 'custom'));
    reset();
  }

  method.addEventListener('change', selectMode);
  byId('scenario').addEventListener('change', () => {
    const example = mode.examples[Number(byId('scenario').value)];
    if (example) for (const [key, value] of Object.entries(example.values)) byId(key).value = value;
    reset();
  });
  byId('startBtn').addEventListener('click', start);
  byId('pauseBtn').addEventListener('click', () => { stop(); synchronize(); });
  byId('stepBtn').addEventListener('click', next);
  byId('backBtn').addEventListener('click', () => { stop(); if (position) position--; render(); });
  byId('stopBtn').addEventListener('click', reset);
  byId('speed').addEventListener('input', () => { byId('speedLabel').textContent = `${byId('speed').value} op./s`; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stop(); synchronize(); } });
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.target.closest('input, select, textarea, button, a, summary, [role="region"]') || event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); stop(); next(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); stop(); if (position) position--; render(); }
    if (event.key === ' ') { event.preventDefault(); if (running) { stop(); synchronize(); } else start(); }
  });
  selectMode();
})();
