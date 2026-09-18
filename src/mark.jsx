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

const face = (dy) => poly([T, R, B, L].map((p) => shift(p, dy)));

const side = (dy) =>
  poly([
    shift(L, dy), shift(B, dy), shift(R, dy),
    shift(R, dy + PLATE_DEPTH), shift(B, dy + PLATE_DEPTH), shift(L, dy + PLATE_DEPTH),
  ]);

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
            <path d={face(PLATE_OFFSETS[i])} fill={colour(i, "face")} />
            <path d={side(PLATE_OFFSETS[i])} fill={colour(i, "edge")} />
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
        <path d={face(0)} fill={`var(--plate-${index}-face)`} />
        <path d={side(0)} fill={`var(--plate-${index}-edge)`} />
      </g>
    </svg>
  );
}
