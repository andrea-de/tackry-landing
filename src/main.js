import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";
import htm from "htm";

const html = htm.bind(h);

const ITEM_PRESETS = {
  inbox_zero: {
    kind: "tack",
    theme: "light",
    tone: "rose",
    category: "List",
    label: "Workflows",
    title: "Inbox Zero routine",
    metaLeft: "Pinned",
    metaRight: "Mar 22, 15:20",
    body: [
      "Clear notifications twice a day.",
      "Archive anything that does not need action.",
      "Pin the urgent ones.",
    ],
  },
  post_launch_follow_up: {
    kind: "tack",
    theme: "light",
    tone: "sage",
    surface: "gold",
    category: "Design",
    categoryTone: "gold",
    label: "Launch",
    labelTone: "gold",
    title: "Post-launch follow-up",
    metaLeft: "Pinned",
    metaRight: "Mar 27, 18:20",
    body: ["Reply to beta feedback and capture the strongest quotes for the website."],
  },
  spotify_follow_up: {
    kind: "tack",
    theme: "light",
    tone: "slate",
    surface: "violet",
    category: "Notification",
    categoryTone: "violet",
    label: "Reminder bubbled",
    labelTone: "violet",
    title: "Spotify reminder bubbled",
    metaLeft: "Pinned",
    metaRight: "Mar 27, 15:05",
    body: ["Resume focus playlist when the reminder opens."],
  },
  morning_review: {
    kind: "reminder",
    theme: "light",
    tone: "sage",
    when: "Scheduled Mar 28, 15:20",
    metaRight: "Mar 28, 15:20",
    label: "Routine",
    title: "Morning review",
    body: ["Check pinned tacks, clear stale reminders, and trim the board to one screen."],
  },
  email_handoff: {
    kind: "reminder",
    theme: "light",
    tone: "sage",
    when: "Scheduled Mar 28, 21:10",
    metaRight: "Mar 28, 21:10",
    label: "Later",
    title: "Email handoff recap",
    body: ["Send the final landing page notes once the last widget assets are approved."],
  },
  notification_spotify: {
    kind: "notification",
    theme: "light",
    tone: "violet",
    surface: "violet",
    app: "Spotify",
    time: "Mar 27, 15:05",
    title: "Spotify reminder bubbled",
    body: ["Resume focus playlist when the reminder opens."],
    actions: ["Open", "Snooze", "Save"],
  },
  notification_gmail: {
    kind: "notification",
    theme: "light",
    tone: "sage",
    surface: "sage",
    app: "Gmail",
    time: "Mar 27, 13:20",
    title: "Launch checklist review",
    body: ["You have a draft thread with the latest landing page feedback."],
  },
  notification_slack: {
    kind: "notification",
    theme: "light",
    tone: "rose",
    surface: "rose",
    app: "Slack",
    time: "Mar 27, 14:50",
    title: "Design handoff",
    body: ["The updated widget assets are ready for review."],
  },
  widget_text: {
    kind: "widget",
    theme: "dark",
    variant: "small",
    badge: "Text",
    title: "Morning review",
    body: ["Clear stale reminders and trim the board."],
  },
  widget_list: {
    kind: "widget",
    theme: "dark",
    variant: "small",
    badge: "5 Pinned",
    title: "Inbox Zero routine",
    body: ["Clear notifications twice a day."],
  },
  widget_reminders: {
    kind: "widget",
    theme: "dark",
    variant: "reminders",
    headerLabel: "2 Reminders Now",
    items: [
      {
        tone: "violet",
        label: "Notification",
        title: "Spotify reminder bubbled",
        body: "Resume focus playlist when the reminder opens.",
        meta: "Due Mar 27, 15:05",
      },
      {
        tone: "blue",
        label: "Text",
        title: "Morning review",
        body: "Check pinned tacks, clear stale reminders, and trim the board to one screen.",
        meta: "Due Mar 27, 15:42",
      },
    ],
  },
};

