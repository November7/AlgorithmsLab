/* Copyright (c) 2026 Marcin Kowalski. SPDX-License-Identifier: GPL-3.0-only */
'use strict';

// Shared geometry for the sorting, searching, and minimum/maximum bar charts.
window.LabCanvas = (() => {
  function resize(canvas, context) {
    const bounds = canvas.parentElement.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, bounds.width), height = Math.max(1, bounds.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width, height };
  }

  function axis(context, { width, height, left, right, top, bottom, maximum, interval }) {
    context.clearRect(0, 0, width, height);
    const chartHeight = Math.max(1, height - top - bottom);
    const chartWidth = Math.max(1, width - left - right);
    context.font = '10px "Segoe UI", sans-serif';
    context.textAlign = 'right';
    for (let value = 0; value <= maximum; value += interval) {
      const y = top + chartHeight * (1 - value / maximum);
      context.fillStyle = '#657995';
      context.fillText(String(value), left - 7, y + 3);
      context.fillStyle = '#e7edf6';
      context.fillRect(left, y, chartWidth, 1);
    }
    return { chartHeight, chartWidth };
  }

  function bar(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x, y + height);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height);
    context.closePath();
    context.fill();
  }

  return { resize, axis, bar };
})();
