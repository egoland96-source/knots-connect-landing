/**
 * Design direction: Midnight Signal — blue-black #080c14 canvas, ambient indigo/cyan/violet light,
 * restrained glass surfaces, Space Grotesk + DM Mono, and motion that communicates network state.
 * Preserved dynamic download link logic (GitHub API fetch for latest .exe).
 */
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Download,
  Globe2,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: Route,
    title: "DPI bypass",
    description: "SNI splitting, route shaping and adaptive transport keep your tunnel resilient when networks get restrictive.",
    accent: "cyan",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Private by design",
    description: "A zero-knowledge identity model keeps your access key local and your connection under your control.",
    accent: "violet",
  },
  {
    number: "03",
    icon: Network,
    title: "Split routing",
    description: "Choose what travels through the tunnel and what stays local, without trading control for complexity.",
    accent: "green",
  },
];

const routes = [
  { code: "NL", city: "Amsterdam", ping: "12ms", load: 32, active: true },
  { code: "DE", city: "Frankfurt", ping: "18ms", load: 48, active: false },
  { code: "FI", city: "Helsinki", ping: "24ms", load: 21, active: false },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? "brand brand--compact" : "brand"} href="#top" aria-label="Knots Connect ana sayfa">
      <span className="brand__mark" aria-hidden="true"><span className="brand__knot">⌁</span></span>
      <span className="brand__copy">
        <strong>KNOTS<span>CONNECT</span></strong>
        {!compact && <small>PRIVATE NETWORK CLIENT</small>}
      </span>
    </a>
  );
}