const SAMPLE_ITEMS = {
  hero_inbox_zero: {
    kind: "tack",
    theme: "light",
    tone: "rose",
    category: "Note",
    label: "Pinned",
    title: "Quote to keep nearby",
    metaLeft: "Pinned",
    metaRight: "Apr 1, 09:12",
    body: ["“The board should feel alive, not busy.”"],
  },
  hero_morning_review: {
    kind: "reminder",
    theme: "light",
    tone: "sage",
    when: "Scheduled Apr 1, 17:30",
    metaRight: "Today, 17:30",
    label: "Later",
    title: "Pick up dish soap",
    body: ["Bring this back before the evening grocery run."],
  },
  hero_notification_spotify: {
    kind: "notification",
    theme: "light",
    tone: "violet",
    surface: "violet",
    app: "NYT Cooking",
    time: "Today, 12:18",
    title: "Recipe link from Sam",
    body: ["Save the recipe now and come back to it when you are ready to cook."],
    actions: ["Open", "Snooze", "Save"],
  },
  hero_notification_gmail: {
    kind: "notification",
    theme: "light",
    tone: "sage",
    surface: "sage",
    app: "Messages",
    time: "Today, 13:20",
    title: "Gate code from Maya",
    body: ["Keep the message handy for later instead of searching your thread."],
  },
  hero_widget_text: {
    kind: "widget",
    theme: "dark",
    variant: "small",
    badge: "Quick Note",
    title: "Saturday errands",
    body: ["Milk, batteries, and a return before noon."],
  },

  moment_capture_notifications: {
    kind: "notification",
    theme: "light",
    tone: "sage",
    surface: "sage",
    app: "Messages",
    time: "Today, 16:42",
    title: "Maya: try Pica Pica Friday",
    body: ["Save the dinner idea before the message disappears into the thread."],
    actions: ["Open", "Snooze", "Save"],
  },
  moment_keep_notes: {
    kind: "tack",
    theme: "light",
    tone: "rose",
    category: "Note",
    label: "Friday",
    title: "Pica Pica dinner plan",
    metaLeft: "Pinned",
    metaRight: "Apr 1, 16:44",
    body: [
      "Carrer de Sueca patio table.",
      "Book after 6 if everyone is in.",
    ],
  },
  moment_track_reminders: {
    kind: "reminder",
    theme: "light",
    tone: "sage",
    when: "Scheduled Apr 1, 18:10",
    metaRight: "Today, 18:10",
    label: "Dinner",
    title: "Book Pica Pica table",
    body: ["Bring this back before leaving work so the reservation actually happens."],
  },

  detail_notifications_gmail: { ...ITEM_PRESETS.notification_gmail },
  detail_notifications_slack: { ...ITEM_PRESETS.notification_slack },

  detail_board_inbox_zero: { ...ITEM_PRESETS.inbox_zero },
  detail_board_spotify_follow_up: { ...ITEM_PRESETS.spotify_follow_up },

  detail_surfaces_widget_list: { ...ITEM_PRESETS.widget_list },
  detail_surfaces_widget_text: { ...ITEM_PRESETS.widget_text },
  detail_surfaces_widget_reminders: { ...ITEM_PRESETS.widget_reminders },

  signal_capture_notification: {
    kind: "notification",
    theme: "light",
    tone: "sage",
    surface: "sage",
    app: "Messages",
    time: "Apr 2, 09:48",
    title: "Share this wine bar",
    body: ["Keep the recommendation without losing the original message."],
    actions: ["Open", "Save"],
  },
  signal_keep_note: {
    kind: "tack",
    theme: "light",
    tone: "rose",
    category: "Link",
    title: "Paella spot for Friday",
    metaLeft: "Saved",
    metaRight: "Apr 2, 10:18",
    body: ["Shared from Maps with the patio note still attached."],
    sourceLabel: "maps.app",
  },
  signal_return_reminder: {
    kind: "tack",
    theme: "light",
    tone: "sage",
    category: "Article",
    title: "Train route for Seville",
    metaLeft: "Shared",
    metaRight: "Apr 2, 11:04",
    body: ["Saved from Chrome without leaving the page you were on."],
    sourceLabel: "rail.cc",
  },
  signal_surface_widget: {
    kind: "tack",
    theme: "light",
    tone: "violet",
    surface: "violet",
    category: "Media",
    categoryTone: "violet",
    title: "Poster reference",
    metaLeft: "Shared",
    metaRight: "Apr 2, 11:42",
    body: ["Kept from the photo sheet for later inspiration."],
    mediaPreview: true,
  },

  bubble_preview: {
    kind: "reminder",
    theme: "light",
    tone: "sage",
    when: "Scheduled Apr 2, 19:10",
    metaRight: "Today, 19:10",
    label: "Dinner",
    title: "Check reservation reply",
    body: ["Open the bubble, confirm the booking, and get back to what you were doing."],
  },

  theme_demo_sample: { ...ITEM_PRESETS.post_launch_follow_up },
};

