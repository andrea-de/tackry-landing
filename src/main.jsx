import { render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Mark, Plate } from "./mark.jsx";
import { Art, Phone, PhoneShell, ThemeToggle, useTheme } from "./theme.jsx";
import BOARD_CARDS from "../public/media/art/board_cards.json";
import TODAY_TARGET from "../public/media/art/today_target.json";
import "./styles.css";

const MAILTO = "mailto:contact@tackry.com?subject=Tackry";

/* ---------------------------------------------------------------- header -- */

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const links = [
    ["#today", "Today"],
    ["#loop", "How it works"],
    ["#themes", "Themes"],
    ["#privacy", "Privacy"],
    ["#faq", "FAQ"],
  ];

  return (
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="brand" href="#top">
          <Mark size={34} title="Tackry" />
          <span>Tackry</span>
        </a>
        <button
          class="nav-toggle"
          type="button"
          aria-expanded={open ? "true" : "false"}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" class={open ? "site-nav open" : "site-nav"} aria-label="Sections">
          <ul>
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a class="btn btn-small" href={MAILTO}>Get in touch</a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero -- */

function Hero() {
  return (
    <section class="hero" id="top">
      <div class="wrap hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Android · local-first · no account</p>
          <h1>Catch the thing now. Deal with it when it matters.</h1>
          <p class="lede">
            Tackry is a small Android app for the stuff that flies past you — a notification
            you cannot answer yet, a link someone sent, a line of text worth keeping. Tack it
            down in one tap, and let it come back as a reminder when you are ready.
          </p>
          <p class="lede">Everything is stored on your phone. There is no account to make and no server to sync to.</p>
          <div class="cta-row">
            <a class="btn btn-primary" href={MAILTO}>Email contact@tackry.com</a>
            <span class="btn btn-ghost is-placeholder" aria-disabled="true">
              Google Play — link at launch
            </span>
          </div>
          <p class="fine">
            Tackry is not on Google Play yet. Mail me if you want a note when it is, or if you
            want to try a build early.
          </p>
        </div>
        <Art
          className="hero-shot"
          name="today_fan"
          width="1170"
          height="1521"
          eager
          alt="Six of Tackry's cards in two columns: a pinned tack, a saved Slack notification, a reminder due today, a list and two notes, each outlined in the colour of what it is."
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ loop -- */

const LOOP = [
  {
    n: "01",
    title: "Catch it",
    body: [
      "Give Tackry notification access and it keeps incoming notifications in a Recent shelf for as long as you choose — title, text, the app it came from, and the buttons that notification offered while it is still live.",
      "Or push things in yourself: the Android share sheet, Select text → Save to Tackry, a Quick Settings tile, a home-screen widget, a launcher shortcut.",
    ],
    art: "notification_card",
    alt: "A captured notification as Tackry keeps it: the app it came from, how long ago, its title and its text, on a card outlined in the blue that means “from a notification”.",
    w: 1012, h: 357,
  },
  {
    n: "02",
    title: "Tack it",
    body: [
      "Saving turns a capture into a tack: the one object Tackry keeps. A tack can be a note, a checklist, a captured notification, a shared link with its preview, or a file.",
      "Pin the ones that matter, give them a category, search them, swipe them away. The board is one flat place, not a folder tree.",
    ],
    art: "plates",
    alt: "Three cards side by side on the board: a pinned note outlined in green, a saved notification in blue, and a reminder in warm orange.",
    w: 1551, h: 852,
  },
  {
    n: "03",
    title: "Be reminded",
    body: [
      "Any tack can become a reminder — a quick pick, an exact date and time, or daily, weekdays, weekly.",
      "When reminders come due they arrive together in one floating Android bubble instead of a pile of separate notifications. Mark one done, snooze it an hour, hide the lot for fifteen minutes, or open the app.",
    ],
    art: "bubble",
    alt: "Tackry's grouped reminder bubble, titled “2 reminders due”, listing Morning review and Resume focus playlist, each with Done and Snooze 1h buttons, above Hide all for 15m and Open Tackry.",
    w: 1068, h: 1458,
  },
];

function Loop() {
  return (
    <section class="section" id="loop">
      <div class="wrap">
        <p class="eyebrow">The loop</p>
        <h2>Capture, tack, reminder</h2>
        <p class="section-lede">
          Three steps, and the same object all the way through. Nothing gets converted into a
          different kind of item behind your back.
        </p>
        <ol class="loop">
          {LOOP.map((step) => (
            <li class="loop-step" key={step.n}>
              <div class="loop-copy">
                <p class="step-n" aria-hidden="true">{step.n}</p>
                <h3>{step.title}</h3>
                {step.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {step.art === "bubble"
                ? <BubblePlay alt={step.alt} />
                : <Art name={step.art} width={step.w} height={step.h} alt={step.alt} />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- bubble play -- */

/**
 * The bubble, doing what a bubble does, inside a phone: it pops in small against the edge, and
 * when it opens it takes its place at the top of the screen with the sheet directly under it —
 * which is where Android puts an expanded bubble.
 *
 * Not a screen recording. The bubble is an Android surface, so nothing outside Android draws
 * one; this is the app's own pieces — the real adaptive icon the bubble wears and the rendered
 * sheet it opens into — moved the way the platform moves them. A recording can replace it later
 * without the page changing shape.
 */
function BubblePlay({ alt }) {
  const stage = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [, effective] = useTheme();
  const suffix = effective === "dark" ? "_midnight" : "";

  useEffect(() => {
    const node = stage.current;
    if (!node || typeof IntersectionObserver !== "function") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure class={playing ? "bubble-play is-playing" : "bubble-play"} ref={stage}>
      <div class="phone-body bubble-phone">
        <div class="bubble-screen">
          <img
            class="bubble-dot"
            src={`/media/art/bubble_icon${suffix}.webp`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            class="bubble-sheet"
            src={`/media/art/bubble${suffix}.webp`}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <figcaption>The bubble arriving, and opening. Recreated from the app's own pieces.</figcaption>
    </figure>
  );
}

/* --------------------------------------------------------------- screens -- */

function Screens() {
  return (
    <section class="section" id="screens">
      <div class="wrap">
        <p class="eyebrow">The app</p>
        <h2>Today, in, and due</h2>
        <p class="section-lede">
          Today is what needs you now. Notifications is what came in and has not been dealt with.
          Reminders is what is coming back, and when.
        </p>
        <div class="phone-row">
          <Phone
            name="screen_today"
            alt="Tackry's Today screen: a stack of three tilted plates holding a pinned tack, counts for due now, pinned and new, and the reminders due next."
            caption="Today — what needs you now."
          />
          <Phone
            name="screen_notifications"
            alt="Tackry's Notifications tab: recent captures from Slack and Gmail as cards, with filter chips and the five-tab bar at the bottom."
            caption="Notifications — what came in."
          />
          <Phone
            name="screen_reminders"
            alt="Tackry's Reminders tab on the Now bucket: one reminder due, with an empty state below reading That's everything due."
            caption="Reminders — what is coming back."
          />
        </div>
      </div>
    </section>
  );
}

/** Drives --p on `node` from 0 to 1 across the section's scroll, one rAF at a time. */
function useScrollProgress(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--p", "1");
      return undefined;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      // 0 when the section's top reaches the viewport top, 1 when its bottom does.
      const travel = box.height - window.innerHeight;
      const p = travel <= 0 ? 0 : Math.min(1, Math.max(0, -box.top / travel));
      node.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}

/* ------------------------------------------------------------ board zoom -- */

const BOARD_TRAVELLERS = 4;

/**
 * The Board, and then the Board's own cards. Scrolling drives one number, --p, from 0 to 1: the
 * phone fades and the cards slide off it into a grid beside the copy.
 *
 * The cards are not stand-ins. They are sliced out of that very screenshot by
 * scripts/export_landing_art.py, which also records where each one sat as a fraction of the
 * screen — and writes the board back out with those cards erased. The phone shows the emptied
 * board, so each card exists exactly once: at rest it sits in its own hole and the screen looks
 * whole, and when it leaves it takes the gap with it.
 *
 * Where they land is measured, not guessed: the target grid is laid out against the live box, so
 * the travel is exact at any width and the cards barely have to scale, which keeps them sharp.
 */
function BoardZoom() {
  const track = useRef(null);
  const scene = useRef(null);
  const stage = useRef(null);
  const [, effective] = useTheme();
  const suffix = effective === "dark" ? "_midnight" : "";
  const cards = BOARD_CARDS.slice(0, BOARD_TRAVELLERS);

  useScrollProgress(track);

  // Lay the landing grid out against the real boxes and hand each card its own delta. Done on
  // every resize because both the screen box and the space to land in are fluid.
  useEffect(() => {
    const sceneNode = scene.current;
    const stageNode = stage.current;
    if (!sceneNode || !stageNode) return undefined;

    const layout = () => {
      const sceneBox = sceneNode.getBoundingClientRect();
      const stageBox = stageNode.getBoundingClientRect();
      if (!sceneBox.width || !stageBox.width) return;

      const gap = Math.min(18, stageBox.width * 0.03);
      const columns = stageBox.width < 520 ? 2 : 2;
      const columnWidth = (stageBox.width - gap * (columns - 1)) / columns;
      const nodes = [...sceneNode.querySelectorAll(".zoom-card")];

      // Uniform scale, capped against the crop's own pixels rather than a taste number: a card
      // rendered past its native width goes soft, and these are meant to read as the same
      // cards, not bigger ones.
      const widest = Math.max(...cards.map((card) => card.width * sceneBox.width));
      const nativeWidth = Math.max(...nodes.map((node) => node.naturalWidth || Infinity));
      const sharpest = nativeWidth / widest;
      const scale = Math.min(columnWidth / widest, sharpest, 2);

      // Row offsets first, so the finished grid can be centred in the space rather than
      // pinned to the top of it.
      const rows = Math.ceil(nodes.length / columns);
      const rowTops = [];
      let stacked = 0;
      for (let row = 0; row < rows; row += 1) {
        rowTops[row] = stacked;
        stacked += rowHeight(cards, columns, row, sceneBox, scale) + (row === rows - 1 ? 0 : gap);
      }
      const offsetY = Math.max(0, (stageBox.height - stacked) / 2);

      nodes.forEach((node, index) => {
        const card = cards[index];
        const column = index % columns;
        const row = Math.floor(index / columns);
        const startLeft = sceneBox.left + card.left * sceneBox.width;
        const startTop = sceneBox.top + card.top * sceneBox.height;
        const targetLeft = stageBox.left + column * (columnWidth + gap);
        const targetTop = stageBox.top + offsetY + rowTops[row];
        node.style.setProperty("--ex", `${(targetLeft - startLeft).toFixed(1)}px`);
        node.style.setProperty("--ey", `${(targetTop - startTop).toFixed(1)}px`);
        node.style.setProperty("--s", scale.toFixed(4));
      });
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(sceneNode);
    observer.observe(stageNode);
    window.addEventListener("resize", layout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, [cards]);

  return (
    <section class="section section-alt zoom" id="board">
      <div class="zoom-track" ref={track}>
        <div class="zoom-stage">
          <div class="zoom-copy">
            <p class="eyebrow">The board</p>
            <h2>Everything you kept, in one flat place</h2>
            <p class="section-lede">
              No folders, no inbox to declare bankruptcy on. Search it, filter it by category, pin
              what matters.
            </p>
            <p class="zoom-payoff">
              And a card's colour says what it is before you read a word: a note you kept, something
              an app told you, or a thing with a time on it.
            </p>
          </div>
          <div class="zoom-right" ref={stage}>
            <div class="zoom-scene" ref={scene}>
              <div class="phone-body zoom-phone">
                <img
                  src={`/media/art/screen_board_empty${suffix}.webp`}
                  width="1440"
                  height="3120"
                  alt="Tackry's Tackboard: saved tacks as a two-column grid of plate-coloured cards, with search and category chips above."
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="zoom-cards" aria-hidden="true">
                {cards.map((card, index) => (
                  <img
                    key={index}
                    class="zoom-card"
                    src={`/media/art/board_card_${index + 1}${suffix}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      left: `${card.left * 100}%`,
                      top: `${card.top * 100}%`,
                      width: `${card.width * 100}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The tallest card in a row, scaled — the next row starts below it. */
function rowHeight(cards, columns, row, sceneBox, scale) {
  const inRow = cards.slice(row * columns, row * columns + columns);
  return Math.max(...inRow.map((card) => card.height * sceneBox.height * scale));
}

/* ----------------------------------------------------------- today pull -- */

/**
 * Today, the Board's effect run backwards. The Board lets four cards out of a phone; this one
 * puts one thing in.
 *
 * It opens on what Today holds — the stack, and the cards it fans out into, standing where the
 * phone will be. Scrolling drops the cards away, fades the phone in behind them, and carries the
 * stack down into its place on the screen. The screen it fades in has that place erased, so the
 * stack arriving is the only one: nothing duplicates and nothing has to be hidden.
 */
function TodayPull() {
  const track = useRef(null);
  const scene = useRef(null);
  const deck = useRef(null);
  const fan = useRef(null);
  const [, effective] = useTheme();
  const suffix = effective === "dark" ? "_midnight" : "";
  const cards = Array.from({ length: Math.min(TODAY_TARGET.cards, 4) }, (_, i) => i);

  useScrollProgress(track);

  useEffect(() => {
    const sceneNode = scene.current;
    const deckNode = deck.current;
    const fanNode = fan.current;
    if (!sceneNode || !deckNode || !fanNode) return undefined;

    const layout = () => {
      const sceneBox = sceneNode.getBoundingClientRect();
      const deckBox = deckNode.getBoundingClientRect();
      if (!sceneBox.width || !deckBox.width) return;

      // The screen is the scene inset by the bezel, and the target is a fraction of it.
      const screenLeft = sceneBox.left + 10;
      const screenTop = sceneBox.top + 10;
      const screenWidth = sceneBox.width - 20;
      const screenHeight = sceneBox.height - 20;
      const target = TODAY_TARGET.deck;

      deckNode.style.setProperty("--s", ((target.width * screenWidth) / deckBox.width).toFixed(4));
      deckNode.style.setProperty("--ex", `${(screenLeft + target.left * screenWidth - deckBox.left).toFixed(1)}px`);
      deckNode.style.setProperty("--ey", `${(screenTop + target.top * screenHeight - deckBox.top).toFixed(1)}px`);

      // The cards fall straight down and out, each a little after the one before it.
      const nodes = [...fanNode.querySelectorAll(".fan-card")];
      nodes.forEach((node, index) => {
        node.style.setProperty("--fall", `${(sceneBox.height * 0.55).toFixed(0)}px`);
        node.style.setProperty("--delay", (index * 0.05).toFixed(2));
      });
    };

    layout();
    deckNode.addEventListener("load", layout);
    const observer = new ResizeObserver(layout);
    observer.observe(sceneNode);
    observer.observe(fanNode);
    window.addEventListener("resize", layout);
    return () => {
      deckNode.removeEventListener("load", layout);
      observer.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <section class="section zoom pull" id="today">
      <div class="zoom-track" ref={track}>
        <div class="zoom-stage pull-stage">
          <div class="zoom-right">
            <div class="pull-open" aria-hidden="true">
              <img
                class="pull-deck"
                ref={deck}
                src={`/media/art/today_deck${suffix}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div class="pull-fan" ref={fan}>
                {cards.map((index) => (
                  <img
                    key={index}
                    class="fan-card"
                    src={`/media/art/today_card_${index + 1}${suffix}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
            <div class="zoom-scene pull-scene" ref={scene}>
              <div class="phone-body">
                <img
                  src={`/media/art/screen_today_empty${suffix}.webp`}
                  width="1170"
                  height="2532"
                  alt="Tackry's Today screen: the stack of pinned tacks, with counts for what is due now, pinned and newly captured, and the reminders due next."
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          <div class="zoom-copy">
            <p class="eyebrow">Today</p>
            <h2>A stack that fans out</h2>
            <p class="section-lede">
              Everything you pinned collects into one stack on Today — the app's own mark, holding
              your things. Tap it and the stack fans back out into a grid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- meaning -- */

const MEANING = [
  { i: 0, name: "Tack", body: "Something you saved: a note, a list, a link, a file." },
  { i: 1, name: "Notification", body: "Something an app told you, kept after the notification is gone." },
  { i: 2, name: "Reminder", body: "Something with a time on it, waiting to come back." },
];

function Meaning() {
  return (
    <section class="section" id="colour">
      <div class="wrap meaning-inner">
        <div>
          <p class="eyebrow">The mark</p>
          <h2>Three plates, three meanings</h2>
          <p class="section-lede">
            The icon is three stacked plates with a pin punched through the top one. Those three
            plate colours are not decoration — they run through the whole app. A card's colour
            tells you what kind of thing it is before you read a word of it.
          </p>
          <dl class="meaning-list">
            {MEANING.map((m) => (
              <div class="meaning-row" key={m.name}>
                <dt><Plate index={m.i} size={56} /> {m.name}</dt>
                <dd>{m.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div class="mark-stage" aria-hidden="true">
          <Mark size={260} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- themes -- */

const THEMES = [
  {
    name: "Light",
    body: "Warm paper. Green, rust and gold accents.",
    img: "/media/art/tack_card.webp",
    alt: "A tack card in the Light theme: cream card, green outline, dark ink on warm sand.",
    w: 1008, h: 413,
  },
  {
    name: "Dark",
    body: "The same warmth turned down, not a grey inversion.",
    img: "/media/art/tack_card_dark.webp",
    alt: "The same card in the Dark theme: near-black green-tinted ground, cream text, muted green outline.",
    w: 1008, h: 413,
  },
  {
    name: "Midnight",
    body: "The mark's own colours — white, blue and yellow on navy — across the whole app.",
    img: "/media/art/tack_card_midnight.webp",
    alt: "The same card in the Midnight theme: deep navy ground, white card, off-white text.",
    w: 1008, h: 413,
  },
];

function Themes() {
  return (
    <section class="section section-alt" id="themes">
      <div class="wrap">
        <p class="eyebrow">Themes</p>
        <h2>Three of them, chosen by you</h2>
        <p class="section-lede">
          Light, Dark and Midnight — plus a System setting that follows your phone. Widgets can
          follow the app or pick their own. Every colour here is the app's own palette, and each
          theme's text was checked for WCAG AA contrast on its own background.
        </p>
        <div class="theme-grid">
          {THEMES.map((t) => (
            <figure class="shot art" key={t.name}>
              <img src={t.img} width={t.w} height={t.h} alt={t.alt} loading="lazy" decoding="async" />
              <figcaption><strong>{t.name}</strong> {t.body}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- privacy -- */

const PRIVACY = [
  ["No account", "There is no sign-in, no profile, no email address to hand over. You install it and it works."],
  ["No server", "Tackry has no backend. Your tacks live in a database on your phone and stay there."],
  ["No analytics", "No analytics, crash-reporting or advertising SDKs are built into the app."],
  ["Sensitive apps skipped", "Notification capture ignores apps that look like banks, authenticators, password managers and wallets, by default, before anything is stored. You can allow one deliberately, or block any other app by hand."],
  ["Network only for links", "The only thing Tackry fetches is a page you shared with it, to read its title, summary and preview image — from your device, straight to that site."],
  ["Backups are yours", "Export the whole local state to a file whenever you want. You choose where it goes; nothing is uploaded."],
];

function Privacy() {
  return (
    <section class="section" id="privacy">
      <div class="wrap">
        <p class="eyebrow">Privacy</p>
        <h2>Nothing leaves the device</h2>
        <p class="section-lede">
          Notification access is a serious permission and it deserves a plain explanation. If you
          grant it, Tackry's listener reads the notifications your phone shows and keeps the ones
          it is allowed to keep, in its local database, for the retention window you set. Recent
          captures expire on their own. You can revoke the permission in Android settings at any
          time, and blocking an app purges what it already captured.
        </p>
        <ul class="claims">
          {PRIVACY.map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
        <p class="section-lede">
          <a class="link" href="/privacy/">Read the full privacy policy</a>
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- reach -- */

const REACH = [
  ["Home-screen widgets", "A Focus widget that shows pinned tacks, reminders due now, or one category — scrollable, with its own theme, header action and row action. Plus a Quick actions widget sized from 1×1 upward."],
  ["Quick Settings tiles", "Three tiles in the pull-down shade: new tack, save the clipboard as a tack, and open the reminder bubble now."],
  ["The share sheet", "Send text, links, images, files or several at once to Tackry from any app. Shared links get a title, summary and preview fetched in the background so the save itself stays instant."],
  ["Select text anywhere", "Highlight text in any app and Save to Tackry appears in the selection menu. It saves silently, without opening anything."],
  ["The bubble", "Due reminders share one floating bubble you can drag around, act on and dismiss. Quiet updates stay quiet; only your own actions expand it."],
  ["Tablets and folds", "Wide screens get a floating navigation rail and a centred column rather than a stretched phone layout."],
];

function Reach() {
  return (
    <section class="section section-alt" id="reach">
      <div class="wrap">
        <p class="eyebrow">Reach</p>
        <h2>Ways in, ways back out</h2>
        <div class="reach-grid">
          {REACH.map(([title, body]) => (
            <div class="reach-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- faq -- */

const FAQ = [
  [
    "Can I get it yet?",
    "Not from Google Play — the listing is not live. Mail contact@tackry.com and I will tell you when it is, or sort you out with a build before then.",
  ],
  [
    "What does notification access actually let it do?",
    "It lets Tackry read the notifications your phone displays, and keep the ones you have not blocked in its local database for your chosen retention window. It never sends them anywhere. Apps that look like banks, authenticators, password managers or wallets are skipped before anything is stored.",
  ],
  [
    "Does it sync between my devices?",
    "No. Tackry is local-first with no backend, so there is nothing to sync through. Moving to a new phone means exporting a backup file and restoring it.",
  ],
  [
    "What happens to a notification's buttons?",
    "Tackry keeps a saved notification's own actions and shows them on the card, so long as the original notification is still live and Android still honours it. When one stops working the app clears them rather than leaving dead buttons on screen.",
  ],
  [
    "Is there a subscription?",
    "No pricing has been decided yet. There is no subscription, no ads and no tracking in the app today.",
  ],
  [
    "Which Android versions?",
    "Android 11 and up. It is a native Kotlin and Jetpack Compose app — bubbles, widgets and Quick Settings tiles are all the platform's own.",
  ],
  [
    "Is it open source?",
    "Not at the moment.",
  ],
];

function Faq() {
  return (
    <section class="section" id="faq">
      <div class="wrap wrap-narrow">
        <p class="eyebrow">FAQ</p>
        <h2>Questions worth answering</h2>
        <div class="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary><h3>{q}</h3></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- close -- */

function Closing() {
  return (
    <section class="section closing">
      <div class="wrap wrap-narrow">
        <h2>Want a look?</h2>
        <p class="section-lede">
          Tackry is built and in testing. If you want to try it, or you have an opinion about
          what it should do next, the address below is a real inbox.
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" href={MAILTO}>Email contact@tackry.com</a>
          <span class="btn btn-ghost is-placeholder" aria-disabled="true">
            Google Play — link at launch
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <div class="footer-brand">
          <Mark size={30} title="Tackry" />
          <span>Tackry</span>
        </div>
        <nav aria-label="Footer">
          <ul>
            <li><a href="/privacy/">Privacy policy</a></li>
            <li><a href={MAILTO}>contact@tackry.com</a></li>
          </ul>
        </nav>
        <p class="colophon">
          Advection Software LLC. Set in Space Grotesk (SIL Open Font License 1.1).
          Screenshots are the app as built, not mock-ups.
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <a class="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Meaning />
        <TodayPull />
        <Loop />
        <Screens />
        <BoardZoom />
        <Themes />
        <Privacy />
        <Reach />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

render(<App />, document.getElementById("app"));
