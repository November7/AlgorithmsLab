/* Copyright (c) 2026 Marcin Kowalski. SPDX-License-Identifier: GPL-3.0-only */
'use strict';

// DOM and SVG helpers shared by the original and newer simulations.
window.LabDom = (() => {
  const $ = id => document.getElementById(id);
  const text = (id, value) => { if ($(id)) $(id).textContent = value; };
  function element(tag, attrs = {}, content) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    if (content !== undefined) node.textContent = content;
    return node;
  }
  function svg(tag, attrs = {}, content) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
    if (content !== undefined) node.textContent = content;
    return node;
  }
  function action(node, callback, label, key) {
    node.setAttribute('tabindex', '0'); node.setAttribute('role', 'button');
    node.setAttribute('aria-label', label); node.setAttribute('data-focus', key);
    node.addEventListener('click', callback);
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); callback(event); }
    });
    return node;
  }
  function paint(node, draw) {
    const focus = node.contains(document.activeElement) ? document.activeElement.getAttribute('data-focus') : null;
    node.replaceChildren(); draw(node);
    if (focus !== null) [...node.querySelectorAll('[data-focus]')].find(el => el.getAttribute('data-focus') === focus)?.focus({ preventScroll: true });
  }
  function tokens(id, items, callback) {
    paint($(id), root => items.forEach((item, i) => {
      const li = element('li', { class: item.className || '' });
      if (callback) {
        const button = element('button', { type: 'button', 'data-focus': String(i) }, item.label ?? item);
        button.addEventListener('click', event => callback(i, event)); li.append(button);
      } else li.textContent = item.label ?? item;
      root.append(li);
    }));
  }
  function node(root, x, y, label, style = '', note = '', callback, key = label, radius = 19) {
    const group = svg('g', { transform: `translate(${x} ${y})` });
    group.append(svg('circle', { r: radius, class: `lab-node ${style}${radius < 19 ? ' compact' : ''}` }), svg('text', { y: 5, class: `lab-number ${style}` }, label));
    if (note !== '') group.append(svg('text', { y: radius + 17, class: 'lab-node-note' }, note));
    if (callback) action(group, callback, `${label}, ${note}`, String(key));
    root.append(group); return group;
  }
  function point(board, event) {
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(board.getScreenCTM().inverse());
  }
  function algorithmPicker(id, algorithms, onSelect) {
    const rows = Object.entries(algorithms).map(([key, info], index) => {
      const row = element('div', { class: 'algorithm-row' });
      const button = element('button', { type: 'button', class: 'algorithm-pick', 'data-algorithm': key });
      button.append(
        element('span', { class: 'ordinal', 'aria-hidden': 'true' }, String(index + 1).padStart(2, '0')),
        element('span', {}, info.name)
      );
      button.addEventListener('click', () => onSelect(key));
      row.append(button);
      return row;
    });
    $(id).replaceChildren(...rows);
  }
  return { $, text, element, svg, action, paint, tokens, node, point, algorithmPicker };
})();