const heroFragments = [
  {
    itemId: "hero_inbox_zero",
    className: "fragment-card fragment-card-tack",
    highlight: "Notes worth keeping visible.",
  },
  {
    itemId: "hero_morning_review",
    className: "fragment-card fragment-card-reminder",
    highlight: "Reminders worth resurfacing.",
  },
  {
    itemId: "hero_notification_spotify",
    className: "fragment-card fragment-card-notification",
    highlight: "Notifications worth revisiting.",
  },
  {
    itemId: "hero_notification_gmail",
    className: "fragment-card fragment-card-notification-secondary",
    highlight: "Messages worth saving for later.",
  },
  {
    itemId: "hero_widget_text",
    className: "fragment-card fragment-card-widget",
    highlight: "Widgets worth keeping close.",
  },
];

const productMoments = [
  {
    eyebrow: "Capture",
    superTitle: "Notifications",
    body: "Save it before it vanishes.",
    itemId: "moment_capture_notifications",
  },
  {
    eyebrow: "Keep",
    superTitle: "Notes",
    body: "Pin what should stay nearby.",
    itemId: "moment_keep_notes",
  },
  {
    eyebrow: "Track",
    superTitle: "Reminders",
    body: "Bring it back on time.",
    itemId: "moment_track_reminders",
  },
];

const detailRows = [
  {
    id: "notifications",
    eyebrow: "Notifications",
    title: "Capture from the moment it appears",
    body:
      "Tackry works best when useful information is still fresh. Save a notification, keep the sender and context, then decide later whether it belongs pinned on the board or scheduled as a reminder.",
    itemIds: [
      { itemId: "detail_notifications_gmail", className: "piece-wide" },
      { itemId: "detail_notifications_slack", className: "piece-wide" },
    ],
    reverse: true,
  },
  {
    id: "board",
    eyebrow: "Board",
    title: "Use smaller objects to build a bigger picture",
    body:
      "The board works because different kinds of saved content can coexist without becoming visually uniform. A short note, a saved notification, and a pinned item each keep their own weight.",
    itemIds: [
      { itemId: "detail_board_inbox_zero", className: "piece-tall" },
      { itemId: "detail_board_spotify_follow_up", className: "piece-tall" },
    ],
  },
  {
    id: "surfaces",
    eyebrow: "Surface Anything",
    title: "Widgets for notes, reminders, and shortcuts",
    body:
      "Keep useful things on your home screen so notes, reminders, and quick actions stay easy to reach.",
    itemIds: [
      { itemId: "detail_surfaces_widget_list", className: "piece-widget" },
      { itemId: "detail_surfaces_widget_text", className: "piece-widget" },
      { itemId: "detail_surfaces_widget_reminders", className: "piece-widget-large" },
    ],
  },
];

const signalStrip = [
  { itemId: "signal_capture_notification", label: "Message" },
  { itemId: "signal_keep_note", label: "Place" },
  { itemId: "signal_return_reminder", label: "Article" },
  { itemId: "signal_surface_widget", label: "Media" },
];

const themeSwitchItemId = "theme_demo_sample";

