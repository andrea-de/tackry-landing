import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Mark, Plate } from "./mark.jsx";
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
    ["#loop", "How it works"],
    ["#today", "Today"],
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
        <figure class="hero-shot">
          <img
            src="/media/today-fanned.webp"
            width="720"
            height="1558"
            alt="Tackry's Today screen in the Midnight theme: six plate-coloured cards in two columns — a white card “Post-launch follow-up”, blue cards for saved notifications and a list, and yellow cards for items with reminders due."
            fetchpriority="high"
            decoding="async"
          />
        </figure>
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
    img: "/media/capture-notification.webp",
    alt: "A captured Spotify notification opened in Tackry's Light theme. The card shows the app, the time, the notification text, and two live buttons, Go to Spotify and Save, above Edit, Pin, Remind, Category and Delete.",
    w: 720, h: 1558,
  },
  {
    n: "02",
    title: "Tack it",
    body: [
      "Saving turns a capture into a tack: the one object Tackry keeps. A tack can be a note, a checklist, a captured notification, a shared link with its preview, or a file.",
      "Pin the ones that matter, give them a category, search them, swipe them away. The board is one flat place, not a folder tree.",
    ],
    img: "/media/board-midnight.webp",
    alt: "Tackry's Tackboard in the Midnight theme: a search field, category chips for Launch, Flow, Home and Research, and a list of saved tacks with coloured category dots and pin markers.",
    w: 720, h: 1558,
  },
  {
    n: "03",
    title: "Be reminded",
    body: [
      "Any tack can become a reminder — a quick pick, an exact date and time, or daily, weekdays, weekly.",
      "When reminders come due they arrive together in one floating Android bubble instead of a pile of separate notifications. Mark one done, snooze it an hour, hide the lot for fifteen minutes, or open the app.",
    ],
    img: "/media/bubble.webp",
    alt: "Tackry's grouped reminder bubble, titled “2 reminders due”, listing Morning review and Resume focus playlist, each with Done and Snooze 1h buttons, above Hide all for 15m and Open Tackry.",
    w: 720, h: 1083,
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
              <figure class="shot shot-phone">
                <img src={step.img} width={step.w} height={step.h} alt={step.alt} loading="lazy" decoding="async" />
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- today -- */

function Today() {
  return (
    <section class="section section-alt" id="today">
      <div class="wrap">
        <p class="eyebrow">Today</p>
        <h2>A stack that fans out</h2>
        <p class="section-lede">
          Today opens on a single stack of plates — the app's own mark, holding your pinned
          tacks. Tap it and the stack fans into a grid. Tap a card and it grows into a full
          view you can act on, then shrinks back where it came from.
        </p>
        <div class="today-grid">
          <figure class="shot shot-phone">
            <img
              src="/media/today-stack.webp" width="720" height="1558" loading="lazy" decoding="async"
              alt="Tackry's Today screen with the stack closed: three tilted plates in white, blue and yellow, the top one showing a pinned tack, above counts for due now, pinned and new captures."
            />
            <figcaption>Closed: one stack, a due-now row, one thing to rediscover.</figcaption>
          </figure>
          <figure class="shot shot-phone">
            <img
              src="/media/today-fanned.webp" width="720" height="1558" loading="lazy" decoding="async"
              alt="The same Today screen after tapping the stack: the plates have fanned into a two-column grid of white, blue and yellow cards."
            />
            <figcaption>Tapped: the same plates, fanned into a grid.</figcaption>
          </figure>
          <figure class="shot shot-phone">
            <img
              src="/media/hero-open.webp" width="720" height="1558" loading="lazy" decoding="async"
              alt="A tack opened as a hero sheet over a dimmed Tackboard in the Light theme, showing its category, title and body above Edit, Unpin, Remind, Category, Copy and Delete."
            />
            <figcaption>Opened: the card becomes the sheet, with its actions.</figcaption>
          </figure>
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
    img: "/media/theme-light.webp",
    alt: "Tackry's Tackboard in the Light theme on a wide screen: cream cards with coloured outlines on a warm sand background.",
  },
  {
    name: "Dark",
    body: "The same warmth turned down, not a grey inversion.",
    img: "/media/theme-dark.webp",
    alt: "The same Tackboard in the Dark theme: near-black green-tinted background with cream text and muted green, orange and gold accents.",
  },
  {
    name: "Midnight",
    body: "The mark's own colours — white, blue and yellow on navy — across the whole app.",
    img: "/media/theme-midnight.webp",
    alt: "The same Tackboard in the Midnight theme: deep navy background, off-white text, and blue and yellow accents.",
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
            <figure class="shot" key={t.name}>
              <img src={t.img} width="1200" height="750" alt={t.alt} loading="lazy" decoding="async" />
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
  ["Tablets and folds", "Wide screens get a navigation rail and a list-and-detail pane rather than a stretched phone layout."],
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
        <Loop />
        <Today />
        <Meaning />
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
