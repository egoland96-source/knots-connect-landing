import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Maximize2,
  Menu,
  Network,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";

import LegalSection from "@/components/LegalSection";

const SOURCE_REPOSITORY_URL = "https://github.com/egoland96-source/knots-connect-desktop";
const DPI_SOURCE_URL = `${SOURCE_REPOSITORY_URL}/blob/main/src/privacy/dpi/DPIDomains.ts`;
const TRACKER_SOURCE_URL = `${SOURCE_REPOSITORY_URL}/blob/main/src/privacy/categories/TrackerBlocker.ts`;
const MODES_SOURCE_URL = `${SOURCE_REPOSITORY_URL}/blob/main/src/pages/Dashboard/components/ModeSwitcher.tsx`;
const PRIVACY_SOURCE_URL = `${SOURCE_REPOSITORY_URL}/tree/main/src/privacy`;
type ReleaseInfo = { version: string; size: string; url: string; pageUrl: string; sha256: string };
const FALLBACK_RELEASE: ReleaseInfo = {
  version: "v1.3.5",
  size: "78 MB",
  url: `${SOURCE_REPOSITORY_URL}/releases/download/v1.3.5/Knots-Connect-Setup-1.3.5.exe`,
  pageUrl: `${SOURCE_REPOSITORY_URL}/releases/tag/v1.3.5`,
  sha256: "7a704ff82dfd516097d4206d9440289dff6eed85ed3da5a9190bf50969aded9c",
};

const features = [
  {
    number: "01",
    icon: Route,
    title: "Packet interception",
    description: "WinDivert-level packet handling for inspecting, redirecting and shaping traffic on Windows.",
    accent: "cyan",
    href: DPI_SOURCE_URL,
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "DPI-aware routing",
    description: "Local routing rules adapt transport decisions for networks that inspect or restrict traffic.",
    accent: "violet",
    href: TRACKER_SOURCE_URL,
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Local identity",
    description: "Cryptographic identity and privacy controls remain on the client. No central activity log.",
    accent: "green",
    href: MODES_SOURCE_URL,
  },
];

const locations = [
  { code: "NL", city: "Amsterdam", country: "Netherlands" },
  { code: "DE", city: "Frankfurt", country: "Germany" },
  { code: "FI", city: "Helsinki", country: "Finland" },
];

function DownloadLink({ release }: { release: ReleaseInfo }) {
  return (
    <a
      className="button button--primary"
      href={release.url}
      aria-label={`Download Knots Connect ${release.version} Windows 64-bit installer, ${release.size}`}
    >
      <Download size={16} aria-hidden="true" />
      <span>Download for Windows</span>
      <small>{release.version} · x64</small>
    </a>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? "brand brand--compact" : "brand"} href="#top" aria-label="Knots Connect home">
      <span className="brand__mark" aria-hidden="true"><img src="/assets/knots-logo-mark.png" alt="" /></span>
      <span className="brand__copy">
        <strong>KNOTS <span>CONNECT</span></strong>
        {!compact && <small>PRIVATE NETWORK CLIENT</small>}
      </span>
    </a>
  );
}

