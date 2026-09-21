---
name: flashcards
description: Generate Anki flashcards from what was covered in this conversation and save them as a tab-separated file ready to import into Anki. Use when the user invokes /flashcards, or asks for fiszki, flashcards or Anki cards.
---

Na podstawie naszej konwersacji wygeneruj fiszki Anki. Skup się na kluczowych konceptach, a nie na
szczegółach składni. Każda odpowiedź maksymalnie 2-3 zdania. Po polsku, terminy techniczne po
angielsku. Jeśli argument podaje temat, ogranicz się do niego.

Zapisz je do `flashcards/RRRR-MM-DD-temat.tsv` (bez argumentu użyj `sesja` zamiast tematu). Katalog
jest w `.gitignore`. Po zapisaniu wypisz fiszki także w czacie do przejrzenia i podaj ścieżkę pliku.

## Format pliku

UTF-8 bez BOM, pola rozdzielone znakiem tabulacji, jedna fiszka w jednej linii. Nagłówek:

```
#separator:tab
#html:true
#notetype:Basic
#deck:CS2::<temat>
#columns:Front	Back	Tags
```

Dalej wiersze `pytanie<TAB>odpowiedź<TAB>tagi`, gdzie tagi są rozdzielone spacją, nie przecinkiem.
`::` w nazwie talii tworzy zagnieżdżenie, więc talia powstanie sama przy imporcie.

## Zasady, bez których import się sypie

- `<`, `>` i `&` w treści zamień na `&lt;`, `&gt;`, `&amp;` — przy `#html:true` Anki potraktuje
  `<Canvas>` jako tag HTML i go nie wyświetli
- nazwy plików, funkcji i fragmenty kodu owijaj w `<code>...</code>`
- nowa linia w odpowiedzi to `<br>`, nigdy prawdziwy enter — jeden wiersz pliku to jedna fiszka
- żaden znak tabulacji nie może trafić do wnętrza pola
- nie zawijaj pól w cudzysłowy

## Fiszki na konkretny zapis

Jeśli fiszka sprawdza zapamiętany zapis, a nie zrozumienie, zrób z niej cloze i zapisz takie fiszki
do osobnego pliku z `#notetype:Cloze` oraz `#columns:Text	Tags`, bo typ notatki ustawia się raz na
plik. Treść w jednym polu, luka w `{{c1::...}}`:

```
Wszystkie importy GSAP idą przez {{c1::@/lib/gsap}}, bo tam rejestrowane są pluginy.	gsap
```
