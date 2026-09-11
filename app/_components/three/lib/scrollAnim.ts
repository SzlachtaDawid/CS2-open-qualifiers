export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Orientacje bazowe modelu w radianach — cztery ćwiartki obrotu wokół osi Y.
 *
 * Klipy w cs2.glb mają różne orientacje bazowe, więc każda sekcja wybiera swoją.
 * To obrót samej postaci: przy włączonym przemiataniu (`modelRotationY`) przesuwa
 * cały jego zakres, a przy wyłączonym jest po prostu statyczną pozą w kadrze.
 */
export const FACING = {
  /** Przodem do kamery — orientacja prosto z pliku .glb, bez korekty. */
  front: 0,
  /** Tyłem do kamery. */
  back: Math.PI,
  /** Bokiem, obrót w lewo. */
  sideLeft: -Math.PI / 2,
  /** Bokiem, obrót w prawo. */
  sideRight: Math.PI / 2,
} as const;

/** Nazwa orientacji, gdy potrzebny jest typ zamiast wartości. */
export type Facing = keyof typeof FACING;

/**
 * Obrót postaci wokół osi Y — pełny profil od lewej do prawej w trakcie sekcji.
 *
 * `offset` koryguje orientację bazową klipu i jest doliczany do całego zakresu,
 * więc nie zmienia tempa obrotu, tylko punkt, z którego się zaczyna.
 */
export const modelRotationY = (progress: number, offset = 0) => lerp(-0.6, 2.4, clamp01(progress)) + offset;

/** Delikatne uniesienie postaci, żeby ruch nie był płaski. */
export const modelOffsetY = (progress: number) => lerp(-0.15, 0.15, clamp01(progress));

/**
 * Pozycja na osi czasu klipu dla danego postępu scrolla.
 * `cycles` mówi, ile razy klip ma się przewinąć na całej długości sekcji —
 * przy 9.6 s chodu i wysokiej sekcji jeden przebieg wygląda na zwolnione tempo.
 */
/** Włos przed granicą pętli. 0.1 ms klipu, czyli mniej niż jedna klatka. */
const LOOP_EPSILON = 1e-4;

export const clipTime = (progress: number, duration: number, cycles = 3) => {
  const end = duration * cycles;
  if (end <= 0) return 0;

  // AnimationMixer z LoopRepeat zawija czas dokładnie na `end`, więc setTime(end)
  // pokazuje PIERWSZĄ klatkę zamiast ostatniej — model wskakuje na start w chwili,
  // gdy scroll dobija do końca sekcji. Zatrzymanie się o włos wcześniej sprawia,
  // że postać zastyga w ostatniej pozie i tam zostaje.
  return Math.min(clamp01(progress) * end, end - LOOP_EPSILON);
};
