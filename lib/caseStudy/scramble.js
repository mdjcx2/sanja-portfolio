// Text scramble used by case study captions and nav links: unrevealed letters
// show random characters, and one more real letter locks in, left to right,
// every FRAMES_PER_LETTER frames. Timing measured on graceguo.io (~280ms for 7 letters).

export const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
export const SCRAMBLE_FRAME_MS = 20;
export const FRAMES_PER_LETTER = 2;

// Frames until the whole text is revealed. perLetter slows the reveal.
export const scrambleFrames = (text, perLetter = FRAMES_PER_LETTER) => text.length * perLetter;

// The text as shown on a given frame. `random` is injectable for tests.
export function scrambleFrame(text, frame, random = Math.random, perLetter = FRAMES_PER_LETTER) {
  const revealed = Math.floor(frame / perLetter);
  return [...text]
    .map((ch, i) => (i < revealed || ch === " " ? ch : SCRAMBLE_CHARS[Math.floor(random() * SCRAMBLE_CHARS.length)]))
    .join("");
}
