/* Copyright (c) 2026 Marcin Kowalski. SPDX-License-Identifier: GPL-3.0-only */
'use strict';

// Generator playback for simulations that update their own state in place.
// Load lab-dom.js first; preserve the Lab API used by these simulations.
window.Lab = (() => {
  const { $, text } = LabDom;
  function controller({ run, render, reset, validate = () => true, locked = [], manual = () => false, update = () => {} }) {
    let iterator = null, timer = null, replayRun = run, replayReset = reset;
    const api = { running: false, done: false, steps: 0, started: false, autoStarted: false,
      sync() {
        $('startBtn').disabled = api.autoStarted && !api.done || manual();
        $('pauseBtn').disabled = !api.started || api.done || manual();
        text('pauseBtn', api.started && !api.running ? 'Wznów' : 'Pauza');
        $('stepBtn').disabled = api.running || manual();
        $('backBtn').disabled = api.running || api.steps === 0 || manual();
        $('stopBtn').disabled = !api.started && !api.autoStarted;
        locked.forEach(id => { $(id).disabled = api.running; $(id).setAttribute('aria-disabled', String(api.running)); });
        $('speed').disabled = manual();
        text('statusText', manual() ? (api.done ? 'Ukończono' : 'Tryb ręczny') : api.done ? 'Zakończono' : api.running ? 'W trakcie' : api.started ? 'Pauza' : 'Gotowe');
        update(api);
      },
      refresh() { render(); api.sync(); },
      pause() { clearTimeout(timer); timer = null; api.running = false; api.sync(); },
      reset() { api.restart(run, reset); },
      restart(nextRun, nextReset) {
        api.pause(); iterator = null; api.done = false; api.started = false; api.autoStarted = false; api.steps = 0;
        replayRun = nextRun; replayReset = nextReset;
        text('operation', 'Wybierz Start lub wykonaj pierwszy krok.'); text('resultText', 'Wynik pojawi się po zakończeniu.');
        replayReset(); api.refresh();
      },
      next() {
        if (manual() || !validate()) return;
        if (api.done) api.reset();
        api.started = true; iterator ||= replayRun();
        const result = iterator.next();
        if (result.done) { api.done = true; api.pause(); if (result.value) text('operation', result.value); }
        else { api.steps++; text('operation', result.value); }
        api.refresh();
      },
      start() {
        if (api.running || manual() || !validate()) return;
        if (api.done) api.reset();
        api.autoStarted = true;
        api.running = true; api.next();
        const tick = () => {
          if (!api.running) return;
          api.next();
          if (api.running) timer = setTimeout(tick, 1000 / Number($('speed').value));
        };
        if (api.running) timer = setTimeout(tick, 1000 / Number($('speed').value));
      },
      replace(generator, { replay = run, restore = reset, steps = api.steps } = {}) {
        api.pause(); iterator = generator; replayRun = replay; replayReset = restore;
        api.steps = steps; api.done = false; api.started = false; api.autoStarted = false; api.sync();
      },
      // Replay from the input snapshot belonging to the current operation.
      rewind(count) {
        const autoStarted = api.autoStarted;
        api.restart(replayRun, replayReset);
        for (let i = 0; i < count; i++) api.next();
        api.autoStarted = autoStarted && count > 0; api.sync();
      },
      previous() { if (api.steps > 0) api.rewind(api.steps - 1); }
    };
    $('startBtn').addEventListener('click', api.start);
    $('pauseBtn').addEventListener('click', () => api.running ? api.pause() : api.start());
    $('stepBtn').addEventListener('click', () => { api.pause(); api.next(); });
    $('backBtn').addEventListener('click', () => { api.pause(); api.previous(); });
    $('stopBtn').addEventListener('click', api.reset);
    $('speed').addEventListener('input', () => text('speedLabel', `${$('speed').value} op./s`));
    document.addEventListener('visibilitychange', () => { if (document.hidden && api.running) api.pause(); });
    document.addEventListener('keydown', event => {
      if (event.defaultPrevented || event.target.closest('input, select, textarea') || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        if (api.running) api.pause();
        if (event.key === 'ArrowLeft') api.previous(); else api.next();
      }
      if (event.key === ' ' && !event.target.closest('a, button, summary, [role="button"], [role="gridcell"]')) { event.preventDefault(); api.running ? api.pause() : api.start(); }
      if (event.key.toLowerCase() === 'n' && !api.running) api.next();
      if (event.key.toLowerCase() === 'r') api.reset();
    });
    return api;
  }
  return { ...LabDom, controller };
})();