function StatusCard() {
  const screenshotRef = useRef<HTMLElement>(null);
  const screenshotFrameRef = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleScreenshotPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const screenshot = screenshotRef.current;
    if (!screenshot) return;
    const bounds = screenshot.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (screenshotFrameRef.current) cancelAnimationFrame(screenshotFrameRef.current);
    screenshotFrameRef.current = requestAnimationFrame(() => {
      screenshot.style.setProperty("--tilt-x", `${(-y * 5.2).toFixed(2)}deg`);
      screenshot.style.setProperty("--tilt-y", `${(x * 6.4).toFixed(2)}deg`);
      screenshot.style.setProperty("--lift-y", "-2px");
      screenshot.classList.add("actual-screen--tracking");
    });
  };

  const resetScreenshotPointer = () => {
    const screenshot = screenshotRef.current;
    if (screenshotFrameRef.current) cancelAnimationFrame(screenshotFrameRef.current);
    screenshotFrameRef.current = null;
    if (!screenshot) return;
    screenshot.style.setProperty("--tilt-x", "0deg");
    screenshot.style.setProperty("--tilt-y", "0deg");
    screenshot.style.setProperty("--lift-y", "0px");
    screenshot.classList.remove("actual-screen--tracking");
  };

  useEffect(() => () => {
    if (screenshotFrameRef.current) cancelAnimationFrame(screenshotFrameRef.current);
  }, []);

  return (
    <div className="status-visual status-visual--actual">
      <div className="status-visual__halo status-visual__halo--one" aria-hidden="true" />
      <div className="status-visual__halo status-visual__halo--two" aria-hidden="true" />
      <figure className="actual-screen" ref={screenshotRef} onPointerMove={handleScreenshotPointerMove} onPointerLeave={resetScreenshotPointer}>
        <button className="actual-screen__button" type="button" onClick={() => dialogRef.current?.showModal()} aria-label="Open the Knots Connect screenshot at full size">
          <img
            className="actual-screen__image"
            src="/assets/knots-desktop-ui-public-v2.png"
            alt="The Knots Connect desktop Overview screen in a disconnected state, showing the Amsterdam location, a Europe map, connection settings and a Connect button."
            width={1700}
            height={911}
            loading="eager"
            decoding="async"
          />
          <span className="actual-screen__expand"><Maximize2 size={13} aria-hidden="true" /> Click to enlarge</span>
        </button>
        <figcaption className="actual-screen__caption">
          <span className="actual-screen__label"><i aria-hidden="true" /> REAL APP SCREENSHOT</span>
          <span className="actual-screen__caption-meta">
            <span className="actual-screen__state">Disconnected · Amsterdam</span>
            <span className="actual-screen__open-hint"><Maximize2 size={11} aria-hidden="true" /> Enlarge</span>
          </span>
        </figcaption>
      </figure>
      <dialog className="actual-screen-dialog" ref={dialogRef} aria-labelledby="actual-screen-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        <div className="actual-screen-dialog__panel">
          <div className="actual-screen-dialog__header">
            <div><strong id="actual-screen-dialog-title">Knots Connect · Desktop interface</strong><span>Disconnected · Amsterdam</span></div>
            <button className="actual-screen-dialog__close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close full-size screenshot"><X size={17} aria-hidden="true" /></button>
          </div>
          <img className="actual-screen-dialog__image" src="/assets/knots-desktop-ui-public-v2.png" alt="Full-size Knots Connect desktop Overview screenshot in the disconnected state." width={1700} height={911} />
          <p className="actual-screen-dialog__note">Actual app screenshot · Captured in disconnected state</p>
        </div>
      </dialog>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [release, setRelease] = useState<ReleaseInfo>(FALLBACK_RELEASE);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const spotlightFrameRef = useRef<number | null>(null);
  useEffect(() => {
    fetch("https://api.github.com/repos/egoland96-source/knots-connect-desktop/releases/latest")
      .then((response) => response.json())
      .then((data) => {
        const installer = data.assets?.find((asset: { name?: string }) => asset.name?.endsWith(".exe"));
        if (!installer || !data.tag_name) return;
        const digest = typeof installer.digest === "string" ? installer.digest.replace(/^sha256:/, "") : "";
        setRelease({
          version: data.tag_name,
          size: `${Math.round(installer.size / 1024 / 1024)} MB`,
          url: installer.browser_download_url,
          pageUrl: data.html_url || `${SOURCE_REPOSITORY_URL}/releases/latest`,
          sha256: digest || FALLBACK_RELEASE.sha256,
        });
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handlePagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    if (spotlightFrameRef.current) cancelAnimationFrame(spotlightFrameRef.current);
    spotlightFrameRef.current = requestAnimationFrame(() => {
      spotlight.style.setProperty("--cursor-x", `${event.clientX}px`);
      spotlight.style.setProperty("--cursor-y", `${event.clientY}px`);
      spotlight.classList.add("cursor-spotlight--active");
    });
  };

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    if (spotlightFrameRef.current) cancelAnimationFrame(spotlightFrameRef.current);
  }, []);

  return (
    <div className="site-shell" id="top" ref={spotlightRef} onPointerMove={handlePagePointerMove}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="ambient ambient--cyan" aria-hidden="true" />
      <div className="ambient ambient--violet" aria-hidden="true" />
      <div className="ambient ambient--indigo" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner">
          <Logo compact />
          <nav id="primary-navigation" className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Main navigation">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#protocol" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#security" onClick={() => setMenuOpen(false)}>Privacy controls</a>
            <a href="#download" onClick={() => setMenuOpen(false)}>Download</a>
            <a href="#legal" onClick={() => setMenuOpen(false)}>Policies</a>
          </nav>
          <div className="site-header__actions">
            <a className="header-status" href={release.pageUrl} target="_blank" rel="noreferrer"><span /> VERSION {release.version}</a>
            <a className="header-link" href="#download">Get the client <ArrowUpRight size={14} /></a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image-layer" aria-hidden="true" />
          <div className="hero-section__inner section-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow__line" /> WINDOWS NETWORK CLIENT</div>
              <h1 id="hero-title">Private network infrastructure.<br /><em>Controlled at the packet level.</em></h1>
              <p className="hero-copy__lead">WinDivert-level packet control, DPI-aware routing and a zero-knowledge identity model for Windows.</p>
              <div className="hero-actions"><DownloadLink release={release} /></div>
            </div>
            <div className="hero-product"><StatusCard /></div>
          </div>
          <div className="hero-section__foot section-width"><a className="scroll-note" href="#features"><span className="scroll-note__line" /> EXPLORE THE FEATURES <ChevronDown size={13} /></a><a className="hero-foot-note" href={release.pageUrl} target="_blank" rel="noreferrer">Release {release.version} · published by GitHub <ArrowUpRight size={12} /></a></div>
        </section>

        <section className="signal-strip reveal-on-scroll" id="release" data-reveal aria-label="Release information">
          <div className="section-width signal-strip__inner">
            <div><span className="mono-label">LATEST RELEASE</span><strong>{release.version} <small>GitHub release</small></strong></div>
            <div><span className="mono-label">PLATFORM</span><strong>Windows <small>x64</small></strong></div>
            <div><span className="mono-label">INSTALLER</span><strong>{release.size} <small>.exe</small></strong></div>
            <div><span className="mono-label">INTEGRITY</span><strong>SHA-256 <small>published</small></strong></div>
          </div>
        </section>

        <section className="story-section section-width reveal-on-scroll" id="features" data-reveal aria-labelledby="features-title">
          <div className="section-kicker"><span>01 / WHY KNOTS</span><span className="section-kicker__rule" /></div>
          <div className="story-section__heading"><h2 id="features-title">Packet-level control.<br /><em>Local decisions.</em></h2><p>Core capabilities of the Windows client, described at the level where routing and privacy decisions are made.</p></div>
          <div className="feature-list">{features.map(({ number, title, description, accent, href }) => <article className={`feature-card feature-card--${accent}`} key={number}><div className="feature-card__top"><span className="feature-card__number">{number}</span><span className="feature-card__type">CORE CAPABILITY</span></div><h3>{title}</h3><p>{description}</p><a href={href} target="_blank" rel="noreferrer">View source <ArrowUpRight size={13} aria-hidden="true" /></a></article>)}</div>
        </section>

        <section className="protocol-section reveal-on-scroll" id="protocol" data-reveal aria-labelledby="protocol-title">
          <div className="section-width protocol-section__inner">
            <div className="protocol-section__visual"><div className="image-frame"><div className="signal-board" role="img" aria-label="Illustration showing device, DPI bypass and VPN routing layers"><span className="signal-board__axis signal-board__axis--horizontal" /><span className="signal-board__axis signal-board__axis--vertical" /><span className="signal-board__route signal-board__route--one" /><span className="signal-board__route signal-board__route--two" /><i className="signal-board__node signal-board__node--one" /><i className="signal-board__node signal-board__node--two" /><i className="signal-board__node signal-board__node--three" /><i className="signal-board__node signal-board__node--four" /><span className="signal-board__readout">ROUTE DIAGRAM <b>ILLUSTRATIVE</b></span></div><span className="image-frame__tag">CONNECTION LAYERS</span><span className="image-frame__coordinate">STATIC<br />ILLUSTRATION</span></div></div>
            <div className="protocol-section__copy"><div className="section-kicker"><span>02 / THE CLIENT</span><span className="section-kicker__rule" /></div><h2 id="protocol-title">Choose the tools<br /><em>that fit.</em></h2><p>The desktop client brings VPN modes, DPI-bypass options and configurable privacy filters into one interface. The artwork here is illustrative—not a live connection or network-status feed.</p><div className="protocol-points"><div><span><Route size={15} /></span><p><strong>DPI-bypass options</strong><small>Connection controls for restrictive networks.</small></p></div><div><span><Network size={15} /></span><p><strong>VPN and Smart Hybrid</strong><small>Connection modes available in the client.</small></p></div><div><span><ShieldCheck size={15} /></span><p><strong>Adjustable filters</strong><small>Ads, trackers, malware and phishing categories.</small></p></div></div><a className="outline-link" href={MODES_SOURCE_URL} target="_blank" rel="noreferrer">Inspect the client source <ArrowUpRight size={14} /></a></div>
          </div>
        </section>

        <section className="security-section reveal-on-scroll" id="security" data-reveal aria-labelledby="security-title">
          <div className="section-width security-section__inner">
            <div className="security-section__copy"><div className="section-kicker"><span>03 / PRIVACY CONTROLS</span><span className="section-kicker__rule" /></div><h2 id="security-title">Privacy you can<br /><em>inspect.</em></h2><p>The public client source includes category-based ad and tracker filtering. The policy draft below presents additional service-level privacy statements for review against actual product behavior.</p><div className="security-callout"><ShieldCheck size={17} aria-hidden="true" /><div><strong>Filter categories in the client</strong><small>Ads · trackers · malware · phishing</small></div><Check size={15} aria-hidden="true" /></div><a className="outline-link security-source-link" href={PRIVACY_SOURCE_URL} target="_blank" rel="noreferrer">Review privacy-filter source <ArrowUpRight size={14} /></a></div>
            <div className="security-section__visual"><div className="security-orbit" role="img" aria-label="Illustration of user-controlled privacy filter categories"><div className="security-orbit__core"><ShieldCheck size={22} /><span>FILTER<br />CONTROLS</span></div><i /><i /><i /><span className="security-orbit__beam" /></div><div className="orbit-caption"><span className="status-dot" /> USER-CONTROLLABLE CATEGORIES</div></div>
          </div>
        </section>

        <section className="download-section reveal-on-scroll" id="download" data-reveal aria-labelledby="download-title">
          <div className="download-section__grid" aria-hidden="true" />
          <div className="section-width download-section__inner">
            <div><div className="eyebrow"><span className="eyebrow__line" /> WINDOWS CLIENT · {release.version}</div><h2 id="download-title">Your next route<br /><em>starts here.</em></h2></div>
            <div className="download-section__action"><p>Download the Windows 64-bit installer, then verify its SHA-256 against the publisher’s release page.</p><DownloadLink release={release} /><span className="download-section__note">Windows x64 <span>·</span> {release.size} <span>·</span> Minimum OS version not specified</span><div className="checksum-panel"><div><span>INSTALLER SHA-256</span><a href={release.pageUrl} target="_blank" rel="noreferrer">Verify on GitHub <ArrowUpRight size={12} /></a></div><code>{release.sha256}</code></div><p className="release-caveat">The installer checksum is published with the GitHub release for independent verification.</p></div>
          </div>
        </section>
        <LegalSection />
      </main>

      <footer className="site-footer"><div className="section-width site-footer__inner"><Logo /><div className="site-footer__meta"><span>© 2026 KNOTS CONNECT</span><a href={PRIVACY_SOURCE_URL} target="_blank" rel="noreferrer">Privacy-filter source</a><a href={release.pageUrl} target="_blank" rel="noreferrer">Release notes + SHA-256</a><a href={SOURCE_REPOSITORY_URL} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="#top">Back to top <ArrowUpRight size={13} /></a></div></div></footer>
    </div>
  );
}
