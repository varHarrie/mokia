let hue = Math.random();
const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;

/**
 * Returns a hue value
 */
function randomHue(): number {
  hue = (hue + GOLDEN_RATIO_CONJUGATE) % 1;
  return hue;
}

type RgbTuple = [r: number, g: number, b: number];

/**
 * Transforms hsl to rgb
 */
function hslToRgb(h: number, s: number, l: number): RgbTuple {
  const q = l < 0.5 ? l * (s + 1) : l + s - l * s;
  const p = l * 2 - q;

  return [h + 1 / 3, h, h - 1 / 3].map((v) => {
    if (v < 0) v += 1;
    if (v > 1) v -= 1;
    if (v < 1 / 6) return p + (q - p) * 6 * v;
    if (v < 1 / 2) return q;
    if (v < 2 / 3) return p + (q - p) * (2 / 3 - v) * 6;
    return p;
  }) as RgbTuple;
}

/**
 * Returns a hex color string. eg: "#83c2ef"
 */
export function hex(): string {
  const values = hslToRgb(randomHue(), 0.5, 0.6)
    .map((v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');

  return `#${values}`;
}

/**
 * Returns a rgb color string. eg: "rgb(131, 194, 239)"
 */
export function rgb(): string {
  const values = hslToRgb(randomHue(), 0.5, 0.6)
    .map((v) => Math.round(v * 255))
    .join(', ');

  return `rgb(${values})`;
}

/**
 * Returns a rgba color string. eg: "rgba(131, 194, 239, 0.80)"
 */
export function rgba(): string {
  const values = hslToRgb(randomHue(), 0.5, 0.6)
    .map((v) => Math.round(v * 255))
    .join(', ');

  return `rgba(${values}, ${Math.random().toFixed(2)})`;
}

/**
 * Returns a hsl color string. eg: "hsl(205, 77%, 73%)"
 */
export function hsl(): string {
  const h = Math.round(randomHue() * 360);

  return `hsl(${h}, 50%, 60%)`;
}
