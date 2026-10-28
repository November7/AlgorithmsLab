/* Copyright (c) 2026 Marcin Kowalski. SPDX-License-Identifier: GPL-3.0-only */
'use strict';

// A frame clock owns scheduling only; each simulation owns its algorithm state.
window.LabAnimation = (() => {
  function create({ isRunning, getSpeed, step, render = () => {}, maxSteps = 100 }) {
    let frameId = null, lastTime = null, budget = 0;

    function resetTime() {
      lastTime = null;
      budget = 0;
    }

    function stop() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      resetTime();
    }

    function request() {
      if (frameId === null) frameId = requestAnimationFrame(tick);
    }

    function tick(time) {
      frameId = null;
      if (isRunning() && !document.hidden) {
        // Cap elapsed time so returning to a busy tab cannot skip the animation.
        if (lastTime !== null) budget += Math.min(Math.max(time - lastTime, 0), 100) * getSpeed() / 1000;
        lastTime = time;
        let count = 0;
        while (budget >= 1 && isRunning() && count++ < maxSteps) {
          budget--;
          step();
        }
      } else lastTime = null;
      render();
      if (isRunning() && !document.hidden) request();
    }

    return { request, resetTime, stop };
  }
  return { create };
})();
