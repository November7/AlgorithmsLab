## AlgorithmsLab

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://november7.github.io/AlgorithmsLab/)
[![Język-Polski-red](https://img.shields.io/badge/J%C4%99zyk-Polski-red)](#polski)
[![Language-English-success](https://img.shields.io/badge/Language-English-success)](#english)
[![License: GPL-3.0-only](https://img.shields.io/badge/License-GPL--3.0--only-blue)](LICENSE)

## Polski

**Polska wersja tego README jest źródłowa. Wersja angielska jest jej tłumaczeniem.** Zasada ta dotyczy dokumentacji, nie tekstu licencji: obowiązuje oryginalny angielski tekst w pliku [LICENSE](LICENSE).

AlgorithmsLab to zbiór pokazowych, interaktywnych wizualizacji algorytmów, struktur danych i operatorów w językach programowania. Przykłady są przygotowane w HTML, CSS i JavaScript i pozwalają obserwować kolejne kroki oraz zmieniać dane wejściowe. Interfejs modułów jest w języku polskim.

**[Otwórz wizualizacje w przeglądarce](https://november7.github.io/AlgorithmsLab/)**

### Charakter i przeznaczenie projektu

**Projekt jest materiałem pokazowym, niezweryfikowanym i nie jest materiałem edukacyjnym.** Służy jako inspiracja do tworzenia interaktywnych przykładów, wizualizacji i interfejsów.

Implementacje, opisy, pseudokod, analizy złożoności i prezentowane wyniki mogą zawierać błędy, nieścisłości lub uproszczenia. Projekt nie przeszedł niezależnej weryfikacji merytorycznej ani dydaktycznej. Nie należy traktować go jako podręcznika, wiarygodnego źródła wiedzy o algorytmach ani zestawu implementacji gotowych do zastosowań produkcyjnych.

Moduły operują na ograniczonych zbiorach danych i wybranych scenariuszach. Liczniki operacji oraz tempo animacji nie są pomiarami wydajności algorytmów. Przykłady operatorów ilustrują wybrane reguły i różnice między językami, nie zastępują ich specyfikacji ani rzeczywistych środowisk wykonawczych.

Przed wykorzystaniem pomysłów lub kodu we własnych materiałach należy niezależnie sprawdzić poprawność algorytmów, warunki ich stosowania, przypadki brzegowe i opisy. Informacje te określają przeznaczenie i ograniczenia projektu, nie wprowadzają dodatkowych ograniczeń praw przyznanych przez GPL v3.

### Dostępne moduły

| Moduł | Zakres |
| --- | --- |
| [Minimum i maksimum](minmax.html) | Porównywanie metod wyznaczania wartości skrajnych. |
| [Wyszukiwanie](search.html) | Wyszukiwanie elementów w tablicy i obserwowanie porównań. |
| [Usuwanie duplikatów](duplicates.html) | Zbiór, sortowanie, porównywanie z wynikiem i tablica obecności. |
| [Sortowanie](sort.html) | Wizualizacja porównań, zamian i zapisów w różnych algorytmach. |
| [DFS i BFS](dfs-bfs.html) | Przeszukiwanie grafów w głąb i wszerz. |
| [Najniższy wspólny przodek (LCA)](lca.html) | Wspólny przodek dwóch wierzchołków drzewa. |
| [Dijkstra](dijkstra.html) | Najkrótsze ścieżki w grafie z nieujemnymi wagami. |
| [Kruskal i Prim](kruskal.html) | Porównanie minimalnych drzew i lasów rozpinających na tym samym grafie. |
| [Sortowanie topologiczne Kahna](topological.html) | Kolejność zadań z zależnościami i wykrywanie cyklu. |
| [Problem plecakowy 0/1](knapsack.html) | Tabela programowania dynamicznego i wybór przedmiotów. |
| [Odległość edycyjna Levenshteina](edit-distance.html) | Tabela programowania dynamicznego i odtwarzanie operacji edycji. |
| [Bellman-Ford](bellman-ford.html) | Najkrótsze ścieżki z ujemnymi wagami i wykrywanie ujemnego cyklu osiągalnego ze startu. |
| [Union-Find](union-find.html) | Zbiory rozłączne, łączenie według rangi i kompresja ścieżek. |
| [KMP i Rabin-Karp](kmp.html) | Tablica prefikso-sufiksów, skrót kroczący i weryfikacja kolizji. |
| [Kopiec binarny](heap.html) | Kolejka priorytetowa, wstawianie, usuwanie korzenia i sortowanie przez kopcowanie. |
| [Sito Eratostenesa](sieve.html) | Znajdowanie liczb pierwszych przez wykreślanie wielokrotności. |
| [Wieże Hanoi](hanoi.html) | Rekurencyjne przenoszenie krążków i stos wywołań. |
| [Operatory](operators.html) | Operatory arytmetyczne, relacji, logiczne, bitowe i przypisania oraz różnice między językami. |
| [Drzewa Fenwicka i przedziałowe](range-trees.html) | Budowa drzew, sumy zakresów i aktualizacje punktowe na wspólnym zestawie operacji. |
| [Techniki pracy na tablicach](array-techniques.html) | Kadane, sumy prefiksowe i dwa wskaźniki do szukania pary o zadanej sumie. |
| [Algorytmy arytmetyczne](number-theory.html) | Rozszerzony Euklides i dokładne szybkie potęgowanie, także modulo. |
| [Podciągi i monety](sequence-dp.html) | LCS, LIS i wydawanie reszty z odtwarzaniem rozwiązania. |
| [Analiza grafów skierowanych](graph-analysis.html) | Floyd-Warshall z ujemnymi cyklami i silnie spójne składowe Kosaraju. |
| [Trie](trie.html) | Budowa drzewa słów, wyszukiwanie pełnych słów i prefiksów. |
| [Przeszukiwanie z nawrotami](backtracking.html) | Pierwsze rozwiązanie problemu N hetmanów i wycofywanie decyzji. |
| [Zachłanny wybór zadań](activity-selection.html) | Maksymalny zestaw niepokrywających się przedziałów i oś czasu. |
| [Algorytm Huffmana](huffman.html) | Budowanie drzewa kodów prefiksowych i kodowanie tekstu według częstości znaków. |

Wybierz moduł, ustaw dane lub scenariusz i uruchom animację albo przechodź między krokami. Dostępne ustawienia zależą od przykładu. Katalog wyświetlany na stronie głównej pochodzi z pliku [algorithms.json](algorithms.json).

### Uruchomienie lokalne

Projekt jest statyczną stroną. Nie wymaga instalowania zależności ani kompilacji. Potrzebna jest przeglądarka z włączonym JavaScriptem. Całą stronę należy uruchomić przez serwer HTTP; poniższy przykład korzysta z Pythona 3.

1. Pobierz repozytorium jako ZIP i rozpakuj je lub sklonuj je za pomocą Git:

   ```sh
   git clone https://github.com/November7/AlgorithmsLab.git
   cd AlgorithmsLab
   ```

2. W katalogu projektu uruchom serwer:

   ```sh
   python -m http.server 8000 --bind 127.0.0.1
   ```

3. Otwórz [http://localhost:8000](http://localhost:8000) w przeglądarce. Aby zatrzymać serwer, naciśnij `Ctrl+C` w terminalu.

Na Windows możesz użyć `py` zamiast `python`, a na macOS i Linux `python3`.

Poszczególne moduły, np. `bellman-ford.html`, można również otworzyć bezpośrednio z dysku i używać offline, zachowując `styles.css` oraz katalog `scripts/` obok plików HTML. Strona główna pobiera `README.md` i `algorithms.json` przez `fetch`, dlatego wymaga serwera HTTP. Biblioteki do wyświetlania README są dostępne lokalnie w `vendor/`; odznaki w README są pobierane z internetu.

### Struktura projektu

```text
AlgorithmsLab/
├── vendor/              # Biblioteki zewnętrzne i ich licencje
├── algorithms.json      # Katalog modułów strony głównej
├── index.html           # Strona główna z README i listą modułów
├── bellman-ford.html     # Wizualizacja algorytmu Bellmana-Forda
├── sort.html            # Wizualizacje sortowania
├── lca.html             # Najniższy wspólny przodek
├── sieve.html           # Sito Eratostenesa
├── ...                  # Pozostałe moduły HTML z tabeli powyżej
├── scripts/             # Wspólne sterowanie, rysowanie i walidacja symulacji
├── styles.css           # Wspólne style wszystkich stron
├── AGENTS.md            # Wskazówki pracy nad repozytorium
├── .gitignore           # Reguły ignorowania lokalnego katalogu tests/
├── README.md            # Dokumentacja polska i angielska
└── LICENSE              # Pełny tekst GNU GPL v3
```

Kod konkretnej symulacji pozostaje w jej HTML. Wspólne funkcje starszych i nowych modułów znajdują się w `scripts/`:

| Plik | Odpowiedzialność |
| --- | --- |
| `lab-dom.js` | Tworzenie elementów HTML i SVG, list wyboru algorytmu, etykiety, obsługa klawiatury i zachowanie fokusu przy rysowaniu. |
| `lab-controller.js` | Wspólne sterowanie siedmiu starszych symulacji przez API `Lab`: start, pauza, kroki i cofanie przez odtworzenie algorytmu. Wymaga `lab-dom.js`. |
| `lab-animation.js` | Zegar `requestAnimationFrame` używany przez sortowanie, wyszukiwanie, minimum/maksimum, Kruskala/Prima, sortowanie topologiczne i problem plecakowy. Ogranicza nadrabianie czasu i zapobiega podwójnemu planowaniu klatek. |
| `lab-canvas.js` | Skalowanie płótna do gęstości pikseli ekranu oraz rysowanie osi i słupków w trzech modułach tablicowych. |
| `lab-core.js` | Walidacja danych i przygotowanie stanów nowych symulacji. |
| `lab-player.js` | Odtwarzanie zapisanych stanów nowych symulacji. Wymaga `lab-dom.js`, `lab-core.js` oraz definicji `LabDefinition` z HTML. |

Skrypty ładujemy w kolejności zależności, przed kodem, który ich używa. Dwa mechanizmy odtwarzania obsługują różne modele stanu: starsze generatory zmieniają stan symulacji, nowsze przekazują jego zapisane kopie. Moduły z odmiennym sterowaniem, np. animowanym sortowaniem lub przeciąganiem grafu, zachowują własne operacje i reguły sterowania w HTML; sam zegar może być wspólny. Wspólne funkcje rysowania wykorzystują także LCA, Huffman, Kruskal i sortowanie topologiczne.

Style współdzielonych komponentów pozostają w `styles.css`: listy wartości, formularze, znaczniki i stany diagramów. Różnice geometrii i układu konkretnej symulacji mają własne selektory. Przy zmianach CSS należy zachować kolejność reguł i ich specyficzność, zwłaszcza w widokach mobilnych.

Pokrewne algorytmy wybiera się z listy; odnośniki katalogu z parametrem `method` otwierają odpowiedni wariant.

### Testy i rozwój

Katalog `tests/` służy do lokalnych testów i jest pomijany przez Git. Jego pliki pozostają na dysku, ale nie są częścią repozytorium pobieranego przez klonowanie lub jako ZIP.

Jeśli masz lokalne pliki `tests/*.test.cjs` wraz z używanymi przez nie plikami pomocniczymi, uruchom je z katalogu projektu:

```sh
node --test tests/*.test.cjs
```

Te testy korzystają z wbudowanego modułu `node:test` w Node.js i nie wymagają dodatkowych pakietów. Sprawdzają wybrane wyniki i zachowania interfejsu przy użyciu uproszczonego modelu DOM. Lokalne skrypty przeglądarkowe `tests/*.browser.cjs` wymagają osobno dostępnego Playwrighta i przeglądarki oraz dopasowania ścieżek do własnego środowiska. Testy nie zastępują niezależnej weryfikacji merytorycznej ani kontroli wizualnej w przeglądarce.

Przy dodawaniu modułu uzupełnij `algorithms.json` i obie wersje językowe README. Korzystaj z `styles.css` oraz odpowiedniego wzorca, np. `sort.html`, `lca.html` lub `sieve.html`. Po zmianach sprawdź działanie stron, nawigację krokową i układ na różnych szerokościach ekranu. W zgłoszeniu błędu podaj moduł, dane wejściowe, kroki odtworzenia oraz oczekiwany i rzeczywisty wynik.

### Autorstwo i wykorzystanie AI

Autorem projektu jest Marcin Kowalski (November7). README i symulacje są tworzone przy użyciu narzędzi sztucznej inteligencji. Udział AI oraz przegląd kodu nie stanowią potwierdzenia poprawności algorytmicznej ani dydaktycznej materiałów.

### Licencja

Copyright (c) 2024-2026 Marcin Kowalski.

Projekt jest udostępniany na licencji **GNU General Public License, wyłącznie wersja 3**. Identyfikator SPDX: `GPL-3.0-only`. Pełny, oryginalny angielski tekst i warunki znajdują się w pliku [LICENSE](LICENSE).

Projekt jest udostępniany bez gwarancji, w zakresie określonym w licencji. Przy używaniu, modyfikowaniu i rozpowszechnianiu należy przestrzegać jej warunków. Ten opis nie zastępuje pełnego tekstu licencji.

Komponenty zewnętrzne zachowują własne licencje i informacje o autorach:

| Komponent | Autorstwo i licencja |
| --- | --- |
| [Marked 15.0.12](https://github.com/markedjs/marked/tree/v15.0.12), `vendor/marked.min.js` | Christopher Jeffrey i MarkedJS, MIT. [Pełne informacje licencyjne](vendor/marked.LICENSE.md) obejmują także notę dotyczącą Markdown autorstwa Johna Grubera. |
| [github-markdown-css](https://github.com/sindresorhus/github-markdown-css), `vendor/github-markdown.min.css` | Sindre Sorhus, [MIT](vendor/github-markdown.LICENSE). |

## English

**The Polish version of this README is the source version. The English version is its translation.** This rule applies to the documentation, not the license text: the original English text in [LICENSE](LICENSE) governs the license.

AlgorithmsLab is a collection of demonstration-only interactive visualizations of algorithms, data structures, and programming language operators. The examples are built with HTML, CSS, and JavaScript and let you inspect individual steps and change input data. The module interfaces are in Polish.

**[Open the visualizations in your browser](https://november7.github.io/AlgorithmsLab/)**

### Purpose and limitations

**This project is unverified demonstration material and is not educational material.** It serves as inspiration for creating interactive examples, visualizations, and interfaces.

Implementations, explanations, pseudocode, complexity analyses, and displayed results may contain errors, inaccuracies, or simplifications. The project has not undergone independent technical or educational validation. It should not be treated as a textbook, a reliable reference on algorithms, or a collection of production-ready implementations.

The modules use limited datasets and selected scenarios. Operation counters and animation speed are not algorithm performance measurements. The operator examples illustrate selected rules and differences between languages; they do not replace language specifications or actual runtimes.

Before reusing ideas or code in your own materials, independently verify algorithm correctness, prerequisites, edge cases, and explanations. These statements describe the project's purpose and limitations; they do not impose additional restrictions on the rights granted by GPL v3.

### Available modules

| Module | Scope |
| --- | --- |
| [Minimum and maximum](minmax.html) | Comparing methods for finding extreme values. |
| [Searching](search.html) | Finding array elements and inspecting comparisons. |
| [Duplicate removal](duplicates.html) | Sets, sorting, comparing against the result, and presence arrays. |
| [Sorting](sort.html) | Visualizing comparisons, swaps, and writes in different algorithms. |
| [DFS and BFS](dfs-bfs.html) | Depth-first and breadth-first graph traversal. |
| [Lowest common ancestor (LCA)](lca.html) | Finding the common ancestor of two tree vertices. |
| [Dijkstra](dijkstra.html) | Shortest paths in graphs with nonnegative edge weights. |
| [Kruskal and Prim](kruskal.html) | Comparing minimum spanning trees and forests on the same graph. |
| [Kahn's topological sort](topological.html) | Ordering tasks with dependencies and detecting cycles. |
| [0/1 knapsack problem](knapsack.html) | A dynamic programming table and item selection. |
| [Levenshtein edit distance](edit-distance.html) | A dynamic programming table and reconstruction of edit operations. |
| [Bellman-Ford](bellman-ford.html) | Shortest paths with negative weights and detection of negative cycles reachable from the source. |
| [Union-Find](union-find.html) | Disjoint sets, union by rank, and path compression. |
| [KMP and Rabin-Karp](kmp.html) | Prefix-suffix tables, rolling hashes, and explicit collision verification. |
| [Binary heap](heap.html) | A priority queue, insertion, root removal, and heapsort. |
| [Sieve of Eratosthenes](sieve.html) | Finding primes by crossing out multiples. |
| [Towers of Hanoi](hanoi.html) | Recursive disk movement and the call stack. |
| [Operators](operators.html) | Arithmetic, relational, logical, bitwise, and assignment operators, including differences between languages. |
| [Fenwick and segment trees](range-trees.html) | Tree construction, range sums, and point updates using the same operations. |
| [Array techniques](array-techniques.html) | Kadane, prefix sums, and two pointers for a target-sum pair. |
| [Arithmetic algorithms](number-theory.html) | Extended Euclid and exact binary exponentiation, including modular powers. |
| [Subsequences and coins](sequence-dp.html) | LCS, LIS, and minimum coin change with solution reconstruction. |
| [Directed graph analysis](graph-analysis.html) | Floyd-Warshall with negative cycles and Kosaraju's strongly connected components. |
| [Trie](trie.html) | Word-tree construction, exact lookup, and prefix queries. |
| [Backtracking](backtracking.html) | The first N-queens solution and reversal of choices. |
| [Greedy activity selection](activity-selection.html) | A maximum set of non-overlapping intervals and a timeline. |
| [Huffman coding](huffman.html) | Building a prefix-code tree and encoding text according to character frequencies. |

Choose a module, set the input or scenario, and start the animation or move between steps. Available settings depend on the example. The home page catalog comes from [algorithms.json](algorithms.json).

### Running locally

The project is a static website. No dependency installation or build step is required. You need a browser with JavaScript enabled. Run the entire site through an HTTP server; the example below uses Python 3.

1. Download the repository as a ZIP archive and extract it, or clone it using Git:

   ```sh
   git clone https://github.com/November7/AlgorithmsLab.git
   cd AlgorithmsLab
   ```

2. Start the server from the project directory:

   ```sh
   python -m http.server 8000 --bind 127.0.0.1
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser. To stop the server, press `Ctrl+C` in the terminal.

On Windows, you can use `py` instead of `python`; on macOS and Linux, use `python3`.

Individual modules, such as `bellman-ford.html`, can also be opened directly from disk and used offline, with `styles.css` and the `scripts/` directory kept alongside the HTML files. The home page loads `README.md` and `algorithms.json` using `fetch`, so it requires an HTTP server. Libraries used to display the README are available locally in `vendor/`; README badges are fetched from the internet.

### Project structure

```text
AlgorithmsLab/
├── vendor/              # Third-party libraries and their licenses
├── algorithms.json      # Home page module catalog
├── index.html           # Home page with README and module list
├── bellman-ford.html     # Bellman-Ford visualization
├── sort.html            # Sorting visualizations
├── lca.html             # Lowest common ancestor
├── sieve.html           # Sieve of Eratosthenes
├── ...                  # Other HTML modules listed above
├── scripts/             # Shared simulation controls, rendering, and validation
├── styles.css           # Shared styles for all pages
├── AGENTS.md            # Repository workflow guidance
├── .gitignore           # Ignore rules for the local tests/ directory
├── README.md            # Polish and English documentation
└── LICENSE              # Complete GNU GPL v3 text
```

Simulation-specific code stays in its HTML file. Functions shared by original and newer modules live in `scripts/`:

| File | Responsibility |
| --- | --- |
| `lab-dom.js` | HTML and SVG elements, algorithm pickers, labels, keyboard interaction, and preserving focus during rendering. |
| `lab-controller.js` | Shared playback for seven original simulations through the `Lab` API: start, pause, steps, and rewinding by replaying the algorithm. Requires `lab-dom.js`. |
| `lab-animation.js` | The `requestAnimationFrame` clock used by sorting, searching, minimum/maximum, Kruskal/Prim, topological sorting, and knapsack. Caps elapsed time and prevents duplicate frame scheduling. |
| `lab-canvas.js` | Canvas scaling for screen pixel density and drawing axes and bars in three array modules. |
| `lab-core.js` | Input validation and state preparation for newer simulations. |
| `lab-player.js` | Playback of saved states in newer simulations. Requires `lab-dom.js`, `lab-core.js`, and the HTML file's `LabDefinition`. |

Load scripts in dependency order, before the code that uses them. The two playback mechanisms handle different state models: original generators mutate simulation state, while newer generators yield saved copies. Modules with different controls, such as animated sorting or graph dragging, keep their operations and control rules in HTML; the clock itself can be shared. LCA, Huffman, Kruskal, and topological sorting also use the shared drawing helpers.

Shared component styles stay in `styles.css`: value lists, forms, markers, and diagram states. Simulation-specific geometry and layouts have their own selectors. CSS changes must preserve rule order and specificity, especially in mobile layouts.

Related algorithms use a method selector; catalog links with a `method` parameter open the corresponding variant.

### Testing and development

The `tests/` directory is intended for local tests and is ignored by Git. Its files remain on disk but are not included when cloning the repository or downloading it as a ZIP archive.

If you have local `tests/*.test.cjs` files and their helper files, run them from the project directory:

```sh
node --test tests/*.test.cjs
```

These tests use Node.js's built-in `node:test` module and require no additional packages. They check selected results and interface behaviors using a simplified DOM model. Local `tests/*.browser.cjs` scripts require Playwright and a browser to be available separately, with paths adjusted to your environment. Tests do not replace independent technical validation or visual checks in a browser.

When adding a module, update `algorithms.json` and both language versions of the README. Use `styles.css` and a suitable reference, such as `sort.html`, `lca.html`, or `sieve.html`. After changes, check page behavior, step navigation, and layouts at different screen widths. Bug reports should include the module, input data, reproduction steps, and expected and actual results.

### Authorship and AI assistance

The project author is Marcin Kowalski (November7). The README and simulations are created using AI tools. AI involvement and code review do not establish the algorithmic or educational correctness of the materials.

### License

Copyright (c) 2024-2026 Marcin Kowalski.

This project is licensed under the **GNU General Public License, version 3 only**. SPDX identifier: `GPL-3.0-only`. See [LICENSE](LICENSE) for the complete original English text and terms.

The project is provided without warranty to the extent stated in the license. Use, modification, and redistribution must comply with its terms. This description does not replace the complete license text.

Third-party components retain their own licenses and author credits:

| Component | Authorship and license |
| --- | --- |
| [Marked 15.0.12](https://github.com/markedjs/marked/tree/v15.0.12), `vendor/marked.min.js` | Christopher Jeffrey and MarkedJS, MIT. The [complete license information](vendor/marked.LICENSE.md) also includes the notice for Markdown by John Gruber. |
| [github-markdown-css](https://github.com/sindresorhus/github-markdown-css), `vendor/github-markdown.min.css` | Sindre Sorhus, [MIT](vendor/github-markdown.LICENSE). |
