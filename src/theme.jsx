import { useEffect, useState } from "preact/hooks";

/*
 * Three states, like the app itself: system, light, dark. "system" stamps nothing on the root
 * and leaves the prefers-color-scheme rules to decide; the other two stamp data-theme, which the
 * stylesheet honours over the media query in both directions.
 *
 * The choice is also needed in JS, not only in CSS: the art is a different file per theme, so a
 * component has to know which one is showing.
 */

const KEY = "tackry-theme";
const listeners = new Set();
let choice = read();

function read() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function systemPrefersDark() {
  return typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches;
}

export function setTheme(next) {
  choice = next;
  try {
    if (next === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, next);
  } catch {
    /* private window: the page still works, the choice just does not outlive it. */
  }
  apply();
  listeners.forEach((fn) => fn());
}

function apply() {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
}

/** Returns [choice, effective] — what the user picked, and what is actually on screen. */
export function useTheme() {
  const [, bump] = useState(0);
  useEffect(() => {
    const onChange = () => bump((n) => n + 1);
    listeners.add(onChange);
    const media = typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)");
    if (media) media.addEventListener("change", onChange);
    return () => {
      listeners.delete(onChange);
      if (media) media.removeEventListener("change", onChange);
    };
  }, []);
  const effective = choice === "system" ? (systemPrefersDark() ? "dark" : "light") : choice;
  return [choice, effective];
}

/**
 * One element's art, in the theme that is showing. The dark art is the app's Midnight theme —
 * light cards keyed onto a dark page glow, and the point of the picture is what the app looks
 * like, which is not the same picture in both.
 */
export function Art({ name, width, height, alt, className = "shot art", caption, eager }) {
  const [, effective] = useTheme();
  const file = effective === "dark" ? `${name}_midnight` : name;
  return (
    <figure class={className}>
      <img
        src={`/media/art/${file}.webp`}
        width={width}
        height={height}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchpriority={eager ? "high" : undefined}
        decoding="async"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export function ThemeToggle() {
  const [current] = useTheme();
  const options = [
    ["system", "Auto", "Follow the system setting"],
    ["light", "Light", "Always light"],
    ["dark", "Dark", "Always dark"],
  ];
  return (
    <div class="theme-toggle" role="group" aria-label="Colour theme">
      {options.map(([value, label, title]) => (
        <button
          key={value}
          type="button"
          class={value === current ? "is-on" : undefined}
          aria-pressed={value === current ? "true" : "false"}
          title={title}
          onClick={() => setTheme(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

apply();

/**
 * A whole screen inside a drawn phone. The frame is CSS, not part of the image: it follows the
 * page's own theme, stays sharp at any size, and costs nothing to change.
 */
export function Phone({ name, alt, caption }) {
  const [, effective] = useTheme();
  const file = effective === "dark" ? `${name}_midnight` : name;
  return (
    <figure class="phone">
      <div class="phone-body">
        <img
          src={`/media/art/${file}.webp`}
          width="1170"
          height="2532"
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
