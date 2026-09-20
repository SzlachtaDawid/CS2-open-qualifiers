#!/usr/bin/env bash
# Answer-first gate: reminds, never blocks. The latch keeps the reminder alive
# across neutral follow-ups until a prompt reads as approval to change code.
set -uo pipefail

input=$(cat)
prompt=$(printf '%s' "$input" | jq -r '.prompt // ""')
session=$(printf '%s' "$input" | jq -r '.session_id // "nosession"')
latch="${TMPDIR:-/tmp}/claude-answer-first-${session}"

flat=$(printf '%s' "$prompt" | tr '\n' ' ')
trimmed="${flat%"${flat##*[![:space:]]}"}"

APPROVE='(^|[^[:alpha:]])(ok|okej|okay|dobra|dawaj|zrob|zrób|zrobmy|zróbmy|wprowadz|wprowadź|implementuj|zaimplementuj|dodaj|napraw|popraw|zmien|zmień|usun|usuń|zapisz|commit|pushuj|rob to|rób to|potwierdzam|akceptuj|dzialaj|działaj|lecimy|jedziemy|go ahead|do it|apply)'
QUESTION='^[[:space:]]*(jak|dlaczego|czemu|czy|co |cos|coś|kiedy|gdzie|po co|w jaki|ktor|któr|wytlumacz|wytłumacz|wyjasnij|wyjaśnij|explain|why|how|what|when|where|which)'

reminder() {
  printf '%s\n' "[answer-first hook] Ta wiadomość to pytanie, nie zlecenie. Najpierw odpowiedz i wyjaśnij. Jeśli potrzebna jest zmiana w kodzie, zaproponuj rozwiązanie i poczekaj na zatwierdzenie — nie edytuj plików w tej turze, chyba że ta sama wiadomość wprost o to prosi."
}

if [[ "$trimmed" == *"?" ]]; then
  : > "$latch"
  reminder
elif printf '%s' "$flat" | grep -qiE "$APPROVE"; then
  rm -f "$latch"
elif printf '%s' "$flat" | grep -qiE "$QUESTION"; then
  : > "$latch"
  reminder
elif [[ -f "$latch" ]]; then
  reminder
fi
exit 0