function StatusCard() {
  const [activeRoute, setActiveRoute] = useState(0);
  const route = routes[activeRoute];
  const dashboardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dashboard = dashboardRef.current;
    if (!dashboard) return;
    const bounds = dashboard.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    const tiltX = Math.max(-3.2, Math.min(3.2, normalizedX * 6.4));
    const tiltY = Math.max(-2.4, Math.min(2.4, normalizedY * 4.8));
    const moveX = Math.max(-5, Math.min(5, normalizedX * 10));
    const moveY = Math.max(-4, Math.min(4, normalizedY * 8));

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      dashboard.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      dashboard.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      dashboard.style.setProperty("--move-x", `${moveX.toFixed(2)}px`);
      dashboard.style.setProperty("--move-y", `${moveY.toFixed(2)}px`);
      dashboard.classList.add("product-window--tracking");
    });
  };

  const resetPointer = () => {
    const dashboard = dashboardRef.current;
    if (!dashboard) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    dashboard.style.setProperty("--tilt-x", "0deg");
    dashboard.style.setProperty("--tilt-y", "0deg");
    dashboard.style.setProperty("--move-x", "0px");
    dashboard.style.setProperty("--move-y", "0px");
    dashboard.classList.remove("product-window--tracking");
  };

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="status-visual" aria-label="Knots Connect application preview" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="status-visual__halo status-visual__halo--one" />
      <div className="status-visual__halo status-visual__halo--two" />
      <div className="product-window" ref={dashboardRef}>
        <div className="product-window__topbar">
          <div className="product-window__traffic"><i /><i /><i /></div>
          <span>Knots Connect <em>·</em> Secure tunnel</span>
          <span className="product-window__lock"><LockKeyhole size={12} /> LOCAL KEY</span>
        </div>
        <div className="product-window__body">
          <aside className="product-window__rail">
            <div className="rail-logo" aria-hidden="true"><span className="brand__knot">⌁</span></div>
            <div className="rail-icon rail-icon--active"><Radar size={15} /></div>
            <div className="rail-icon"><SlidersHorizontal size={15} /></div>
            <div className="rail-icon"><LockKeyhole size={15} /></div>
            <div className="rail-line" />
            <div className="rail-icon"><CircleDot size={14} /></div>
          </aside>
          <div className="product-window__content">
            <div className="product-window__heading">
              <div><span className="mono-label">CONNECTION OVERVIEW</span><h3>Protected, by default.</h3></div>
              <span className="live-badge"><span /> LIVE</span>
            </div>
            <div className="connection-card">
              <div className="connection-card__header"><span className="connection-card__state"><span className="pulse-dot" /> TUNNEL ACTIVE</span><span className="mono-label">KNOTS / 4.2.0</span></div>
              <div className="connection-card__main"><div className="ring-wrap"><div className="ring-wrap__track" /><div className="ring-wrap__progress" /><div className="ring-wrap__core"><Zap size={17} /><small>12</small><span>MS LATENCY</span></div></div><div className="connection-card__details"><span className="mono-label">ACTIVE ROUTE</span><strong>{route.city}, {route.code}</strong><small><Globe2 size={11} /> {route.ping} · network load {route.load}</small><div className="micro-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></div>
              <div className="connection-card__footer"><span><LockKeyhole size={12} /> End-to-end encrypted</span><span><Check size={12} /> Zero-knowledge</span></div>
            </div>
            <div className="product-window__section-head"><span className="mono-label">AVAILABLE ROUTES</span><span className="mono-label mono-label--muted">{routes.length} ONLINE</span></div>
            <div className="route-list">{routes.map((item, index) => <button className={`route-row ${item.active ? "route-row--active" : ""}`} key={item.code} onClick={() => setActiveRoute(index)}><span className="route-row__pin"><span /></span><span className="route-row__place"><strong>{item.city}</strong><span>{item.code} · Secure route</span></span><span className="route-row__ping">{item.ping}</span><ChevronRight size={13} /></button>)}</div>
          </div>
        </div>
      </div>
      <div className="floating-readout floating-readout--top"><span className="floating-readout__line" /><span className="floating-readout__label">ROUTE / EU-WEST</span><strong>STABLE</strong></div>
      <div className="floating-readout floating-readout--bottom"><span className="floating-readout__signal"><i /><i /><i /><i /><i /></span><span><small>PROTECTED TRAFFIC</small><strong>1.28 GB</strong></span></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(
    'https://github.com/egoland96-source/knots-connect-desktop/releases/download/v1.1.1/Knots-Connect-Setup-1.1.1.exe'
  );
  const [versionTag, setVersionTag] = useState('v1.1.1');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/egoland96-source/knots-connect-desktop/releases/latest')
      .then((res) => res.json())
      .then((data) => {
        const exeAsset = data.assets?.find((asset: { name: string }) => asset.name.endsWith('.exe'));
        if (exeAsset) {
          setDownloadUrl(exeAsset.browser_download_url);
          setVersionTag(data.tag_name);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="site-shell" id="top">
      <div className="ambient ambient--cyan" aria-hidden="true" />
      <div className="ambient ambient--violet" aria-hidden="true" />
      <div className="ambient ambient--indigo" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner">
          <Logo compact />
          <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Main navigation">
            <a href="#features" onClick={() => setMenuOpen(false)}>Why Knots</a>
            <a href="#protocol" onClick={() => setMenuOpen(false)}>Protocol</a>
            <a href="#security" onClick={() => setMenuOpen(false)}>Security</a>
            <a href="#download" onClick={() => setMenuOpen(false)}>Download</a>
          </nav>
          <div className="site-header__actions"><a className="header-status" href="#status"><span /> SYSTEMS NOMINAL</a><a className="header-link" href="#download">Get the client <ArrowUpRight size={14} /></a><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-image-layer" aria-hidden="true" />
          <div className="hero-section__inner section-width">
            <div className="hero-copy reveal reveal--one"><div className="eyebrow"><span className="eyebrow__line" /> PRIVATE NETWORK CLIENT</div><h1>Unlimited.<br /><em>Your route, free.</em></h1><p className="hero-copy__lead">A high-performance network client with DPI bypass, DNS control and split routing. A freer internet, with less noise.</p><div className="hero-actions"><a className="button button--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer"><Download size={16} /><span>Download for Windows</span><small>{versionTag} · 64-bit</small></a><a className="text-link" href="#protocol">Explore the protocol <ChevronDown size={15} /></a></div><div className="hero-proof"><span className="hero-proof__avatars"><i>R</i><i>K</i><i>+</i></span><span><strong>Built for the open internet</strong><small>Private by design · no account required</small></span></div></div>
            <div className="hero-product reveal reveal--two"><StatusCard /></div>
          </div>
          <div className="hero-section__foot section-width"><span className="scroll-note"><span className="scroll-note__line" /> SCROLL TO DECODE</span><span className="hero-foot-note">The network is noisy. Your route does not have to be.</span></div>
        </section>

        <section className="signal-strip" id="status"><div className="section-width signal-strip__inner"><div><span className="mono-label">KNOTS STATUS</span><strong><span className="status-dot" /> Network layer operational</strong></div><div><span className="mono-label">ACTIVE NODES</span><strong>42 <small>regions</small></strong></div><div><span className="mono-label">AVG LATENCY</span><strong>18 <small>ms</small></strong></div><div><span className="mono-label">CONTROL</span><strong>100 <small>% local</small></strong></div></div></section>

        <section className="story-section section-width" id="features"><div className="section-kicker"><span>01 / WHY KNOTS</span><span className="section-kicker__rule" /></div><div className="story-section__heading"><h2>Complex under the hood.<br /><em>Clear in your hands.</em></h2><p>Security should feel like a quiet advantage, not another dashboard to babysit. Knots Connect turns difficult network conditions into a connection you can trust.</p></div><div className="feature-list">{features.map(({ number, icon: FeatureIcon, title, description, accent }) => <article className={`feature-card feature-card--${accent}`} key={number}><div className="feature-card__top"><span className="feature-card__number">{number}</span><span className="feature-card__icon"><FeatureIcon size={18} /></span></div><h3>{title}</h3><p>{description}</p><a href="#protocol">Learn more <ArrowUpRight size={13} /></a></article>)}</div></section>

        <section className="protocol-section" id="protocol"><div className="section-width protocol-section__inner"><div className="protocol-section__visual"><div className="image-frame"><div className="signal-board" aria-label="Live network route visualization"><span className="signal-board__axis signal-board__axis--horizontal" /><span className="signal-board__axis signal-board__axis--vertical" /><span className="signal-board__route signal-board__route--one" /><span className="signal-board__route signal-board__route--two" /><i className="signal-board__node signal-board__node--one" /><i className="signal-board__node signal-board__node--two" /><i className="signal-board__node signal-board__node--three" /><i className="signal-board__node signal-board__node--four" /><span className="signal-board__readout">ROUTE SECURED <b>4 / 4</b></span></div><span className="image-frame__tag">SIGNAL / ROUTE</span><span className="image-frame__coordinate">51.2194° N<br />4.4025° E</span></div></div><div className="protocol-section__copy"><div className="section-kicker"><span>02 / THE PROTOCOL</span><span className="section-kicker__rule" /></div><h2>Make the route<br /><em>yours.</em></h2><p>Most network tools ask you to choose between speed, privacy and control. Knots is built to keep all three in the same frame.</p><div className="protocol-points"><div><span><Route size={15} /></span><p><strong>DPI-resistant routing</strong><small>Adaptive transport for restrictive networks.</small></p></div><div><span><Globe2 size={15} /></span><p><strong>Split by intent</strong><small>Route only what needs protection.</small></p></div><div><span><SlidersHorizontal size={15} /></span><p><strong>Control without noise</strong><small>Technical depth when you need it.</small></p></div></div><a className="outline-link" href="#download">See how it works <ArrowUpRight size={14} /></a></div></div></section>

        <section className="security-section" id="security"><div className="section-width security-section__inner"><div className="security-section__copy"><div className="section-kicker"><span>03 / PRIVATE BY DESIGN</span><span className="section-kicker__rule" /></div><h2>Your key stays<br /><em>with you.</em></h2><p>Knots uses a local-first identity model. No email recovery loop. No hidden profile. Your device is the key, and your route stays under your control.</p><div className="security-callout"><ShieldCheck size={17} /><div><strong>Zero-knowledge core</strong><small>Identity material never needs to leave your device.</small></div><Check size={15} /></div></div><div className="security-section__visual"><div className="security-orbit" aria-label="Local key verification visualization"><div className="security-orbit__core"><LockKeyhole size={22} /><span>LOCAL<br />KEY</span></div><i /><i /><i /><span className="security-orbit__beam" /></div><div className="orbit-caption"><span className="status-dot" /> LOCAL KEY VERIFIED</div></div></div></section>

        <section className="download-section" id="download"><div className="download-section__grid" aria-hidden="true" /><div className="section-width download-section__inner"><div><div className="eyebrow"><span className="eyebrow__line" /> READY WHEN YOU ARE</div><h2>Own your<br /><em>connection.</em></h2></div><div className="download-section__action"><p>No account. No noise. Just a better route through the internet.</p><a className="button button--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer"><Download size={16} /><span>Download for Windows</span><small>{versionTag} · 64-bit</small></a><span className="download-section__note">Windows 10 or later <span>·</span> 64-bit systems</span></div></div></section>
      </main>

      <footer className="site-footer"><div className="section-width site-footer__inner"><Logo /><div className="site-footer__meta"><span>© 2026 KNOTS CONNECT</span><a href="#security">Privacy first</a><a href="#protocol">Protocol notes</a><a href="#top">Back to top <ArrowUpRight size={13} /></a></div></div></footer>
    </div>
  );
}