function AndroidStoreButton() {
  return html`
    <a class="store-button" href="#" aria-label="Download on Android app store">
      <span class="store-button-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img">
          <path d="M7.2 8.1h9.6a.9.9 0 0 1 .9.9v6.6a1.8 1.8 0 0 1-1.8 1.8H8.1a1.8 1.8 0 0 1-1.8-1.8V9a.9.9 0 0 1 .9-.9Z"/>
          <path d="M9.1 5.8 7.8 3.9m7.1 1.9 1.3-1.9"/>
          <circle cx="9.7" cy="11.3" r=".6"/>
          <circle cx="14.3" cy="11.3" r=".6"/>
          <path d="M5.4 9.7v5.2m13.2-5.2v5.2m-9.8 2.5v2.3m4.4-2.3v2.3"/>
        </svg>
      </span>
      <span class="store-button-copy">
        <strong>Get it on Android</strong>
        <span>App Store Listing</span>
      </span>
    </a>
  `;
}

function itemById(itemId) {
  return SAMPLE_ITEMS[itemId];
}

function classNames(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Pill({ children, tone = "rose", className = "" }) {
  return html`<span class=${classNames("ui-pill", `ui-pill-${tone}`, className)}>${children}</span>`;
}

function surfaceClass(item) {
  return item.surface ? `ui-card-surface-${item.surface}` : "";
}

function RenderTack({ item, theme = item.theme, compact = false }) {
  return html`
    <div
      class=${classNames(
        "ui-card",
        "ui-card-tack",
        `ui-theme-${theme}`,
        surfaceClass(item),
        compact && "ui-card-compact",
      )}
    >
      <div class="ui-card-top">
        <div class="ui-card-top-left">
          <${Pill} tone=${item.categoryTone ?? item.tone}>${item.category}<//>
          ${item.sourceLabel
            ? html`<span class="ui-source-chip">${item.sourceLabel}</span>`
            : null}
        </div>
        <div class="ui-meta">
          <span class="ui-meta-accent">${item.metaLeft}</span>
          <span>${item.metaRight}</span>
        </div>
      </div>
      ${item.mediaPreview
        ? html`<div class="ui-media-preview" aria-hidden="true"></div>`
        : null}
      <h3>${item.title}</h3>
      ${item.label
        ? html`<${Pill} tone=${item.labelTone ?? item.tone} className="ui-card-tag">${item.label}<//>`
        : null}
      <div class="ui-copy">
        ${item.body.map((line) => html`<p>${line}</p>`)}
      </div>
    </div>
  `;
}

function RenderReminder({ item, theme = item.theme, compact = false }) {
  return html`
    <div
      class=${classNames(
        "ui-card",
        "ui-card-reminder",
        `ui-theme-${theme}`,
        surfaceClass(item),
        compact && "ui-card-compact",
      )}
    >
      <div class="ui-card-top">
        <${Pill} tone=${item.tone}>${item.when}<//>
        <div class="ui-meta">
          <span>${item.metaRight}</span>
        </div>
      </div>
      <h3>${item.title}</h3>
      <${Pill} tone=${item.tone} className="ui-card-tag">${item.label}<//>
      <div class="ui-copy">
        ${item.body.map((line) => html`<p>${line}</p>`)}
      </div>
    </div>
  `;
}

function RenderNotification({ item, theme = item.theme, compact = false }) {
  return html`
    <div
      class=${classNames(
        "ui-card",
        "ui-card-notification",
        `ui-theme-${theme}`,
        surfaceClass(item),
        compact && "ui-card-compact",
      )}
    >
      <div class="ui-card-top">
        <${Pill} tone=${item.tone}>${item.app}<//>
        <div class="ui-meta">
          <span>${item.time}</span>
        </div>
      </div>
      <h3>${item.title}</h3>
      <div class="ui-copy">
        ${item.body.map((line) => html`<p>${line}</p>`)}
      </div>
      ${item.actions
        ? html`
            <div class="ui-actions">
              ${item.actions.map((action) => html`<button type="button">${action}</button>`)}
            </div>
          `
        : null}
    </div>
  `;
}

function RenderWidget({ item, theme = item.theme }) {
  if (item.variant === "reminders") {
    return html`
      <div class=${classNames("widget", `widget-${theme}`, "widget-reminders")}>
        <div class="widget-head">
          <${Pill} tone=${theme === "dark" ? "mint" : "sage"}>${item.headerLabel}<//>
        </div>
        <div class="widget-stack">
          ${item.items.map(
            (entry) => html`
              <div class="widget-item">
                <${Pill} tone=${entry.tone} className="widget-item-tag">${entry.label}<//>
                <h4>${entry.title}</h4>
                <p>${entry.body}</p>
                <span>${entry.meta}</span>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  return html`
    <div class=${classNames("widget", `widget-${theme}`, "widget-small")}>
      <div class="widget-badge">${item.badge}</div>
      <h4>${item.title}</h4>
      ${item.body.map((line) => html`<p>${line}</p>`)}
    </div>
  `;
}

function Preview({ itemId, theme, compact = false }) {
  const item = itemById(itemId);
  const resolvedTheme = theme ?? item.theme;
  if (item.kind === "tack") return html`<${RenderTack} item=${item} theme=${resolvedTheme} compact=${compact} />`;
  if (item.kind === "reminder") return html`<${RenderReminder} item=${item} theme=${resolvedTheme} compact=${compact} />`;
  if (item.kind === "notification") return html`<${RenderNotification} item=${item} theme=${resolvedTheme} compact=${compact} />`;
  return html`<${RenderWidget} item=${item} theme=${resolvedTheme} compact=${compact} />`;
}

function App() {
  const [previewTheme, setPreviewTheme] = useState("dark");
  const [activeHeroItemId, setActiveHeroItemId] = useState("hero_notification_spotify");
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [activeSurfaceIndex, setActiveSurfaceIndex] = useState(0);
  const activeHeroFragment =
    heroFragments.find((fragment) => fragment.itemId === activeHeroItemId) ?? heroFragments[0];
  const activeMoment = productMoments[activeMomentIndex] ?? productMoments[0];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroItemId((currentItemId) => {
        const currentIndex = heroFragments.findIndex((fragment) => fragment.itemId === currentItemId);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % heroFragments.length;
        return heroFragments[nextIndex].itemId;
      });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveMomentIndex((currentIndex) => (currentIndex + 1) % productMoments.length);
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const surfaces = detailRows.find((row) => row.id === "surfaces");
    if (!surfaces) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveSurfaceIndex((currentIndex) => (currentIndex + 1) % 2);
    }, 2800);
    return () => window.clearInterval(intervalId);
  }, []);

  return html`
    <div class=${classNames("page-shell", `page-theme-${previewTheme}`)}>
      <div class="page-noise"></div>

      <header class="site-header">
        <div class="brand-mark">
          <img src="/public/media/app-icon.png" alt="" />
          <span>Tackry</span>
        </div>
        <nav class="site-nav">
          <a href="#moments">Flow</a>
          <a href="#share">Save</a>
          <a href="#bubble">Bubble</a>
          <a href="#details">Widgets</a>
        </nav>
      </header>

      <main>
        <section class="hero-shell">
          <div class="hero">
            <div class="hero-copy">
              <p class="eyebrow">Note Anything</p>
              <h1>Keep What Matters</h1>
              <p class="hero-body">
                Save the useful things on your device before they disappear into the noise.
              </p>
              <p key=${activeHeroItemId} class="hero-highlight hero-swap">
                ${activeHeroFragment.highlight}
              </p>
              <div
                key=${`mobile-${activeHeroItemId}`}
                class="hero-mobile-preview hero-mobile-preview-active"
                aria-label="Active Tackry example"
              >
                <${Preview} itemId=${activeHeroFragment.itemId} theme=${previewTheme} compact=${true} />
              </div>
              <div class="hero-actions">
                <a class="button button-primary" href="#moments">See How It Works</a>
                <${AndroidStoreButton} />
              </div>
            </div>

            <div class="hero-composition" aria-label="Tackry product fragments">
              ${heroFragments.map(
                (fragment) => html`
                  <figure
                    class=${classNames(
                      fragment.className,
                      activeHeroItemId === fragment.itemId && "fragment-card-active",
                    )}
                    role="button"
                    tabIndex="0"
                    aria-pressed=${activeHeroItemId === fragment.itemId}
                    onMouseEnter=${() => setActiveHeroItemId(fragment.itemId)}
                    onFocus=${() => setActiveHeroItemId(fragment.itemId)}
                    onClick=${() => setActiveHeroItemId(fragment.itemId)}
                  >
                    <${Preview} itemId=${fragment.itemId} theme=${previewTheme} compact=${true} />
                  </figure>
                `,
              )}
            </div>
          </div>
        </section>

        <section class="moment-grid" id="moments">
          <div class=${classNames("moment-flow", `moment-progress-${activeMomentIndex}`)}>
            <div class="moment-flow-top">
              <div class="moment-stage-copy">
                <p class="eyebrow">Capture Anything</p>
                <h2>Don't Miss What Matters</h2>
                <p class="moment-flow-body">
                  Capture notifications, keep them nearby, and decide when they come back.
                </p>
              </div>
              <div key=${`moment-${activeMoment.itemId}`} class="moment-stage-preview">
                <${Preview} itemId=${activeMoment.itemId} theme=${previewTheme} compact=${true} />
              </div>
            </div>
            <div class="moment-flow-main">
              <div class="moment-flow-nav">
                <div class="moment-flow-rail" aria-hidden="true">
                  <span class="moment-flow-line"></span>
                  <span class="moment-flow-pulse"></span>
                </div>
                <div class="moment-flow-steps" role="tablist" aria-label="Tackry flow">
                  ${productMoments.map(
                    (moment, index) => html`
                      <button
                        type="button"
                        class=${classNames("moment-step", activeMomentIndex === index && "moment-step-active")}
                        aria-selected=${activeMomentIndex === index}
                        onClick=${() => setActiveMomentIndex(index)}
                      >
                        <span class="moment-step-chip">
                          <span class="moment-step-top">${moment.eyebrow}</span>
                          <span class="moment-step-bottom">${moment.superTitle}</span>
                        </span>
                      </button>
                    `,
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="signal-band" id="share" aria-label="Tackry signal strip">
          <div class="signal-band-copy">
            <p class="eyebrow">Save Anything</p>
            <h2 class="signal-title">
              <span>Share to Save</span>
              <span class="signal-share-inline" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M17 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM9.6 10.8l4.1-2.5m-4.1 4.4 4.1 2.3" />
                </svg>
              </span>
            </h2>
            <p>
              Use the share sheet to keep links, places, messages, and media without breaking your flow.
            </p>
          </div>
          <div class="signal-marquee">
            <div class="signal-track">
              ${[...signalStrip, ...signalStrip].map(
                (item, index) => html`
                  <figure class="signal-item" key=${index}>
                    <${Preview} itemId=${item.itemId} theme=${previewTheme} compact=${true} />
                  </figure>
                `,
              )}
            </div>
          </div>
        </section>

        <section class="bubble-section" id="bubble" aria-label="Tackry bubbles">
          <div class="bubble-copy">
            <p class="eyebrow">Bubble Anything</p>
            <h2>Whatever you want within reach</h2>
            <p>
              Open a reminder or saved item in a floating bubble, check it quickly,
              then tuck it away again without losing your place.
            </p>
          </div>
          <div class="bubble-stage" aria-hidden="true">
            <div class="bubble-corner-glow"></div>
            <div class="bubble-pop-card">
              <${Preview} itemId="bubble_preview" theme=${previewTheme} compact=${true} />
            </div>
            <div class="bubble-orb">
              <img class="bubble-orb-icon" src="/public/media/app-icon.png" alt="" />
            </div>
          </div>
        </section>

        <section class="detail-section" id="details">
          ${detailRows.filter((row) => row.id !== "notifications" && row.id !== "board").map(
            (row) =>
              row.id === "notifications" || row.id === "board"
                ? html`
                    <article class=${classNames("detail-row", "detail-row-paired", `detail-row-${row.id}`, row.reverse && "detail-row-reverse")}>
                      <div class="detail-stage">
                        ${row.itemIds.map(
                          (item, index) => html`
                            <figure class=${classNames("detail-piece", "detail-piece-paired", `detail-piece-slot-${index + 1}`)}>
                              <${Preview} itemId=${item.itemId} theme=${previewTheme} compact=${true} />
                            </figure>
                          `,
                        )}
                      </div>
                      <div class="detail-copy">
                        <p class="eyebrow">${row.eyebrow}</p>
                        <h2>${row.title}</h2>
                        <p>${row.body}</p>
                      </div>
                    </article>
                  `
                : row.id === "surfaces"
                  ? html`
                      <article class=${classNames("detail-row", `detail-row-${row.id}`, row.reverse && "detail-row-reverse")}>
                        <div class="detail-copy">
                          <p class="eyebrow">${row.eyebrow}</p>
                          <h2>${row.title}</h2>
                          <p>${row.body}</p>
                        </div>
                        <div class="detail-pieces detail-pieces-desktop">
                          ${row.itemIds.map(
                            (item) => html`
                              <figure class=${classNames("detail-piece", item.className)}>
                                <${Preview} itemId=${item.itemId} theme=${previewTheme} compact=${true} />
                              </figure>
                            `,
                          )}
                        </div>
                        <div class="detail-pieces-mobile-rotator">
                          ${activeSurfaceIndex === 0
                            ? html`
                                <div key="surface-small-stack" class="detail-mobile-stack detail-piece-rotating">
                                  ${row.itemIds.slice(0, 2).map(
                                    (item) => html`
                                      <figure class=${classNames("detail-piece", item.className)}>
                                        <${Preview}
                                          itemId=${item.itemId}
                                          theme=${previewTheme}
                                          compact=${true}
                                        />
                                      </figure>
                                    `,
                                  )}
                                </div>
                              `
                            : html`
                                <figure
                                  key="surface-tall-widget"
                                  class=${classNames("detail-piece", row.itemIds[2].className, "detail-piece-rotating")}
                                >
                                  <${Preview}
                                    itemId=${row.itemIds[2].itemId}
                                    theme=${previewTheme}
                                    compact=${true}
                                  />
                                </figure>
                              `}
                        </div>
                      </article>
                    `
                : html`
                    <article class=${classNames("detail-row", `detail-row-${row.id}`, row.reverse && "detail-row-reverse")}>
                      <div class="detail-copy">
                        <p class="eyebrow">${row.eyebrow}</p>
                        <h2>${row.title}</h2>
                        <p>${row.body}</p>
                      </div>
                      <div class="detail-pieces">
                        ${row.itemIds.map(
                          (item) => html`
                            <figure class=${classNames("detail-piece", item.className)}>
                              <${Preview} itemId=${item.itemId} theme=${previewTheme} compact=${true} />
                            </figure>
                          `,
                        )}
                      </div>
                    </article>
                  `,
          )}
        </section>

        <section class="theme-demo">
          <div class="theme-demo-copy">
            <h2>Dark mode and light mode.</h2>
            <p>
              Use either sample to switch the page preview between the two looks.
            </p>
          </div>
          <div class="theme-demo-grid">
            <button
              type="button"
              class=${classNames("theme-demo-button", previewTheme === "light" && "theme-demo-button-active")}
              onClick=${() => setPreviewTheme("light")}
            >
              <span class="theme-demo-label">Light</span>
              <${Preview} itemId=${themeSwitchItemId} theme="light" compact=${true} />
            </button>
            <button
              type="button"
              class=${classNames("theme-demo-button", previewTheme === "dark" && "theme-demo-button-active")}
              onClick=${() => setPreviewTheme("dark")}
            >
              <span class="theme-demo-label">Dark</span>
              <${Preview} itemId=${themeSwitchItemId} theme="dark" compact=${true} />
            </button>
          </div>
        </section>

        <section class="download-section" id="download">
          <div class="download-copy">
            <h2>Get Tackry on Android.</h2>
            <p>
              Install the app from the Android store when you are ready to capture,
              pin, and resurface the small things that matter.
            </p>
          </div>
          <div class="download-actions">
            <div class="download-stack">
              <${AndroidStoreButton} />
              <div class="download-notes">
                <span>Local-first</span>
                <span>Notifications</span>
                <span>Widgets</span>
              </div>
            </div>
          </div>
        </section>

        <footer class="site-footer">
          <span>© 2026 Tackry. All rights reserved.</span>
        </footer>
      </main>
    </div>
  `;
}

render(html`<${App} />`, document.getElementById("app"));
