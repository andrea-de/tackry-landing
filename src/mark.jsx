/**
 * The Tackry mark, regenerated from the app's own geometry
 * (com.tackry.intro.IntroGeometry) rather than screenshotted: three stacked
 * plates with a pin punched through the top one, in the 100x100 icon space.
 *
 * Plate colours come from com.tackry.ui.theme.TackryPalette.logo.plates —
 * top to bottom they mean tack, notification, reminder.
 */

const T = [50, 14];
const R = [86, 34];
const B = [50, 54];
const L = [14, 34];

const PLATE_DEPTH = 7;
const PLATE_STROKE = 2.4;
const HOLE_STROKE = 1.8;

/** Vertical offset of each plate, top plate first. */
const PLATE_OFFSETS = [0, 13, 26];

/** The pin outline as a 24-unit glyph, laid onto the top plate. */
const PIN_GLYPH = [
  [15, 4.5], [11, 8.5], [7, 10], [5.5, 11.5],
  [8.7, 14.7], [3.8, 20.2], [9.7, 15.7],
  [12.5, 18.5], [14, 17], [15.5, 13], [19.5, 9],
];

const PIN_POINTS = PIN_GLYPH.map(([gx, gy]) => {
  const x = gx - 11.65;
  const y = gy - 12.35;
  return [1.25 * x - 1.25 * y + 50, 0.694 * x + 0.694 * y + 34];
});

const poly = (points) =>
  points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ") + " Z";

const shift = (p, dy) => [p[0], p[1] + dy];

/**
 * A plate is a rounded square seen in isometric: the corners are rounded in the
 * plate's own plane, and the projection turns them into elliptical arcs — the
 * same rounding the app's tacks carry. A linear map carries Bezier control
 * points, so the arcs come out exact rather than approximated twice.
 */
const CORNER_FRACTION = 0.147;
const KAPPA = 0.5523;

const ACROSS_S = [R[0] - T[0], R[1] - T[1]];
const ACROSS_T = [L[0] - T[0], L[1] - T[1]];

const plate = (s, t) => [
  T[0] + ACROSS_S[0] * s + ACROSS_T[0] * t,
  T[1] + ACROSS_S[1] * s + ACROSS_T[1] * t,
];

const FACE_START = plate(CORNER_FRACTION, 0);

const FACE_STEPS = (() => {
  const k = CORNER_FRACTION;
  const c = k * KAPPA;
  return [
    ["L", plate(1 - k, 0)],
    ["C", plate(1 - k + c, 0), plate(1, k - c), plate(1, k)],
    ["L", plate(1, 1 - k)],
    ["C", plate(1, 1 - k + c), plate(1 - k + c, 1), plate(1 - k, 1)],
    ["L", plate(k, 1)],
    ["C", plate(k - c, 1), plate(0, 1 - k + c), plate(0, 1 - k)],
    ["L", plate(0, k)],
    ["C", plate(0, k - c), plate(k - c, 0), plate(k, 0)],
  ];
})();

const face = (dy) => {
  const at = (p) => `${p[0].toFixed(2)},${(p[1] + dy).toFixed(2)}`;
  const parts = [`M${at(FACE_START)}`];
  for (const step of FACE_STEPS) {
    if (step[0] === "L") parts.push(`L${at(step[1])}`);
    else parts.push(`C${at(step[1])} ${at(step[2])} ${at(step[3])}`);
  }
  return parts.join(" ") + " Z";
};

/** The face as points, which is all the silhouette needs. */
const facePoints = () => {
  const points = [FACE_START];
  let at = FACE_START;
  for (const step of FACE_STEPS) {
    if (step[0] === "L") {
      points.push(step[1]);
      at = step[1];
    } else {
      const [, c1, c2, to] = step;
      for (let i = 1; i <= 12; i += 1) {
        const u = i / 12;
        const v = 1 - u;
        points.push([
          v ** 3 * at[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * to[0],
          v ** 3 * at[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * to[1],
        ]);
      }
      at = to;
    }
  }
  return points;
};

const hull = (points) => {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (source) => {
    const chain = [];
    for (const p of source) {
      while (chain.length >= 2 && cross(chain[chain.length - 2], chain[chain.length - 1], p) <= 0) {
        chain.pop();
      }
      chain.push(p);
    }
    chain.pop();
    return chain;
  };
  return half(sorted).concat(half([...sorted].reverse()));
};

/**
 * The block: what the plate covers on its way down, which for a convex shape is
 * the hull of the two ends. Not the union of them — that is pinched where the
 * outlines cross, out at the far left and right, and the pinch reads as a seam
 * between two sheets rather than the side of one block.
 */
const SOLID_OUTLINE = hull(
  facePoints().concat(facePoints().map((p) => shift(p, PLATE_DEPTH))),
);

const solid = (dy) => poly(SOLID_OUTLINE.map((p) => shift(p, dy)));

const PIN_PATH = poly(PIN_POINTS);

/**
 * `plates` is an array of three `{ face, edge }` colours, top plate first, or
 * the string "var" to take them from CSS custom properties so the mark follows
 * the page's colour scheme.
 */
export function Mark({ size = 40, plates = "var", title, className }) {
  const themed = plates === "var";
  const colour = (i, part) => (themed ? `var(--plate-${i}-${part})` : plates[i][part]);
  const outline = themed ? "var(--plate-outline)" : plates.outline;
  const hole = themed ? "var(--plate-hole)" : plates.hole;

  return (
    <svg
      class={className}
      width={size}
      height={size}
      viewBox="12.5 12.5 75 76"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <g stroke={outline} stroke-width={PLATE_STROKE} stroke-linejoin="round">
        {[2, 1, 0].map((i) => (
          <g key={i}>
            <path d={solid(PLATE_OFFSETS[i])} fill={colour(i, "edge")} />
            <path d={face(PLATE_OFFSETS[i])} fill={colour(i, "face")} />
          </g>
        ))}
      </g>
      <path d={PIN_PATH} fill={hole} stroke={outline} stroke-width={HOLE_STROKE} stroke-linejoin="round" />
    </svg>
  );
}

/** A single plate face, used for the colour-meaning legend. */
export function Plate({ index, size = 64 }) {
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="12 12 76 50"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--plate-outline)" stroke-width={PLATE_STROKE} stroke-linejoin="round">
        <path d={solid(0)} fill={`var(--plate-${index}-edge)`} />
        <path d={face(0)} fill={`var(--plate-${index}-face)`} />
      </g>
    </svg>
  );
}
