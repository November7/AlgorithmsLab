/* Copyright (c) 2026 Marcin Kowalski. SPDX-License-Identifier: GPL-3.0-only */
'use strict';

// Pure helpers shared by the simulations and their local regression tests.
const LabCore = (() => {
  function integer(value, label, minimum, maximum) {
    if (String(value).trim() === '' || !Number.isSafeInteger(Number(value)) || Number(value) < minimum || Number(value) > maximum) {
      throw new Error(`${label}: podaj liczbę całkowitą od ${minimum} do ${maximum}.`);
    }
    return Number(value);
  }

  function numbers(value, { label = 'Tablica', minimum = -100, maximum = 100, limit = 16 } = {}) {
    const parts = value.trim().split(/[\s,;]+/).filter(Boolean);
    if (!parts.length || parts.length > limit) throw new Error(`${label}: wpisz od 1 do ${limit} liczb oddzielonych spacjami.`);
    return parts.map(part => integer(part, label, minimum, maximum));
  }

  function characters(value, label, limit = 16) {
    const result = Array.from(value);
    if (result.length > limit) throw new Error(`${label}: maksymalnie ${limit} znaków.`);
    return result;
  }

  function graph(input, weighted = true) {
    const size = integer(input.size, 'Liczba wierzchołków', 1, 8);
    const lines = input.edges.trim() ? input.edges.trim().split(/[\n;]+/) : [];
    if (lines.length > 40) throw new Error('Podaj najwyżej 40 krawędzi.');
    const edges = lines.map((line, index) => {
      const parts = line.trim().split(/\s+/);
      if (parts.length !== (weighted ? 3 : 2)) throw new Error(`Krawędź ${index + 1}: format ${weighted ? 'od do waga' : 'od do'}.`);
      return {
        from: integer(parts[0], 'Początek krawędzi', 0, size - 1),
        to: integer(parts[1], 'Koniec krawędzi', 0, size - 1),
        weight: weighted ? integer(parts[2], 'Waga', -100, 100) : undefined
      };
    });
    return { size, edges };
  }

  const table = (title, headers, rows, active = [], accepted = []) => ({ title, headers, rows, active, accepted });
  const arrayTable = (values, active = [], accepted = [], title = 'Tablica (indeksy od 0)') =>
    table(title, ['i', ...values.map((_, index) => index)], [['A[i]', ...values]], active.map(index => [0, index + 1]), accepted.map(index => [0, index + 1]));
  const frame = (message, panels = [], extra = {}) => structuredClone({ message, panels, ...extra });
  const field = (id, label, value, extra = {}) => ({ id, label, value, ...extra });
  const example = (label, values) => ({ label, values });
  return { integer, numbers, characters, graph, table, arrayTable, frame, field, example };
})();

if (typeof module !== 'undefined') module.exports = LabCore;
