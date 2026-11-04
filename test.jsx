import { useState, useEffect, useRef } from "react";

/* ============================================================
   DESIGN SYSTEM
   Aesthetic: Technical editorial — like a premium developer
   handbook. Deep navy/slate background, warm amber accents,
   crisp monospace code blocks. Feels like a refined IDE theme
   crossed with a high-end technical book.
   ============================================================ */

const DS = {
  bg0: "#080c14",
  bg1: "#0d1321",
  bg2: "#111827",
  bg3: "#1a2332",
  border: "#1e2d42",
  borderHover: "#2a4060",
  text: "#e2d9c8",
  textMuted: "#64748b",
  textFaint: "#374151",
  amber: "#f59e0b",
  amberDim: "#92400e",
  amberGlow: "rgba(245,158,11,0.08)",
  teal: "#2dd4bf",
  tealDim: "#134e4a",
  blue: "#60a5fa",
  blueDim: "#1e3a5f",
  green: "#4ade80",
  greenDim: "#052e16",
  red: "#f87171",
  redDim: "#4c0519",
  violet: "#a78bfa",
  violetDim: "#2e1065",
  rose: "#fb7185",
};

const G = `
@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,600;0,700;1,400&family=Fira+Code:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --bg0: ${DS.bg0}; --bg1: ${DS.bg1}; --bg2: ${DS.bg2}; --bg3: ${DS.bg3};
  --border: ${DS.border}; --text: ${DS.text}; --muted: ${DS.textMuted};
  --amber: ${DS.amber}; --teal: ${DS.teal}; --blue: ${DS.blue};
  --green: ${DS.green}; --red: ${DS.red}; --violet: ${DS.violet};
}

.app {
  font-family: 'Fira Code', monospace;
  background: var(--bg0);
  color: var(--text);
  min-height: 100vh;
  font-size: 13px;
  line-height: 1.75;
}

/* ── HERO ── */
.hero {
  position: relative;
  padding: 72px 48px 56px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  background: linear-gradient(160deg, #080c14 0%, #0d1a2e 60%, #080c14 100%);
}
.hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 20% 40%, black 0%, transparent 70%);
}
.hero-orb {
  position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px);
}
.hero-orb-1 { width: 400px; height: 300px; top: -100px; left: -80px; background: rgba(245,158,11,0.07); }
.hero-orb-2 { width: 300px; height: 300px; bottom: -100px; right: 10%; background: rgba(45,212,191,0.05); }

.hero-eyebrow {
  display: flex; align-items: center; gap: 10px;
  font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 20px;
}
.hero-eyebrow-line { width: 32px; height: 1px; background: var(--amber); }

.hero-title {
  font-family: 'Bitter', serif;
  font-size: clamp(32px, 4.5vw, 58px);
  font-weight: 700; line-height: 1.08;
  color: #f0ece0; margin-bottom: 10px;
  letter-spacing: -0.5px;
}
.hero-title em { color: var(--amber); font-style: italic; }

.hero-sub {
  font-size: 12px; color: var(--muted);
  max-width: 560px; margin-bottom: 36px; line-height: 1.8;
}

.hero-meta {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.meta-chip {
  font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
  padding: 4px 12px; border-radius: 2px;
  border: 1px solid; cursor: default;
}
.chip-amber { border-color: ${DS.amberDim}; color: var(--amber); background: ${DS.amberGlow}; }
.chip-teal  { border-color: ${DS.tealDim};  color: var(--teal);  background: rgba(45,212,191,0.06); }
.chip-blue  { border-color: ${DS.blueDim};  color: var(--blue);  background: rgba(96,165,250,0.06); }
.chip-violet{ border-color: ${DS.violetDim};color: var(--violet);background: rgba(167,139,250,0.06); }

.hero-progress {
  margin-top: 40px; padding-top: 32px;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; gap: 0;
}
.prog-step {
  display: flex; flex-direction: column; align-items: center;
  flex: 1; position: relative; cursor: pointer;
}
.prog-step + .prog-step::before {
  content: ''; position: absolute; left: 0; top: 14px;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, var(--amber), var(--border));
  transform: translateX(-50%);
}
.prog-dot {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; margin-bottom: 8px;
  position: relative; z-index: 1; transition: all 0.2s;
}
.prog-dot.done  { background: var(--amber); color: #000; border: 2px solid var(--amber); }
.prog-dot.active{ background: var(--bg0); color: var(--amber); border: 2px solid var(--amber); box-shadow: 0 0 12px rgba(245,158,11,0.4); }
.prog-dot.idle  { background: var(--bg1); color: var(--muted); border: 2px solid var(--border); }
.prog-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); text-align: center; max-width: 80px; }

/* ── LAYOUT ── */
.layout { display: flex; min-height: calc(100vh - 200px); }

/* ── SIDEBAR ── */
.sidebar {
  width: 240px; flex-shrink: 0;
  background: var(--bg1);
  border-right: 1px solid var(--border);
  position: sticky; top: 0; height: 100vh;
  overflow-y: auto; padding: 24px 0;
  scrollbar-width: thin; scrollbar-color: var(--border) transparent;
}
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.sidebar-section { margin-bottom: 24px; }
.sidebar-section-label {
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--muted); padding: 0 20px; margin-bottom: 8px;
}
.sidebar-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 20px; cursor: pointer;
  font-size: 11px; color: var(--muted);
  border-left: 2px solid transparent;
  transition: all 0.15s; text-decoration: none;
}
.sidebar-item:hover { color: var(--text); background: rgba(255,255,255,0.02); }
.sidebar-item.active { color: var(--amber); border-left-color: var(--amber); background: ${DS.amberGlow}; }
.sidebar-item-num { font-size: 9px; color: var(--textFaint); min-width: 16px; }

/* ── MAIN CONTENT ── */
.main { flex: 1; padding: 48px; max-width: 860px; overflow: hidden; }

/* ── SECTION ── */
.section { margin-bottom: 64px; }
.section-eyebrow {
  display: flex; align-items: center; gap: 10px;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 14px;
}
.section-eyebrow::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, var(--border), transparent); }

.section-h1 {
  font-family: 'Bitter', serif;
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 700; color: #f0ece0;
  line-height: 1.2; margin-bottom: 8px;
}
.section-h2 {
  font-family: 'Bitter', serif;
  font-size: 20px; font-weight: 600; color: #e2d9c8;
  margin-bottom: 8px; margin-top: 40px; padding-top: 32px;
  border-top: 1px solid var(--border);
}
.section-h3 {
  font-size: 12px; font-weight: 600; color: var(--teal);
  margin-bottom: 8px; margin-top: 24px;
  letter-spacing: 1px; text-transform: uppercase;
}
.section-lead { font-size: 12px; color: var(--muted); margin-bottom: 24px; max-width: 680px; line-height: 1.8; }
.prose { font-size: 12px; color: #9ca3af; line-height: 1.85; margin-bottom: 16px; }
.prose strong { color: var(--text); font-weight: 600; }
.prose code { font-family: 'Fira Code', monospace; font-size: 11px; background: var(--bg3); padding: 1px 6px; border-radius: 3px; color: var(--teal); border: 1px solid var(--border); }

/* ── CODE BLOCK ── */
.code-wrap { margin: 20px 0; border-radius: 6px; overflow: hidden; border: 1px solid var(--border); }
.code-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 16px; background: var(--bg2);
  border-bottom: 1px solid var(--border);
}
.code-left { display: flex; align-items: center; gap: 8px; }
.code-dots { display: flex; gap: 5px; }
.code-dot { width: 10px; height: 10px; border-radius: 50%; }
.code-dot-r { background: #ff5f57; } .code-dot-y { background: #febc2e; } .code-dot-g { background: #28c840; }
.code-filename { font-size: 10px; color: var(--muted); }
.code-lang { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--amber); }
.code-body {
  padding: 20px; background: #060a10;
  font-family: 'Fira Code', monospace; font-size: 12px;
  line-height: 1.85; color: #abb2bf; overflow-x: auto;
  white-space: pre; tab-size: 4;
}

/* syntax */
.k  { color: #c678dd; } /* keyword */
.t  { color: #e5c07b; } /* type */
.m  { color: #61afef; } /* method */
.s  { color: #98c379; } /* string */
.n  { color: #d19a66; } /* number */
.c  { color: #5c6370; font-style: italic; } /* comment */
.a  { color: #e06c75; } /* attribute */
.p  { color: #56b6c2; } /* property */
.v  { color: #abb2bf; } /* variable */
.op { color: #c678dd; } /* operator */

/* ── CALLOUT ── */
.callout {
  display: flex; gap: 14px; border-radius: 6px;
  padding: 16px 18px; margin: 20px 0;
  font-size: 12px; line-height: 1.75;
}
.callout-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
.callout-body strong { display: block; margin-bottom: 4px; }
.callout-info   { background: rgba(96,165,250,0.07);  border: 1px solid rgba(96,165,250,0.2);  color: #93c5fd; }
.callout-warn   { background: rgba(245,158,11,0.07);  border: 1px solid rgba(245,158,11,0.2);  color: #fde68a; }
.callout-tip    { background: rgba(45,212,191,0.07);  border: 1px solid rgba(45,212,191,0.2);  color: #99f6e4; }
.callout-danger { background: rgba(248,113,133,0.07); border: 1px solid rgba(248,113,133,0.2); color: #fca5a5; }
.callout-rule   { background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.2); color: #c4b5fd; }

/* ── GRID ── */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; margin: 20px 0; }
.card {
  background: var(--bg1); border: 1px solid var(--border);
  border-radius: 6px; padding: 20px;
  transition: border-color 0.2s, background 0.2s;
}
.card:hover { border-color: var(--borderHover); background: var(--bg2); }
.card-icon { font-size: 22px; margin-bottom: 10px; }
.card-title { font-size: 11px; font-weight: 600; color: var(--amber); margin-bottom: 6px; letter-spacing: 0.5px; text-transform: uppercase; }
.card-body { font-size: 11px; color: var(--muted); line-height: 1.65; }

/* ── TABS ── */
.tabs { margin: 20px 0; }
.tab-bar { display: flex; border-bottom: 1px solid var(--border); gap: 0; overflow-x: auto; scrollbar-width: none; }
.tab-bar::-webkit-scrollbar { display: none; }
.tab-btn {
  font-family: 'Fira Code', monospace;
  font-size: 11px; letter-spacing: 0.5px;
  padding: 10px 18px; cursor: pointer;
  border-bottom: 2px solid transparent;
  color: var(--muted); background: none; border-top: none; border-left: none; border-right: none;
  white-space: nowrap; transition: all 0.15s;
}
.tab-btn:hover:not(.tab-active) { color: var(--text); }
.tab-active { color: var(--amber); border-bottom-color: var(--amber); }
.tab-pane { background: var(--bg1); border: 1px solid var(--border); border-top: none; border-radius: 0 0 6px 6px; padding: 20px; }

/* ── FILE TREE ── */
.tree { font-size: 12px; line-height: 2; }
.tree-line { display: flex; align-items: center; gap: 6px; }
.tree-indent { color: var(--border); }
.tree-folder { color: var(--blue); }
.tree-file   { color: var(--teal); }
.tree-ext    { color: var(--violet); }
.tree-comment{ color: var(--muted); font-size: 10px; margin-left: 8px; }
.tree-highlight { background: ${DS.amberGlow}; border-left: 2px solid var(--amber); padding-left: 8px; border-radius: 0 3px 3px 0; }

/* ── EXERCISE ── */
.exercise {
  background: linear-gradient(135deg, #050e08, #040c0a);
  border: 1px solid rgba(74,222,128,0.2);
  border-radius: 6px; padding: 28px; margin: 32px 0;
}
.exercise-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.exercise-badge {
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  background: rgba(74,222,128,0.12); color: var(--green);
  border: 1px solid rgba(74,222,128,0.3); padding: 3px 10px; border-radius: 2px;
}
.exercise-num { font-size: 11px; color: var(--muted); }
.exercise-title { font-family: 'Bitter', serif; font-size: 17px; font-weight: 600; color: var(--green); }
.exercise-intro { font-size: 12px; color: var(--muted); margin-bottom: 20px; line-height: 1.8; }
.exercise-steps { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.exercise-step { display: flex; gap: 12px; font-size: 12px; color: #9ca3af; }
.step-num { color: var(--green); font-weight: 700; min-width: 22px; }
.step-body strong { color: var(--text); }

/* ── COMPARISON TABLE ── */
.table-wrap { overflow-x: auto; margin: 20px 0; }
table { width: 100%; border-collapse: collapse; font-size: 11px; }
th { text-align: left; padding: 10px 16px; background: var(--bg2); border: 1px solid var(--border); color: var(--teal); font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
td { padding: 10px 16px; border: 1px solid var(--border); color: var(--muted); vertical-align: top; line-height: 1.6; }
tr:hover td { background: rgba(255,255,255,0.015); }
.td-key { color: var(--text); font-weight: 600; }

/* ── NAMING TABLE ── */
.naming-row { display: flex; align-items: stretch; gap: 0; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; margin: 8px 0; }
.naming-bad  { flex: 1; background: rgba(248,113,133,0.07); padding: 12px 14px; border-right: 1px solid var(--border); }
.naming-good { flex: 1; background: rgba(74,222,128,0.07); padding: 12px 14px; }
.naming-label{ font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.naming-bad  .naming-label { color: var(--red); }
.naming-good .naming-label { color: var(--green); }
.naming-code { font-family: 'Fira Code', monospace; font-size: 11px; color: var(--text); }

/* ── STEP SEQUENCE ── */
.steps-seq { display: flex; flex-direction: column; gap: 0; margin: 20px 0; }
.step-seq-item { display: flex; gap: 0; }
.step-seq-left { display: flex; flex-direction: column; align-items: center; width: 40px; flex-shrink: 0; }
.step-seq-num  { width: 28px; height: 28px; border-radius: 50%; background: var(--bg3); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--amber); flex-shrink: 0; }
.step-seq-line { width: 1px; flex: 1; background: var(--border); margin: 4px 0; min-height: 20px; }
.step-seq-body { padding: 4px 0 20px 16px; flex: 1; }
.step-seq-title { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.step-seq-desc  { font-size: 11px; color: var(--muted); line-height: 1.7; }

/* ── BADGE ── */
.badge { display: inline-block; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; padding: 2px 8px; border-radius: 2px; margin: 2px; }
.badge-fast   { background: rgba(74,222,128,0.12); color: var(--green); border: 1px solid rgba(74,222,128,0.25); }
.badge-slow   { background: rgba(248,113,133,0.12); color: var(--red);  border: 1px solid rgba(248,113,133,0.25); }
.badge-vs     { background: rgba(167,139,250,0.12); color: var(--violet); border: 1px solid rgba(167,139,250,0.25); }
.badge-cli    { background: rgba(96,165,250,0.12); color: var(--blue); border: 1px solid rgba(96,165,250,0.25); }

/* ── PILL HIGHLIGHT ── */
.ph { color: var(--amber); font-style: normal; }

/* ── BLOCKQUOTE ── */
.bq {
  border-left: 3px solid var(--amber);
  padding: 12px 20px; margin: 20px 0;
  background: ${DS.amberGlow}; border-radius: 0 4px 4px 0;
  font-family: 'Bitter', serif; font-style: italic;
  font-size: 14px; color: #e2d9c8; line-height: 1.7;
}
.bq-attr { font-family: 'Fira Code', monospace; font-style: normal; font-size: 10px; color: var(--muted); margin-top: 6px; }

/* ── RESPONSIVE ── */
@media(max-width: 768px) {
  .sidebar { display: none; }
  .hero, .main { padding-left: 20px; padding-right: 20px; }
  .hero { padding-top: 48px; padding-bottom: 32px; }
  .hero-progress { display: none; }
  .main { padding: 28px 20px; }
}
`;

// ─── SYNTAX HELPERS ────────────────────────────────────────────────────────────
const Code = ({ lang, file, children }) => (
  <div className="code-wrap">
    <div className="code-header">
      <div className="code-left">
        <div className="code-dots">
          <div className="code-dot code-dot-r" /><div className="code-dot code-dot-y" /><div className="code-dot code-dot-g" />
        </div>
        {file && <span className="code-filename">{file}</span>}
      </div>
      <span className="code-lang">{lang}</span>
    </div>
    <div className="code-body" dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

const Note = ({ type = "info", icon, title, children }) => (
  <div className={`callout callout-${type}`}>
    <span className="callout-icon">{icon}</span>
    <div className="callout-body">
      {title && <strong>{title}</strong>}
      {children}
    </div>
  </div>
);

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="tabs">
      <div className="tab-bar">
        {tabs.map((t, i) => (
          <button key={i} className={`tab-btn ${active === i ? "tab-active" : ""}`} onClick={() => setActive(i)}>{t.label}</button>
        ))}
      </div>
      <div className="tab-pane" dangerouslySetInnerHTML={{ __html: tabs[active].html }} />
    </div>
  );
};

// ─── SIDEBAR DATA ───────────────────────────────────────────────────────────────
const NAV = [
  { section: "Module 1", items: [
    { id: "philosophy", label: "Philosophy of Testing" },
    { id: "solution-structure", label: "Solution Structure" },
    { id: "project-creation", label: "Creating Test Projects" },
    { id: "unit-vs-integration", label: "Unit vs Integration Split" },
  ]},
  { section: "Module 2", items: [
    { id: "naming", label: "Naming Conventions" },
    { id: "csproj", label: "Project File Anatomy" },
    { id: "global-usings", label: "Global Usings" },
    { id: "attributes", label: "xUnit Attributes" },
  ]},
  { section: "Module 3", items: [
    { id: "class-design", label: "Test Class Design" },
    { id: "output-helper", label: "ITestOutputHelper" },
    { id: "running-tests", label: "Running Tests" },
    { id: "exercise", label: "Capstone Exercise" },
  ]},
];

// ─── MAIN APP ───────────────────────────────────────────────────────────────────
export default function FoundationsGuide() {
  const [activeId, setActiveId] = useState("philosophy");
  const mainRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    document.querySelectorAll("[data-section]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{G}</style>
      <div className="app">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />

          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            C# · xUnit · Visual Studio 2022/2025 · .NET 8/9
          </div>

          <h1 className="hero-title">
            Testing in .NET<br />
            <em>Foundations &amp; Architecture</em>
          </h1>

          <p className="hero-sub">
            File 1 of 6 — How to structure, name, create and organise test projects
            in a real .NET solution. The decisions you make here echo through
            every test you will ever write.
          </p>

          <div className="hero-meta">
            {[
              ["chip-amber", "Visual Studio"],
              ["chip-amber", "xUnit 2.9+"],
              ["chip-teal",  "Solution Structure"],
              ["chip-teal",  "Project Architecture"],
              ["chip-blue",  ".NET 8 / 9"],
              ["chip-blue",  "C# 12"],
              ["chip-violet","Naming Conventions"],
              ["chip-violet","Best Practices"],
            ].map(([cls, label]) => (
              <span key={label} className={`meta-chip ${cls}`}>{label}</span>
            ))}
          </div>

          <div className="hero-progress">
            {["Foundations","Unit Tests","Doubles","Integration","Advanced","CI/CD"].map((s, i) => (
              <div className="prog-step" key={s}>
                <div className={`prog-dot ${i === 0 ? "active" : "idle"}`}>{i + 1}</div>
                <div className="prog-label">{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="layout">

          {/* SIDEBAR */}
          <nav className="sidebar">
            {NAV.map(group => (
              <div className="sidebar-section" key={group.section}>
                <div className="sidebar-section-label">{group.section}</div>
                {group.items.map((item, i) => (
                  <div
                    key={item.id}
                    className={`sidebar-item ${activeId === item.id ? "active" : ""}`}
                    onClick={() => scrollTo(item.id)}
                  >
                    <span className="sidebar-item-num">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            ))}
          </nav>

          {/* MAIN */}
          <main className="main" ref={mainRef}>

{/* ══════════════════════════════════════════════
    SECTION: PHILOSOPHY
══════════════════════════════════════════════ */}
<section className="section" id="philosophy" data-section>
  <div className="section-eyebrow">01 — Philosophy</div>
  <h1 className="section-h1">Why Tests Are First-Class Citizens</h1>
  <p className="section-lead">
    Before touching Visual Studio, before installing NuGet packages, before
    writing a single <code>[Fact]</code>, you need to internalise a mindset
    shift. Tests are not an afterthought. They are not a box to tick before
    shipping. They are the second most important artefact in your codebase —
    right behind the production code they protect.
  </p>

  <div className="bq">
    "A test suite is the only way to confidently change software.
    Without it, every change is a prayer."
    <div className="bq-attr">— Paraphrasing Michael Feathers, Working Effectively with Legacy Code</div>
  </div>

  <div className="card-grid">
    {[
      { icon: "🏗️", title: "Design Pressure", body: "Tests force you to design code that is composable, injectable, and focused. If a class is hard to test, it is hard to understand. Bad design surfaces in tests first." },
      { icon: "🧾", title: "Living Documentation", body: "A well-named test suite documents what the system does with examples that are always in sync with reality. No Word doc can compete." },
      { icon: "🔁", title: "Refactoring Safety", body: "Without tests you can't safely rename, extract, or restructure. Tests make refactoring possible, which keeps codebases healthy over years." },
      { icon: "⚡", title: "Feedback Speed", body: "A 5-second unit test suite gives you feedback 200× faster than running the app and clicking through the UI. Speed of feedback is speed of learning." },
      { icon: "🐛", title: "Regression Prevention", body: "Every bug you fix becomes a test. The same bug can never occur again. This is how professional teams build confidence over time." },
      { icon: "🤝", title: "Team Communication", body: "Tests express intent. New team members read tests to understand what the system should do — without bothering senior devs." },
    ].map(c => (
      <div className="card" key={c.title}>
        <div className="card-icon">{c.icon}</div>
        <div className="card-title">{c.title}</div>
        <div className="card-body">{c.body}</div>
      </div>
    ))}
  </div>

  <h2 className="section-h2">The Three Laws of Test Code</h2>
  <p className="prose">Test code must be held to the <strong>same quality standards as production code</strong>. This is the most commonly violated principle in the industry. Teams write clean production code and throw any old garbage into test files. The result: a brittle, slow, unmaintainable test suite that the team eventually stops trusting — and stops running.</p>

  <div className="steps-seq">
    {[
      { num: "I",   title: "Test code is read more than it is written", desc: "A test fails at 2am in CI. Someone unfamiliar with the feature needs to understand in 30 seconds what broke and why. Clarity is not optional." },
      { num: "II",  title: "Test code must be maintained like production code", desc: "Flaky tests, commented-out tests, tests with copy-pasted setup — these are technical debt. Refactor tests when you refactor production code." },
      { num: "III", title: "Test code defines the contract of production code", desc: "If you can read the test class for UserService and understand exactly what UserService guarantees, your tests are doing their job." },
    ].map(s => (
      <div className="step-seq-item" key={s.num}>
        <div className="step-seq-left">
          <div className="step-seq-num">{s.num}</div>
          <div className="step-seq-line" />
        </div>
        <div className="step-seq-body">
          <div className="step-seq-title">{s.title}</div>
          <div className="step-seq-desc">{s.desc}</div>
        </div>
      </div>
    ))}
  </div>

  <Note type="rule" icon="📐" title="The Foundational Rule">
    Test <strong>behaviour</strong>, not <strong>implementation</strong>.
    A test that breaks when you rename a private method is testing the wrong thing.
    A test that breaks when the observable output changes is testing the right thing.
    Your test suite should survive a complete internal rewrite as long as the
    public contract is preserved.
  </Note>
</section>

{/* ══════════════════════════════════════════════
    SECTION: SOLUTION STRUCTURE
══════════════════════════════════════════════ */}
<section className="section" id="solution-structure" data-section>
  <div className="section-eyebrow">02 — Architecture</div>
  <h1 className="section-h1">Solution Structure: The Professional Layout</h1>
  <p className="section-lead">
    The physical organisation of your solution sends a signal about how seriously
    your team takes testing. Here is the layout used by mature .NET teams
    at scale — the same structure you'll find in the ASP.NET Core, Entity
    Framework, and MassTransit repositories.
  </p>

  <h3 className="section-h3">The src/ + tests/ Convention</h3>
  <p className="prose">Separate your source code from your test code at the top level of the solution. This makes the intent immediately clear: <code>src/</code> ships to production, <code>tests/</code> never does.</p>

  <div className="code-wrap">
    <div className="code-header">
      <div className="code-left">
        <div className="code-dots"><div className="code-dot code-dot-r"/><div className="code-dot code-dot-y"/><div className="code-dot code-dot-g"/></div>
        <span className="code-filename">Solution Layout</span>
      </div>
      <span className="code-lang">File Tree</span>
    </div>
    <div className="code-body">
      <div className="tree">
        {[
          { indent: 0, type: "folder", name: "MyApp.sln", comment: "← single solution file" },
          { indent: 0, type: "folder", name: "src/", comment: "" },
          { indent: 1, type: "folder", name: "MyApp.Domain/", comment: "← entities, value objects, domain services" },
          { indent: 2, type: "file",   name: "MyApp.Domain.csproj", comment: "", ext: true },
          { indent: 1, type: "folder", name: "MyApp.Application/", comment: "← use cases, commands, queries" },
          { indent: 2, type: "file",   name: "MyApp.Application.csproj", comment: "", ext: true },
          { indent: 1, type: "folder", name: "MyApp.Infrastructure/", comment: "← EF Core, HTTP clients, repos" },
          { indent: 2, type: "file",   name: "MyApp.Infrastructure.csproj", comment: "", ext: true },
          { indent: 1, type: "folder", name: "MyApp.Api/", comment: "← controllers, minimal APIs, startup" },
          { indent: 2, type: "file",   name: "MyApp.Api.csproj", comment: "", ext: true },
          { indent: 0, type: "folder", name: "tests/", comment: "" },
          { indent: 1, type: "folder", name: "MyApp.Domain.UnitTests/", comment: "← pure logic, zero I/O", hl: true },
          { indent: 2, type: "file",   name: "MyApp.Domain.UnitTests.csproj", comment: "", ext: true, hl: true },
          { indent: 1, type: "folder", name: "MyApp.Application.UnitTests/", comment: "← use cases, mocked deps", hl: true },
          { indent: 2, type: "file",   name: "MyApp.Application.UnitTests.csproj", comment: "", ext: true, hl: true },
          { indent: 1, type: "folder", name: "MyApp.Infrastructure.IntegrationTests/", comment: "← real DB, real HTTP", hl: true },
          { indent: 2, type: "file",   name: "MyApp.Infrastructure.IntegrationTests.csproj", comment: "", ext: true, hl: true },
          { indent: 1, type: "folder", name: "MyApp.Api.IntegrationTests/", comment: "← WebApplicationFactory", hl: true },
          { indent: 2, type: "file",   name: "MyApp.Api.IntegrationTests.csproj", comment: "", ext: true, hl: true },
          { indent: 0, type: "folder", name: "Directory.Build.props", comment: "← shared MSBuild properties" },
          { indent: 0, type: "folder", name: "Directory.Packages.props", comment: "← central package management" },
          { indent: 0, type: "folder", name: ".editorconfig", comment: "← style & analyzer rules" },
          { indent: 0, type: "folder", name: "global.json", comment: "← SDK version pin" },
        ].map((row, i) => (
          <div key={i} className={`tree-line${row.hl ? " tree-highlight" : ""}`} style={{ paddingLeft: row.indent * 20 }}>
            <span className={row.type === "folder" ? "tree-folder" : "tree-file"}>
              {row.type === "folder" ? "📁" : "📄"} {row.name}
            </span>
            {row.comment && <span className="tree-comment">{row.comment}</span>}
          </div>
        ))}
      </div>
    </div>
  </div>

  <Note type="tip" icon="💡" title="Naming Rule for Test Projects">
    Test project names mirror the source project they test, with a suffix that
    states the <em>type</em> of test: <code>.UnitTests</code> or <code>.IntegrationTests</code>.
    Never <code>.Tests</code> alone — that hides what kind of tests live inside.
  </Note>

  <h2 className="section-h2">Directory.Build.props — Share Properties Across All Projects</h2>
  <p className="prose">Instead of copying the same <code>&lt;Nullable&gt;enable&lt;/Nullable&gt;</code> or <code>&lt;LangVersion&gt;</code> into every <code>.csproj</code>, put shared settings in <code>Directory.Build.props</code> at the root. MSBuild automatically discovers and applies it.</p>

  <Code lang="XML" file="Directory.Build.props (root)">
{`<span class="c">&lt;!-- Applies to ALL projects in the solution --&gt;</span>
&lt;<span class="t">Project</span>&gt;
  &lt;<span class="t">PropertyGroup</span>&gt;
    &lt;<span class="p">TargetFramework</span>&gt;net9.0&lt;/<span class="p">TargetFramework</span>&gt;
    &lt;<span class="p">LangVersion</span>&gt;latest&lt;/<span class="p">LangVersion</span>&gt;
    &lt;<span class="p">Nullable</span>&gt;enable&lt;/<span class="p">Nullable</span>&gt;
    &lt;<span class="p">ImplicitUsings</span>&gt;enable&lt;/<span class="p">ImplicitUsings</span>&gt;
    &lt;<span class="p">TreatWarningsAsErrors</span>&gt;true&lt;/<span class="p">TreatWarningsAsErrors</span>&gt;
    &lt;<span class="p">EnforceCodeStyleInBuild</span>&gt;true&lt;/<span class="p">EnforceCodeStyleInBuild</span>&gt;
  &lt;/<span class="p">PropertyGroup</span>&gt;
&lt;/<span class="t">Project</span>&gt;</code>`}
  </Code>

  <Code lang="XML" file="Directory.Build.props (tests/ subfolder — overrides root)">
{`<span class="c">&lt;!-- Place this in tests/Directory.Build.props to add test-specific config --&gt;</span>
&lt;<span class="t">Project</span>&gt;
  <span class="c">&lt;!-- Inherit everything from root, then extend --&gt;</span>
  &lt;<span class="t">Import</span> <span class="a">Project</span>=<span class="s">"$([MSBuild]::GetPathOfFileAbove('Directory.Build.props', '$(MSBuildThisFileDirectory)../'))"</span> /&gt;

  &lt;<span class="t">PropertyGroup</span>&gt;
    <span class="c">&lt;!-- Test assemblies must never be published/packed --&gt;</span>
    &lt;<span class="p">IsPackable</span>&gt;false&lt;/<span class="p">IsPackable</span>&gt;
    &lt;<span class="p">IsPublishable</span>&gt;false&lt;/<span class="p">IsPublishable</span>&gt;

    <span class="c">&lt;!-- Collect code coverage --&gt;</span>
    &lt;<span class="p">CollectCoverage</span>&gt;true&lt;/<span class="p">CollectCoverage</span>&gt;
    &lt;<span class="p">CoverletOutputFormat</span>&gt;opencover&lt;/<span class="p">CoverletOutputFormat</span>&gt;

    <span class="c">&lt;!-- Suppress nullable warnings in test code (test code is more exploratory) --&gt;</span>
    &lt;<span class="p">Nullable</span>&gt;enable&lt;/<span class="p">Nullable</span>&gt;
  &lt;/<span class="t">PropertyGroup</span>&gt;

  &lt;<span class="t">ItemGroup</span>&gt;
    <span class="c">&lt;!-- All test projects share these packages via central management --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"Microsoft.NET.Test.Sdk"</span> /&gt;
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"xunit"</span> /&gt;
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"xunit.runner.visualstudio"</span> /&gt;
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"coverlet.collector"</span> /&gt;
  &lt;/<span class="t">ItemGroup</span>&gt;
&lt;/<span class="t">Project</span>&gt;</code>`}
  </Code>

  <Code lang="XML" file="Directory.Packages.props (root) — Central Package Management">
{`<span class="c">&lt;!-- Define ALL package versions once. No version attrs needed in .csproj files. --&gt;</span>
&lt;<span class="t">Project</span>&gt;
  &lt;<span class="t">PropertyGroup</span>&gt;
    &lt;<span class="p">ManagePackageVersionsCentrally</span>&gt;true&lt;/<span class="p">ManagePackageVersionsCentrally</span>&gt;
  &lt;/<span class="t">PropertyGroup</span>&gt;

  &lt;<span class="t">ItemGroup</span>&gt;
    <span class="c">&lt;!-- xUnit ecosystem --&gt;</span>
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"xunit"</span>                        <span class="a">Version</span>=<span class="s">"2.9.2"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"xunit.runner.visualstudio"</span>    <span class="a">Version</span>=<span class="s">"2.8.2"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"Microsoft.NET.Test.Sdk"</span>        <span class="a">Version</span>=<span class="s">"17.12.0"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"coverlet.collector"</span>            <span class="a">Version</span>=<span class="s">"6.0.2"</span> /&gt;

    <span class="c">&lt;!-- Assertion &amp; mocking --&gt;</span>
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"FluentAssertions"</span>              <span class="a">Version</span>=<span class="s">"6.12.1"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"Moq"</span>                           <span class="a">Version</span>=<span class="s">"4.20.72"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"NSubstitute"</span>                   <span class="a">Version</span>=<span class="s">"5.3.0"</span> /&gt;

    <span class="c">&lt;!-- Integration tests --&gt;</span>
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"Microsoft.AspNetCore.Mvc.Testing"</span> <span class="a">Version</span>=<span class="s">"9.0.0"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"Microsoft.EntityFrameworkCore.Sqlite"</span> <span class="a">Version</span>=<span class="s">"9.0.0"</span> /&gt;
    &lt;<span class="t">PackageVersion</span> <span class="a">Include</span>=<span class="s">"Testcontainers.MsSql"</span>          <span class="a">Version</span>=<span class="s">"3.10.0"</span> /&gt;
  &lt;/<span class="t">ItemGroup</span>&gt;
&lt;/<span class="t">Project</span>&gt;</code>`}
  </Code>

  <Note type="info" icon="📦" title="Central Package Management">
    With <code>ManagePackageVersionsCentrally</code> enabled, each <code>.csproj</code>
    references packages with <code>&lt;PackageReference Include="xunit" /&gt;</code> —
    <strong> no version attribute</strong>. The version is declared once in
    <code>Directory.Packages.props</code>. Upgrading a package means changing
    <strong>one line</strong>, not hunting through ten project files.
  </Note>
</section>

{/* ══════════════════════════════════════════════
    SECTION: PROJECT CREATION
══════════════════════════════════════════════ */}
<section className="section" id="project-creation" data-section>
  <div className="section-eyebrow">03 — Setup</div>
  <h1 className="section-h1">Creating Test Projects: CLI & Visual Studio</h1>
  <p className="section-lead">
    There are two ways to create xUnit test projects: the <code>dotnet</code> CLI
    (recommended — reproducible, scriptable) and the Visual Studio UI.
    You should know both. The CLI is faster and leaves no ambiguity about
    what was created.
  </p>

  <Tabs tabs={[
    {
      label: "dotnet CLI (Recommended)",
      html: `<div class="steps-seq">
  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">1</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Create the solution</div>
  <div class="step-seq-desc" style="margin-bottom:8px">Start at the repo root. A solution file ties all projects together for Visual Studio and <code>dotnet build</code>.</div>
  <div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div></div><span class="code-lang">BASH</span></div>
  <div class="code-body">mkdir MyApp &amp;&amp; cd MyApp
dotnet new sln --name MyApp</div></div></div></div>

  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">2</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Create source projects</div>
  <div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div></div><span class="code-lang">BASH</span></div>
  <div class="code-body">mkdir src
dotnet new classlib -o src/MyApp.Domain
dotnet new classlib -o src/MyApp.Application
dotnet new webapi   -o src/MyApp.Api

<span class="c"># Add to solution</span>
dotnet sln add src/MyApp.Domain/MyApp.Domain.csproj
dotnet sln add src/MyApp.Application/MyApp.Application.csproj
dotnet sln add src/MyApp.Api/MyApp.Api.csproj</div></div></div></div>

  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">3</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Create xUnit test projects</div>
  <div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div></div><span class="code-lang">BASH</span></div>
  <div class="code-body">mkdir tests

<span class="c"># The xunit template creates a ready-to-go test project</span>
dotnet new xunit -o tests/MyApp.Domain.UnitTests
dotnet new xunit -o tests/MyApp.Application.UnitTests
dotnet new xunit -o tests/MyApp.Api.IntegrationTests

<span class="c"># Add test projects to solution</span>
dotnet sln add tests/MyApp.Domain.UnitTests/MyApp.Domain.UnitTests.csproj
dotnet sln add tests/MyApp.Application.UnitTests/MyApp.Application.UnitTests.csproj
dotnet sln add tests/MyApp.Api.IntegrationTests/MyApp.Api.IntegrationTests.csproj</div></div></div></div>

  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">4</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Add project references from tests to source</div>
  <div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div></div><span class="code-lang">BASH</span></div>
  <div class="code-body"><span class="c"># Unit test for Domain knows about Domain source</span>
dotnet add tests/MyApp.Domain.UnitTests reference src/MyApp.Domain

<span class="c"># Integration test for API knows about the API project</span>
dotnet add tests/MyApp.Api.IntegrationTests reference src/MyApp.Api

<span class="c"># Verify everything builds</span>
dotnet build
dotnet test</div></div></div></div>
</div>`
    },
    {
      label: "Visual Studio UI",
      html: `<div class="steps-seq">
  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">1</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Add New Project to existing solution</div>
  <div class="step-seq-desc">Right-click the solution in Solution Explorer → <strong>Add → New Project</strong>. In the project type search box, type <strong>"xunit"</strong>. Select <strong>xUnit Test Project</strong> (the C# one with the beaker icon).</div></div></div>

  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">2</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Configure the project location</div>
  <div class="step-seq-desc">In the "Configure your new project" dialog:<br/>• <strong>Project name:</strong> <code>MyApp.Domain.UnitTests</code><br/>• <strong>Location:</strong> point to the <code>tests/</code> folder in your repo<br/>• <strong>Solution:</strong> make sure it says "Add to solution" not "Create new solution"</div></div></div>

  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">3</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Add project reference</div>
  <div class="step-seq-desc">Right-click the new test project → <strong>Add → Project Reference</strong>. Check the box next to <code>MyApp.Domain</code>. Click OK. The test project can now reference types in the source project.</div></div></div>

  <div class="step-seq-item"><div class="step-seq-left"><div class="step-seq-num">4</div><div class="step-seq-line"></div></div>
  <div class="step-seq-body"><div class="step-seq-title">Move the project into the tests/ Solution Folder</div>
  <div class="step-seq-desc">In Solution Explorer, create a Solution Folder named <strong>tests</strong> (right-click solution → Add → New Solution Folder). Drag your test projects into it. Note: Solution Folders are virtual — they don't change the physical directory but help organise the Solution Explorer view.</div></div></div>
</div>`
    },
    {
      label: "What the Template Creates",
      html: `<p style="color:#9ca3af;margin-bottom:16px;font-size:12px">The <code>dotnet new xunit</code> template generates a ready-to-compile test project. Here is what it creates and what each part means:</p>
<div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div><span class="code-filename">MyApp.Domain.UnitTests.csproj</span></div><span class="code-lang">XML</span></div>
<div class="code-body">&lt;<span class="t">Project</span> <span class="a">Sdk</span>=<span class="s">"Microsoft.NET.Sdk"</span>&gt;

  &lt;<span class="t">PropertyGroup</span>&gt;
    <span class="c">&lt;!-- If you have Directory.Build.props, these may already be set --&gt;</span>
    &lt;<span class="p">TargetFramework</span>&gt;net9.0&lt;/<span class="p">TargetFramework</span>&gt;
    &lt;<span class="p">ImplicitUsings</span>&gt;enable&lt;/<span class="p">ImplicitUsings</span>&gt;
    &lt;<span class="p">Nullable</span>&gt;enable&lt;/<span class="p">Nullable</span>&gt;

    <span class="c">&lt;!-- CRITICAL: test projects must never ship as NuGet packages --&gt;</span>
    &lt;<span class="p">IsPackable</span>&gt;false&lt;/<span class="p">IsPackable</span>&gt;

    <span class="c">&lt;!-- xUnit v2 needs this for parallelism configuration --&gt;</span>
    &lt;<span class="p">IsTestProject</span>&gt;true&lt;/<span class="p">IsTestProject</span>&gt;
  &lt;/<span class="t">PropertyGroup</span>&gt;

  &lt;<span class="t">ItemGroup</span>&gt;
    <span class="c">&lt;!-- Test host — required for dotnet test to discover tests --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"Microsoft.NET.Test.Sdk"</span> /&gt;

    <span class="c">&lt;!-- Core xUnit: [Fact], [Theory], Assert.* --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"xunit"</span> /&gt;

    <span class="c">&lt;!-- Integrates xUnit with Visual Studio Test Explorer --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"xunit.runner.visualstudio"</span> /&gt;

    <span class="c">&lt;!-- Coverlet: code coverage collection --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"coverlet.collector"</span> /&gt;

    <span class="c">&lt;!-- Reference to the project being tested --&gt;</span>
    &lt;<span class="t">ProjectReference</span> <span class="a">Include</span>=<span class="s">"..\\..\\src\\MyApp.Domain\\MyApp.Domain.csproj"</span> /&gt;
  &lt;/<span class="t">ItemGroup</span>&gt;

&lt;/<span class="t">Project</span>&gt;</div></div>
<p style="color:#9ca3af;margin-top:16px;font-size:12px">And a default test class that you will immediately replace:</p>
<div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div><span class="code-filename">UnitTest1.cs — delete this file</span></div><span class="code-lang">C#</span></div>
<div class="code-body"><span class="c">// The template creates this. DELETE IT. Create properly named classes instead.</span>
<span class="k">namespace</span> <span class="t">MyApp.Domain.UnitTests</span>;

<span class="k">public class</span> <span class="t">UnitTest1</span>
{
    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">Test1</span>()
    {
    }
}</div></div>`
    },
  ]} />
</section>

{/* ══════════════════════════════════════════════
    SECTION: UNIT VS INTEGRATION SPLIT
══════════════════════════════════════════════ */}
<section className="section" id="unit-vs-integration" data-section>
  <div className="section-eyebrow">04 — Architecture</div>
  <h1 className="section-h1">Separating Unit and Integration Tests</h1>
  <p className="section-lead">
    This is one of the most impactful architectural decisions in your test suite.
    Unit tests and integration tests have fundamentally different requirements,
    run times, dependencies, and failure modes. Mixing them in the same project
    makes life harder in every possible way.
  </p>

  <div className="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Dimension</th>
          <th>Unit Tests (.UnitTests)</th>
          <th>Integration Tests (.IntegrationTests)</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["Speed",         "Milliseconds — thousands per second", "Seconds to minutes — tens or hundreds per run"],
          ["Dependencies",  "ALL replaced with test doubles (mocks, stubs, fakes)", "REAL: database, HTTP, filesystem, message bus"],
          ["Isolation",     "Complete — tests never share state", "Partial — may share DB connection, container"],
          ["Failure cause", "Logic errors in the class under test", "Config errors, DB schema issues, network, auth"],
          ["Run frequency", "Every save (Live Unit Testing), every PR", "Every PR at minimum; avoid running on every save"],
          ["Setup cost",    "Zero (constructor injection)", "High (spin up server, seed DB, start containers)"],
          ["NuGet extras",  "Moq / NSubstitute, FluentAssertions", "+ Microsoft.AspNetCore.Mvc.Testing, Testcontainers, Respawn"],
          ["CI placement",  "Fast gate — runs first, blocks merge if failing", "Slower gate — runs after unit tests pass"],
          ["Team value",    "Catch logic bugs during development", "Catch integration bugs before deployment"],
        ].map(([dim, unit, integ]) => (
          <tr key={dim}>
            <td className="td-key">{dim}</td>
            <td>{unit}</td>
            <td>{integ}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <Note type="warn" icon="⚠️" title="The Mixed Project Anti-pattern">
    Putting unit and integration tests in the same project means: (a) you can't
    run only unit tests quickly, (b) CI always runs slow integration tests even
    for trivial changes, (c) integration test setup code bleeds into unit test
    files. Separate them from day one.
  </Note>

  <h3 className="section-h3">How to Run Them Selectively</h3>
  <p className="prose">With separate projects, filtering is trivial:</p>

  <Code lang="BASH" file="Selective test execution">
{`<span class="c"># Run ONLY unit tests (fast — every save/PR)</span>
dotnet test --filter "FullyQualifiedName~UnitTests"

<span class="c"># Run ONLY integration tests (slow — scheduled or deploy gate)</span>
dotnet test --filter "FullyQualifiedName~IntegrationTests"

<span class="c"># Run all tests in a specific project</span>
dotnet test tests/MyApp.Domain.UnitTests

<span class="c"># Run in parallel across all projects</span>
dotnet test --maxCpuCount

<span class="c"># Run with detailed output (useful for diagnosing failures)</span>
dotnet test --verbosity normal

<span class="c"># Run and collect coverage</span>
dotnet test --collect:"XPlat Code Coverage" --results-directory ./coverage`}
  </Code>

  <h3 className="section-h3">Which Layer Gets Which Test Project?</h3>
  <Code lang="TEXT" file="Test project responsibility map">
{`Domain.UnitTests
  ├── Entities           (Order, Customer, Product)
  ├── Value Objects      (Money, Email, Address)
  ├── Domain Services    (PricingService, DiscountCalculator)
  ├── Domain Events      (OrderPlaced, PaymentReceived)
  └── Specifications     (ActiveCustomerSpec, InStockSpec)
  <span class="c">→ No I/O. No mocks needed for most tests. Pure C# logic.</span>

Application.UnitTests
  ├── Command Handlers   (PlaceOrderCommandHandler)
  ├── Query Handlers     (GetOrderByIdQueryHandler)
  ├── Validators         (PlaceOrderCommandValidator)
  ├── Mappers / Profiles (AutoMapper profiles)
  └── Pipeline Behaviours (LoggingBehaviour, ValidationBehaviour)
  <span class="c">→ Repositories and external services are mocked/stubbed.</span>

Infrastructure.IntegrationTests
  ├── Repositories       (EF Core OrderRepository vs real DB)
  ├── External Services  (HttpClient against real test API)
  └── Migrations         (schema up-to-date assertions)
  <span class="c">→ Real database (SQLite or Testcontainers SQL Server).</span>

Api.IntegrationTests
  ├── Endpoints          (POST /orders, GET /orders/{id})
  ├── Auth / AuthZ       (JWT validation, role checks)
  ├── Middleware         (error handling, rate limiting)
  └── End-to-End Flows   (register → login → place order)
  <span class="c">→ WebApplicationFactory&lt;Program&gt;. Full HTTP stack.</span>`}
  </Code>
</section>

{/* ══════════════════════════════════════════════
    SECTION: NAMING CONVENTIONS
══════════════════════════════════════════════ */}
<section className="section" id="naming" data-section>
  <div className="section-eyebrow">05 — Standards</div>
  <h1 className="section-h1">Naming Conventions: The Complete Standard</h1>
  <p className="section-lead">
    Naming is the single highest-leverage thing you can do for test quality.
    A perfectly named test reads like a specification. When it fails in CI,
    the failure message alone tells you exactly what broke, without opening
    the file.
  </p>

  <div className="bq">
    "A test name should describe a behaviour, not an implementation.
     If you need to open the test to understand what it's verifying,
     the name has failed its job."
  </div>

  <h3 className="section-h3">The Primary Convention: MethodName_Scenario_ExpectedResult</h3>
  <p className="prose">This three-part structure is the most widely adopted convention in the .NET community and the most readable in Test Explorer output.</p>

  <div className="table-wrap">
    <table>
      <thead><tr><th>Part</th><th>What to Put There</th><th>Examples</th></tr></thead>
      <tbody>
        {[
          ["MethodName", "The public method or property being tested", "Add, Withdraw, Register, GetById, IsValid"],
          ["Scenario", "The condition or state under which this test runs", "WithNullInput, WhenUserIsAdmin, GivenEmptyCart, WithNegativeAmount"],
          ["ExpectedResult", "What should happen — the observable outcome", "ReturnsNull, ThrowsArgumentException, ReturnsFalse, SendsEmail"],
        ].map(([p, w, e]) => (
          <tr key={p}><td className="td-key">{p}</td><td>{w}</td><td style={{color:"var(--teal)"}}>{e}</td></tr>
        ))}
      </tbody>
    </table>
  </div>

  <h3 className="section-h3">Good vs Bad: Real Examples</h3>

  {[
    {
      bad:  "Test1",
      good: "Add_TwoPositiveIntegers_ReturnsCorrectSum",
    },
    {
      bad:  "TestWithdraw",
      good: "Withdraw_AmountExceedsBalance_ThrowsInsufficientFundsException",
    },
    {
      bad:  "NullTest",
      good: "Register_WithNullEmail_ThrowsArgumentNullException",
    },
    {
      bad:  "ValidateUser_Test3",
      good: "Validate_ExpiredToken_ReturnsFalseAndSetsError",
    },
    {
      bad:  "HandleOrder",
      good: "Handle_ValidOrderCommand_PublishesOrderPlacedEvent",
    },
    {
      bad:  "CheckDiscount_Works",
      good: "CalculateDiscount_LoyalCustomerWithLargeOrder_AppliesStackedDiscounts",
    },
  ].map((row, i) => (
    <div className="naming-row" key={i}>
      <div className="naming-bad">
        <div className="naming-label">❌ Bad</div>
        <div className="naming-code">{row.bad}</div>
      </div>
      <div className="naming-good">
        <div className="naming-label">✅ Good</div>
        <div className="naming-code">{row.good}</div>
      </div>
    </div>
  ))}

  <h3 className="section-h3">Alternative: The Given_When_Then Convention (BDD-style)</h3>
  <p className="prose">Some teams prefer this three-part BDD-flavoured naming. It maps directly to the AAA pattern and reads more naturally in English. It works especially well for user-story-driven development.</p>

  <Code lang="C#" file="BDD-style naming — equally valid">
{`<span class="k">public class</span> <span class="t">ShoppingCart_Given_ItemsInCart</span>
{
    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">When_UserChecksOut_Then_OrderIsCreatedWithCorrectTotal</span>() { }

    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">When_DiscountCodeApplied_Then_TotalIsReducedByDiscountAmount</span>() { }

    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">When_CartIsEmpty_Then_CheckoutThrowsInvalidOperationException</span>() { }
}

<span class="k">public class</span> <span class="t">OrderService_Given_PendingOrder</span>
{
    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">When_PaymentSucceeds_Then_StatusChangesToConfirmed</span>() { }

    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">When_PaymentFails_Then_StatusRemainsAsPending</span>() { }
}</code>`}
  </Code>

  <h3 className="section-h3">Namespace and Class Naming</h3>
  <Code lang="C#" file="Namespace and class conventions">
{`<span class="c">// Namespace mirrors the source project namespace + Tests</span>
<span class="c">// Source:  MyApp.Domain.Entities.Order</span>
<span class="c">// Tests:   MyApp.Domain.UnitTests.Entities.OrderTests</span>

<span class="k">namespace</span> <span class="t">MyApp.Domain.UnitTests.Entities</span>;  <span class="c">// file-scoped namespace</span>

<span class="c">// One test class per production class (usually)</span>
<span class="k">public class</span> <span class="t">OrderTests</span> { }              <span class="c">// for Order entity</span>
<span class="k">public class</span> <span class="t">OrderServiceTests</span> { }       <span class="c">// for OrderService</span>
<span class="k">public class</span> <span class="t">MoneyTests</span> { }              <span class="c">// for Money value object</span>

<span class="c">// When a class is large, split by method or concern using nested classes</span>
<span class="k">public class</span> <span class="t">OrderTests</span>
{
    <span class="k">public class</span> <span class="t">PlaceOrder</span>           <span class="c">// groups tests for the PlaceOrder method</span>
    {
        [<span class="a">Fact</span>]
        <span class="k">public void</span> <span class="m">ValidOrder_CreatesConfirmedOrder</span>() { }

        [<span class="a">Fact</span>]
        <span class="k">public void</span> <span class="m">EmptyItems_ThrowsDomainException</span>() { }
    }

    <span class="k">public class</span> <span class="t">Cancel</span>                <span class="c">// groups tests for the Cancel method</span>
    {
        [<span class="a">Fact</span>]
        <span class="k">public void</span> <span class="m">PendingOrder_SetsStatusToCancelled</span>() { }

        [<span class="a">Fact</span>]
        <span class="k">public void</span> <span class="m">AlreadyShipped_ThrowsInvalidOperationException</span>() { }
    }
}
<span class="c">// In Test Explorer, these appear as: OrderTests > PlaceOrder > ValidOrder_Creates...
// Beautiful grouping without any extra attributes.</span>`}
  </Code>

  <Note type="tip" icon="🎯" title="The Naming Acid Test">
    Read the test name out loud as a sentence. Can a developer who has never seen
    the production code understand what the test verifies and why it matters?
    If yes — the name is good. If they need to open the test body — rename it.
  </Note>
</section>

{/* ══════════════════════════════════════════════
    SECTION: CSPROJ ANATOMY
══════════════════════════════════════════════ */}
<section className="section" id="csproj" data-section>
  <div className="section-eyebrow">06 — Configuration</div>
  <h1 className="section-h1">Test Project File Anatomy</h1>
  <p className="section-lead">
    Understanding every line in the <code>.csproj</code> prevents mysterious
    failures — tests not discovered, coverage not collected, wrong target
    framework. Here is a complete, production-ready unit test project file
    with every property explained.
  </p>

  <Code lang="XML" file="MyApp.Domain.UnitTests.csproj — Complete & Annotated">
{`&lt;<span class="t">Project</span> <span class="a">Sdk</span>=<span class="s">"Microsoft.NET.Sdk"</span>&gt;

  &lt;<span class="t">PropertyGroup</span>&gt;
    <span class="c">&lt;!-- Match the framework of the project under test --&gt;</span>
    &lt;<span class="p">TargetFramework</span>&gt;net9.0&lt;/<span class="p">TargetFramework</span>&gt;

    <span class="c">&lt;!-- Latest C# features — keep in sync with production code --&gt;</span>
    &lt;<span class="p">LangVersion</span>&gt;latest&lt;/<span class="p">LangVersion</span>&gt;

    <span class="c">&lt;!-- Enable ? nullable annotations — same rules as production --&gt;</span>
    &lt;<span class="p">Nullable</span>&gt;enable&lt;/<span class="p">Nullable</span>&gt;

    <span class="c">&lt;!-- Adds global usings for System.*, System.Collections.*, etc. --&gt;</span>
    &lt;<span class="p">ImplicitUsings</span>&gt;enable&lt;/<span class="p">ImplicitUsings</span>&gt;

    <span class="c">&lt;!-- MANDATORY: prevents 'dotnet pack' from including this assembly --&gt;</span>
    &lt;<span class="p">IsPackable</span>&gt;false&lt;/<span class="p">IsPackable</span>&gt;

    <span class="c">&lt;!-- Marks this as a test project for VS and build tools --&gt;</span>
    &lt;<span class="p">IsTestProject</span>&gt;true&lt;/<span class="p">IsTestProject</span>&gt;

    <span class="c">&lt;!-- Warnings = Errors: keeps test code as clean as production --&gt;</span>
    &lt;<span class="p">TreatWarningsAsErrors</span>&gt;true&lt;/<span class="p">TreatWarningsAsErrors</span>&gt;

    <span class="c">&lt;!-- Treat nullability warnings as errors too --&gt;</span>
    &lt;<span class="p">WarningsAsErrors</span>&gt;Nullable&lt;/<span class="p">WarningsAsErrors</span>&gt;

    <span class="c">&lt;!-- Optional: give the assembly an explicit name --&gt;</span>
    &lt;<span class="p">AssemblyName</span>&gt;MyApp.Domain.UnitTests&lt;/<span class="p">AssemblyName</span>&gt;
    &lt;<span class="p">RootNamespace</span>&gt;MyApp.Domain.UnitTests&lt;/<span class="p">RootNamespace</span>&gt;
  &lt;/<span class="t">PropertyGroup</span>&gt;

  &lt;<span class="t">ItemGroup</span>&gt;
    <span class="c">&lt;!-- ─── Required xUnit trio ─── --&gt;</span>

    <span class="c">&lt;!-- The .NET test platform host (required by dotnet test) --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"Microsoft.NET.Test.Sdk"</span> /&gt;

    <span class="c">&lt;!-- Core xUnit: [Fact], [Theory], Assert.* --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"xunit"</span> /&gt;

    <span class="c">&lt;!-- Adapter: makes xUnit work inside Visual Studio Test Explorer --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"xunit.runner.visualstudio"</span>&gt;
      <span class="c">&lt;!-- PrivateAssets prevents this from leaking to dependents --&gt;</span>
      &lt;<span class="p">IncludeAssets</span>&gt;runtime; build; native; contentfiles; analyzers; buildtransitive&lt;/<span class="p">IncludeAssets</span>&gt;
      &lt;<span class="p">PrivateAssets</span>&gt;all&lt;/<span class="p">PrivateAssets</span>&gt;
    &lt;/<span class="t">PackageReference</span>&gt;

    <span class="c">&lt;!-- Code coverage via 'dotnet test --collect:"XPlat Code Coverage"' --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"coverlet.collector"</span>&gt;
      &lt;<span class="p">IncludeAssets</span>&gt;runtime; build; native; contentfiles; analyzers; buildtransitive&lt;/<span class="p">IncludeAssets</span>&gt;
      &lt;<span class="p">PrivateAssets</span>&gt;all&lt;/<span class="p">PrivateAssets</span>&gt;
    &lt;/<span class="t">PackageReference</span>&gt;

    <span class="c">&lt;!── ─── Optional but strongly recommended ─── --&gt;</span>

    <span class="c">&lt;!-- Human-readable assertions: result.Should().Be(42) --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"FluentAssertions"</span> /&gt;

    <span class="c">&lt;!-- Mocking framework for dependencies --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"Moq"</span> /&gt;

    <span class="c">&lt;!-- Fake data generation for test scenarios --&gt;</span>
    &lt;<span class="t">PackageReference</span> <span class="a">Include</span>=<span class="s">"Bogus"</span> /&gt;
  &lt;/<span class="t">ItemGroup</span>&gt;

  &lt;<span class="t">ItemGroup</span>&gt;
    <span class="c">&lt;!-- The project being tested --&gt;</span>
    &lt;<span class="t">ProjectReference</span> <span class="a">Include</span>=<span class="s">"..\\..\\src\\MyApp.Domain\\MyApp.Domain.csproj"</span> /&gt;
  &lt;/<span class="t">ItemGroup</span>&gt;

&lt;/<span class="t">Project</span>&gt;`}
  </Code>
</section>

{/* ══════════════════════════════════════════════
    SECTION: GLOBAL USINGS
══════════════════════════════════════════════ */}
<section className="section" id="global-usings" data-section>
  <div className="section-eyebrow">07 — Boilerplate Elimination</div>
  <h1 className="section-h1">GlobalUsings.cs — Eliminate Repetition</h1>
  <p className="section-lead">
    Every test file in the project uses xUnit attributes, FluentAssertions,
    and Moq. Without <code>GlobalUsings.cs</code>, you type the same 6 using
    statements at the top of every file. With it, those namespaces are
    available everywhere in the project — zero repetition.
  </p>

  <Code lang="C#" file="GlobalUsings.cs — place in each test project root">
{`<span class="c">// ─────────────────────────────────────────────────────────────────────────────
// GlobalUsings.cs
// These using statements apply to EVERY .cs file in this project.
// No need to add them to individual test files.
// ─────────────────────────────────────────────────────────────────────────────</span>

<span class="c">// xUnit core attributes and Assert</span>
<span class="k">global using</span> Xunit;

<span class="c">// FluentAssertions — .Should().Be() etc.</span>
<span class="k">global using</span> FluentAssertions;

<span class="c">// Moq — Mock&lt;T&gt;, It.IsAny&lt;&gt;(), Times.*</span>
<span class="k">global using</span> Moq;

<span class="c">// .NET collections and LINQ — always needed</span>
<span class="k">global using</span> System.Collections.Generic;
<span class="k">global using</span> System.Linq;
<span class="k">global using</span> System.Threading.Tasks;

<span class="c">// Your domain namespaces — import top-level ones here</span>
<span class="k">global using</span> MyApp.Domain.Entities;
<span class="k">global using</span> MyApp.Domain.Exceptions;
<span class="k">global using</span> MyApp.Domain.ValueObjects;

<span class="c">// Builders / test data helpers (covered in File 6)</span>
<span class="k">global using</span> MyApp.Domain.UnitTests.Builders;
<span class="k">global using</span> MyApp.Domain.UnitTests.Helpers;</span>`}
  </Code>

  <Note type="tip" icon="💡" title="Implicit Usings vs Global Usings">
    <code>ImplicitUsings</code> in the <code>.csproj</code> automatically adds common
    <code>System.*</code> namespaces (the same ones as the top-level program template).
    Your <code>GlobalUsings.cs</code> adds <em>project-specific</em> namespaces on top.
    Together they eliminate nearly all using statements from test files.
  </Note>

  <h3 className="section-h3">What a Test File Looks Like With Global Usings</h3>
  <Code lang="C#" file="OrderTests.cs — clean, zero using clutter">
{`<span class="c">// Notice: ZERO using statements at the top. Everything comes from GlobalUsings.cs</span>
<span class="k">namespace</span> <span class="t">MyApp.Domain.UnitTests.Entities</span>;

<span class="k">public class</span> <span class="t">OrderTests</span>
{
    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">PlaceOrder_ValidItems_CreatesOrderWithPendingStatus</span>()
    {
        <span class="c">// Arrange — Order, OrderItem from global using MyApp.Domain.Entities</span>
        <span class="k">var</span> <span class="v">order</span> = <span class="k">new</span> <span class="t">Order</span>(<span class="v">customerId</span>: <span class="n">1</span>);
        <span class="k">var</span> <span class="v">item</span>  = <span class="k">new</span> <span class="t">OrderItem</span>(<span class="v">productId</span>: <span class="n">42</span>, <span class="v">quantity</span>: <span class="n">2</span>, <span class="v">unitPrice</span>: <span class="k">new</span> <span class="t">Money</span>(<span class="n">9.99m</span>));

        <span class="c">// Act</span>
        <span class="v">order</span>.<span class="m">AddItem</span>(<span class="v">item</span>);
        <span class="v">order</span>.<span class="m">Place</span>();

        <span class="c">// Assert — FluentAssertions from global using</span>
        <span class="v">order</span>.Status.Should().<span class="m">Be</span>(<span class="t">OrderStatus</span>.Pending);
        <span class="v">order</span>.Items.Should().<span class="m">HaveCount</span>(<span class="n">1</span>);
    }
}`}
  </Code>
</section>

{/* ══════════════════════════════════════════════
    SECTION: XUNIT ATTRIBUTES
══════════════════════════════════════════════ */}
<section className="section" id="attributes" data-section>
  <div className="section-eyebrow">08 — xUnit API</div>
  <h1 className="section-h1">xUnit Attributes: The Complete Reference</h1>
  <p className="section-lead">
    xUnit's attribute system is how you declare tests, provide data,
    configure fixtures, and control parallelism. Here is every attribute
    you will use regularly, explained in depth with real examples.
  </p>

  <h3 className="section-h3">[Fact] — Single Test Case</h3>
  <p className="prose">Marks a method as a single, standalone test. No parameters. No data. The simplest and most common attribute.</p>

  <Code lang="C#" file="[Fact] — usage and options">
{`<span class="c">// Basic [Fact]</span>
[<span class="a">Fact</span>]
<span class="k">public void</span> <span class="m">Add_TwoPositiveNumbers_ReturnsSum</span>()
{
    <span class="k">var</span> <span class="v">result</span> = <span class="k">new</span> <span class="t">Calculator</span>().<span class="m">Add</span>(<span class="n">3</span>, <span class="n">4</span>);
    <span class="v">result</span>.Should().<span class="m">Be</span>(<span class="n">7</span>);
}

<span class="c">// [Fact] with display name — appears in Test Explorer</span>
[<span class="a">Fact</span>(<span class="p">DisplayName</span> = <span class="s">"Calculator: Adding 3 + 4 must equal 7"</span>)]
<span class="k">public void</span> <span class="m">Add_3And4_Equals7</span>() { }

<span class="c">// [Fact] that is temporarily skipped — keeps it visible but doesn't run</span>
[<span class="a">Fact</span>(<span class="p">Skip</span> = <span class="s">"Feature not yet implemented — tracked in JIRA-1234"</span>)]
<span class="k">public void</span> <span class="m">Divide_ByZero_ThrowsDivideByZeroException</span>() { }

<span class="c">// Async [Fact] — xUnit natively supports Task-returning tests</span>
[<span class="a">Fact</span>]
<span class="k">public async</span> <span class="t">Task</span> <span class="m">GetUserAsync_ExistingId_ReturnsUser</span>()
{
    <span class="k">var</span> <span class="v">user</span> = <span class="k">await</span> <span class="v">_sut</span>.<span class="m">GetUserAsync</span>(<span class="n">1</span>);
    <span class="v">user</span>.Should().<span class="m">NotBeNull</span>();
}

<span class="c">// ❌ NEVER use async void — xUnit cannot catch exceptions from it</span>
[<span class="a">Fact</span>]
<span class="k">public async void</span> <span class="m">BadAsyncTest</span>()  <span class="c">// Will silently pass even if it throws!</span>
{
    <span class="k">await</span> <span class="v">_sut</span>.<span class="m">DoSomethingAsync</span>();
}`}
  </Code>

  <h3 className="section-h3">[Theory] — Data-Driven Tests</h3>
  <p className="prose">A Theory is a test that proves something is true for a <em>range of data</em>. It always requires a data source attribute. xUnit runs the method once for each row of data.</p>

  <Tabs tabs={[
    {
      label: "[InlineData]",
      html: `<p style="color:#9ca3af;font-size:12px;margin-bottom:12px"><strong style="color:#e2d9c8">[InlineData]</strong> — hardcoded data directly in the attribute. Best for small, simple datasets (under 5-6 rows). Data is visible at the call site, which is great for readability.</p>
<div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div><span class="code-filename">InlineData examples</span></div><span class="code-lang">C#</span></div>
<div class="code-body"><span class="c">// Each [InlineData] produces a separate test run in Test Explorer</span>
[<span class="a">Theory</span>]
[<span class="a">InlineData</span>(<span class="n">1</span>,  <span class="n">1</span>,  <span class="n">2</span>)]   <span class="c">// 1 + 1 = 2</span>
[<span class="a">InlineData</span>(<span class="n">0</span>,  <span class="n">5</span>,  <span class="n">5</span>)]   <span class="c">// 0 + 5 = 5</span>
[<span class="a">InlineData</span>(-<span class="n">1</span>, <span class="n">1</span>,  <span class="n">0</span>)]   <span class="c">// -1 + 1 = 0</span>
[<span class="a">InlineData</span>(<span class="n">100</span>, <span class="n">200</span>, <span class="n">300</span>)]
<span class="k">public void</span> <span class="m">Add_VariousInputs_ReturnsCorrectSum</span>(<span class="k">int</span> <span class="v">a</span>, <span class="k">int</span> <span class="v">b</span>, <span class="k">int</span> <span class="v">expected</span>)
{
    <span class="v">_sut</span>.<span class="m">Add</span>(<span class="v">a</span>, <span class="v">b</span>).Should().<span class="m">Be</span>(<span class="v">expected</span>);
}

<span class="c">// Mixing types — InlineData supports object params</span>
[<span class="a">Theory</span>]
[<span class="a">InlineData</span>(<span class="s">"hello"</span>, <span class="k">true</span>)]
[<span class="a">InlineData</span>(<span class="s">""</span>,      <span class="k">false</span>)]
[<span class="a">InlineData</span>(<span class="s">"  "</span>,   <span class="k">false</span>)]
[<span class="a">InlineData</span>(<span class="k">null</span>,   <span class="k">false</span>)]
<span class="k">public void</span> <span class="m">IsValidName_VariousInputs_ReturnsExpected</span>(<span class="k">string</span>? <span class="v">input</span>, <span class="k">bool</span> <span class="v">expected</span>)
{
    <span class="t">NameValidator</span>.<span class="m">IsValid</span>(<span class="v">input</span>).Should().<span class="m">Be</span>(<span class="v">expected</span>);
}

<span class="c">// With enum values</span>
[<span class="a">Theory</span>]
[<span class="a">InlineData</span>(<span class="t">OrderStatus</span>.Pending,   <span class="k">true</span>)]
[<span class="a">InlineData</span>(<span class="t">OrderStatus</span>.Shipped,   <span class="k">false</span>)]
[<span class="a">InlineData</span>(<span class="t">OrderStatus</span>.Cancelled, <span class="k">false</span>)]
<span class="k">public void</span> <span class="m">CanCancel_VariousStatuses_ReturnsExpected</span>(<span class="t">OrderStatus</span> <span class="v">status</span>, <span class="k">bool</span> <span class="v">expected</span>)
{
    <span class="k">var</span> <span class="v">order</span> = <span class="t">Order</span>.<span class="m">WithStatus</span>(<span class="v">status</span>);
    <span class="v">order</span>.<span class="m">CanCancel</span>().Should().<span class="m">Be</span>(<span class="v">expected</span>);
}</div></div>`
    },
    {
      label: "[MemberData]",
      html: `<p style="color:#9ca3af;font-size:12px;margin-bottom:12px"><strong style="color:#e2d9c8">[MemberData]</strong> — data from a static property, field, or method in the same class (or another class). Best for complex objects, large datasets, or data that needs construction logic.</p>
<div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div><span class="code-filename">MemberData examples</span></div><span class="code-lang">C#</span></div>
<div class="code-body"><span class="k">public class</span> <span class="t">DiscountCalculatorTests</span>
{
    <span class="c">// Static property returning IEnumerable&lt;object[]&gt;</span>
    <span class="k">public static</span> <span class="t">IEnumerable</span>&lt;<span class="k">object</span>[]&gt; <span class="p">DiscountTestCases</span> =&gt;
    [
        [<span class="k">new</span> <span class="t">Customer</span> { IsLoyal = <span class="k">true</span>,  OrderTotal = <span class="n">500m</span> }, <span class="n">0.15m</span>],  <span class="c">// 15% loyal</span>
        [<span class="k">new</span> <span class="t">Customer</span> { IsLoyal = <span class="k">false</span>, OrderTotal = <span class="n">500m</span> }, <span class="n">0.10m</span>],  <span class="c">// 10% large order</span>
        [<span class="k">new</span> <span class="t">Customer</span> { IsLoyal = <span class="k">true</span>,  OrderTotal = <span class="n">50m</span>  }, <span class="n">0.05m</span>],  <span class="c">// 5%  loyal small</span>
        [<span class="k">new</span> <span class="t">Customer</span> { IsLoyal = <span class="k">false</span>, OrderTotal = <span class="n">10m</span>  }, <span class="n">0.00m</span>],  <span class="c">// 0%  no discount</span>
    ];

    [<span class="a">Theory</span>]
    [<span class="a">MemberData</span>(<span class="k">nameof</span>(<span class="p">DiscountTestCases</span>))]
    <span class="k">public void</span> <span class="m">Calculate_VariousCustomerTypes_ReturnsCorrectDiscount</span>(
        <span class="t">Customer</span> <span class="v">customer</span>, <span class="k">decimal</span> <span class="v">expectedRate</span>)
    {
        <span class="k">var</span> <span class="v">result</span> = <span class="k">new</span> <span class="t">DiscountCalculator</span>().<span class="m">Calculate</span>(<span class="v">customer</span>);
        <span class="v">result</span>.Should().<span class="m">Be</span>(<span class="v">expectedRate</span>);
    }
}

<span class="c">// Data from another class — keeps test files small</span>
<span class="k">public static class</span> <span class="t">OrderTestData</span>
{
    <span class="k">public static</span> <span class="t">TheoryData</span>&lt;<span class="k">string</span>, <span class="k">bool</span>&gt; <span class="p">InvalidEmails</span> =&gt; <span class="k">new</span>()
    {
        { <span class="s">""</span>,           <span class="k">false</span> },
        { <span class="s">"notanemail"</span>, <span class="k">false</span> },
        { <span class="s">"@nodomain"</span>,  <span class="k">false</span> },
        { <span class="s">"no@tld"</span>,     <span class="k">false</span> },
    };
}

[<span class="a">Theory</span>]
[<span class="a">MemberData</span>(<span class="k">nameof</span>(<span class="t">OrderTestData</span>.<span class="p">InvalidEmails</span>), <span class="p">MemberType</span> = <span class="k">typeof</span>(<span class="t">OrderTestData</span>))]
<span class="k">public void</span> <span class="m">Validate_InvalidEmail_ReturnsFalse</span>(<span class="k">string</span> <span class="v">email</span>, <span class="k">bool</span> <span class="v">expected</span>)
{
    <span class="t">EmailValidator</span>.<span class="m">IsValid</span>(<span class="v">email</span>).Should().<span class="m">Be</span>(<span class="v">expected</span>);
}

<span class="c">// TheoryData&lt;T&gt; — strongly typed, no object[] boxing — PREFERRED</span>
<span class="k">public static</span> <span class="t">TheoryData</span>&lt;<span class="k">int</span>, <span class="k">string</span>&gt; <span class="p">FizzBuzzCases</span> =&gt; <span class="k">new</span>()
{
    { <span class="n">1</span>,  <span class="s">"1"</span>       },
    { <span class="n">3</span>,  <span class="s">"Fizz"</span>    },
    { <span class="n">5</span>,  <span class="s">"Buzz"</span>    },
    { <span class="n">15</span>, <span class="s">"FizzBuzz"</span> },
};</div></div>`
    },
    {
      label: "[ClassData]",
      html: `<p style="color:#9ca3af;font-size:12px;margin-bottom:12px"><strong style="color:#e2d9c8">[ClassData]</strong> — data from a dedicated class that implements <code>IEnumerable&lt;object[]&gt;</code>. Best for very large datasets, data loaded from files, or data with complex generation logic.</p>
<div class="code-wrap"><div class="code-header"><div class="code-left"><div class="code-dots"><div class="code-dot code-dot-r"></div><div class="code-dot code-dot-y"></div><div class="code-dot code-dot-g"></div></div><span class="code-filename">ClassData example</span></div><span class="code-lang">C#</span></div>
<div class="code-body"><span class="c">// The data provider class</span>
<span class="k">public class</span> <span class="t">PriceCalculationTestData</span> : <span class="t">IEnumerable</span>&lt;<span class="k">object</span>[]&gt;
{
    <span class="k">public</span> <span class="t">IEnumerator</span>&lt;<span class="k">object</span>[]&gt; <span class="m">GetEnumerator</span>()
    {
        <span class="c">// Can load from CSV, JSON, or generate algorithmically</span>
        <span class="k">yield return</span> [<span class="n">10m</span>,  <span class="n">0m</span>,   <span class="n">10m</span>   ];  <span class="c">// price, discount, expected</span>
        <span class="k">yield return</span> [<span class="n">10m</span>,  <span class="n">10m</span>,  <span class="n">9m</span>    ];
        <span class="k">yield return</span> [<span class="n">100m</span>, <span class="n">25m</span>,  <span class="n">75m</span>   ];
        <span class="k">yield return</span> [<span class="n">50m</span>,  <span class="n">100m</span>, <span class="n">0m</span>    ];  <span class="c">// 100% discount</span>

        <span class="c">// Generate boundary cases programmatically</span>
        <span class="k">for</span> (<span class="k">var</span> <span class="v">i</span> = <span class="n">0</span>; <span class="v">i</span> &lt;= <span class="n">100</span>; <span class="v">i</span> += <span class="n">10</span>)
            <span class="k">yield return</span> [<span class="n">100m</span>, (<span class="k">decimal</span>)<span class="v">i</span>, <span class="n">100m</span> - <span class="v">i</span>];
    }

    <span class="t">IEnumerator</span> <span class="t">IEnumerable</span>.<span class="m">GetEnumerator</span>() =&gt; <span class="m">GetEnumerator</span>();
}

<span class="c">// The test using ClassData</span>
[<span class="a">Theory</span>]
[<span class="a">ClassData</span>(<span class="k">typeof</span>(<span class="t">PriceCalculationTestData</span>))]
<span class="k">public void</span> <span class="m">CalculateFinalPrice_VariousDiscounts_ReturnsCorrectPrice</span>(
    <span class="k">decimal</span> <span class="v">price</span>, <span class="k">decimal</span> <span class="v">discountPercent</span>, <span class="k">decimal</span> <span class="v">expected</span>)
{
    <span class="k">var</span> <span class="v">result</span> = <span class="k">new</span> <span class="t">PriceCalculator</span>().<span class="m">ApplyDiscount</span>(<span class="v">price</span>, <span class="v">discountPercent</span>);
    <span class="v">result</span>.Should().<span class="m">Be</span>(<span class="v">expected</span>);
}</div></div>`
    },
  ]} />

  <h3 className="section-h3">Other Important Attributes</h3>
  <Code lang="C#" file="Traits, Skip, Collection">
{`<span class="c">// [Trait] — categorise tests for filtering</span>
[<span class="a">Fact</span>]
[<span class="a">Trait</span>(<span class="s">"Category"</span>, <span class="s">"Unit"</span>)]
[<span class="a">Trait</span>(<span class="s">"Feature"</span>,  <span class="s">"Orders"</span>)]
<span class="k">public void</span> <span class="m">SomeOrderTest</span>() { }

<span class="c">// Run only [Trait("Feature", "Orders")] tests:</span>
<span class="c">// dotnet test --filter "Trait=Feature=Orders"</span>

<span class="c">// [Collection] — groups test classes to share fixture and prevent parallel runs</span>
[<span class="a">Collection</span>(<span class="s">"Database"</span>)]
<span class="k">public class</span> <span class="t">OrderRepositoryTests</span>
{
    <span class="c">// The [Collection] attribute is covered fully in File 4 (Integration Tests)</span>
}

<span class="c">// xunit.runner.json — configure parallelism at project level</span>
<span class="c">// Create file: xunit.runner.json in the test project root</span>
<span class="c">// {</span>
<span class="c">//   "$schema": "https://xunit.net/schema/current/xunit.runner.schema.json",</span>
<span class="c">//   "parallelizeAssembly": true,</span>
<span class="c">//   "parallelizeTestCollections": true,</span>
<span class="c">//   "maxParallelThreads": 4</span>
<span class="c">// }</span>`}
  </Code>
</section>

{/* ══════════════════════════════════════════════
    SECTION: TEST CLASS DESIGN
══════════════════════════════════════════════ */}
<section className="section" id="class-design" data-section>
  <div className="section-eyebrow">09 — Design Patterns</div>
  <h1 className="section-h1">Test Class Design</h1>
  <p className="section-lead">
    xUnit makes a deliberate architectural choice: there is no <code>[SetUp]</code>
    or <code>[TearDown]</code> attribute. Instead, xUnit creates a <strong>new
    instance of the test class for every test method</strong>. This enforces
    test isolation at the framework level and makes the constructor the natural
    place for shared setup.
  </p>

  <Note type="info" icon="🏗️" title="xUnit vs NUnit/MSTest — The Key Difference">
    NUnit and MSTest allow shared mutable state via <code>[SetUp]</code> and static fields.
    xUnit forces you to think about isolation. Each test method gets a fresh class
    instance — so instance fields set in the constructor are always clean.
    This is a feature, not a limitation.
  </Note>

  <Code lang="C#" file="OrderServiceTests.cs — full production-quality test class">
{`<span class="k">namespace</span> <span class="t">MyApp.Application.UnitTests.Services</span>;

<span class="c">/// &lt;summary&gt;
/// Tests for OrderService.
/// SUT = System Under Test — a common abbreviation in test literature.
/// &lt;/summary&gt;</span>
<span class="k">public class</span> <span class="t">OrderServiceTests</span>
{
    <span class="c">// ─── Fields — shared across all tests in this class ───────────────────────</span>
    <span class="c">// These are re-initialised for EVERY test method (new class instance).</span>
    <span class="c">// So tests can never contaminate each other through these fields.</span>
    <span class="k">private readonly</span> <span class="t">OrderService</span> <span class="v">_sut</span>;
    <span class="k">private readonly</span> <span class="t">Mock</span>&lt;<span class="t">IOrderRepository</span>&gt; <span class="v">_mockOrderRepo</span>;
    <span class="k">private readonly</span> <span class="t">Mock</span>&lt;<span class="t">IInventoryService</span>&gt; <span class="v">_mockInventory</span>;
    <span class="k">private readonly</span> <span class="t">Mock</span>&lt;<span class="t">IEmailService</span>&gt; <span class="v">_mockEmail</span>;

    <span class="c">// ─── Constructor = [SetUp] in xUnit ───────────────────────────────────────</span>
    <span class="k">public</span> <span class="m">OrderServiceTests</span>()
    {
        <span class="c">// Create fresh mocks for every test</span>
        <span class="v">_mockOrderRepo</span> = <span class="k">new</span> <span class="t">Mock</span>&lt;<span class="t">IOrderRepository</span>&gt;();
        <span class="v">_mockInventory</span> = <span class="k">new</span> <span class="t">Mock</span>&lt;<span class="t">IInventoryService</span>&gt;();
        <span class="v">_mockEmail</span>     = <span class="k">new</span> <span class="t">Mock</span>&lt;<span class="t">IEmailService</span>&gt;();

        <span class="c">// Default happy-path stub behaviour</span>
        <span class="v">_mockInventory</span>
            .<span class="m">Setup</span>(<span class="v">x</span> =&gt; <span class="v">x</span>.<span class="m">IsInStock</span>(<span class="t">It</span>.<span class="m">IsAny</span>&lt;<span class="k">int</span>&gt;(), <span class="t">It</span>.<span class="m">IsAny</span>&lt;<span class="k">int</span>&gt;()))
            .<span class="m">Returns</span>(<span class="k">true</span>);

        <span class="c">// Build the SUT with all dependencies injected</span>
        <span class="v">_sut</span> = <span class="k">new</span> <span class="t">OrderService</span>(
            <span class="v">_mockOrderRepo</span>.<span class="v">Object</span>,
            <span class="v">_mockInventory</span>.<span class="v">Object</span>,
            <span class="v">_mockEmail</span>.<span class="v">Object</span>);
    }

    <span class="c">// ─── Tests ────────────────────────────────────────────────────────────────</span>

    [<span class="a">Fact</span>]
    <span class="k">public async</span> <span class="t">Task</span> <span class="m">PlaceOrderAsync_ValidOrder_SavesOrderToRepository</span>()
    {
        <span class="c">// Arrange</span>
        <span class="k">var</span> <span class="v">command</span> = <span class="t">PlaceOrderCommandBuilder</span>.<span class="m">Valid</span>().<span class="m">Build</span>();

        <span class="c">// Act</span>
        <span class="k">await</span> <span class="v">_sut</span>.<span class="m">PlaceOrderAsync</span>(<span class="v">command</span>);

        <span class="c">// Assert — mock verifies the repository was called</span>
        <span class="v">_mockOrderRepo</span>.<span class="m">Verify</span>(
            <span class="v">x</span> =&gt; <span class="v">x</span>.<span class="m">SaveAsync</span>(<span class="t">It</span>.<span class="m">IsAny</span>&lt;<span class="t">Order</span>&gt;()),
            <span class="t">Times</span>.Once);
    }

    [<span class="a">Fact</span>]
    <span class="k">public async</span> <span class="t">Task</span> <span class="m">PlaceOrderAsync_ItemOutOfStock_ThrowsOutOfStockException</span>()
    {
        <span class="c">// Arrange — override default stub for this specific test</span>
        <span class="v">_mockInventory</span>
            .<span class="m">Setup</span>(<span class="v">x</span> =&gt; <span class="v">x</span>.<span class="m">IsInStock</span>(<span class="t">It</span>.<span class="m">IsAny</span>&lt;<span class="k">int</span>&gt;(), <span class="t">It</span>.<span class="m">IsAny</span>&lt;<span class="k">int</span>&gt;()))
            .<span class="m">Returns</span>(<span class="k">false</span>);  <span class="c">// Override the happy-path default</span>

        <span class="k">var</span> <span class="v">command</span> = <span class="t">PlaceOrderCommandBuilder</span>.<span class="m">Valid</span>().<span class="m">Build</span>();

        <span class="c">// Act + Assert</span>
        <span class="k">await</span> <span class="v">_sut</span>.<span class="m">Invoking</span>(<span class="v">s</span> =&gt; <span class="v">s</span>.<span class="m">PlaceOrderAsync</span>(<span class="v">command</span>))
            .Should().<span class="m">ThrowAsync</span>&lt;<span class="t">OutOfStockException</span>&gt;();

        <span class="c">// And verify the order was NOT saved</span>
        <span class="v">_mockOrderRepo</span>.<span class="m">Verify</span>(
            <span class="v">x</span> =&gt; <span class="v">x</span>.<span class="m">SaveAsync</span>(<span class="t">It</span>.<span class="m">IsAny</span>&lt;<span class="t">Order</span>&gt;()),
            <span class="t">Times</span>.Never);
    }
}

<span class="c">// ─────────────────────────────────────────────────────────────────────────────
// IDisposable — for teardown (release resources after each test)</span>
<span class="k">public class</span> <span class="t">FileProcessorTests</span> : <span class="t">IDisposable</span>
{
    <span class="k">private readonly</span> <span class="k">string</span> <span class="v">_tempDir</span>;

    <span class="k">public</span> <span class="m">FileProcessorTests</span>()
    {
        <span class="v">_tempDir</span> = <span class="t">Path</span>.<span class="m">Combine</span>(<span class="t">Path</span>.<span class="m">GetTempPath</span>(), <span class="t">Guid</span>.<span class="m">NewGuid</span>().<span class="m">ToString</span>());
        <span class="t">Directory</span>.<span class="m">CreateDirectory</span>(<span class="v">_tempDir</span>);
    }

    <span class="k">public void</span> <span class="m">Dispose</span>()
    {
        <span class="c">// Runs after every test method</span>
        <span class="t">Directory</span>.<span class="m">Delete</span>(<span class="v">_tempDir</span>, <span class="v">recursive</span>: <span class="k">true</span>);
    }
}

<span class="c">// IAsyncDisposable — for async teardown</span>
<span class="k">public class</span> <span class="t">DatabaseTests</span> : <span class="t">IAsyncDisposable</span>
{
    <span class="k">public async</span> <span class="t">ValueTask</span> <span class="m">DisposeAsync</span>()
    {
        <span class="k">await</span> <span class="v">_connection</span>.<span class="m">CloseAsync</span>();
        <span class="k">await</span> <span class="v">_connection</span>.<span class="m">DisposeAsync</span>();
    }
}`}
  </Code>
</section>

{/* ══════════════════════════════════════════════
    SECTION: OUTPUT HELPER
══════════════════════════════════════════════ */}
<section className="section" id="output-helper" data-section>
  <div className="section-eyebrow">10 — Diagnostics</div>
  <h1 className="section-h1">ITestOutputHelper — Test-Scoped Logging</h1>
  <p className="section-lead">
    Never use <code>Console.WriteLine</code> in tests. Output written to the console
    is swallowed by xUnit and never shown. Use <code>ITestOutputHelper</code> — output
    is only shown for <em>failing tests</em>, keeping the terminal clean on green
    runs while giving full diagnostic info on failures.
  </p>

  <Code lang="C#" file="Using ITestOutputHelper">
{`<span class="k">public class</span> <span class="t">PricingServiceTests</span>
{
    <span class="k">private readonly</span> <span class="t">PricingService</span> <span class="v">_sut</span>;
    <span class="k">private readonly</span> <span class="t">ITestOutputHelper</span> <span class="v">_output</span>;

    <span class="c">// xUnit injects ITestOutputHelper automatically — no [Inject] needed</span>
    <span class="k">public</span> <span class="m">PricingServiceTests</span>(<span class="t">ITestOutputHelper</span> <span class="v">output</span>)
    {
        <span class="v">_output</span> = <span class="v">output</span>;
        <span class="v">_sut</span> = <span class="k">new</span> <span class="t">PricingService</span>();
    }

    [<span class="a">Fact</span>]
    <span class="k">public void</span> <span class="m">CalculatePrice_ComplexScenario_LogsIntermediateSteps</span>()
    {
        <span class="k">var</span> <span class="v">request</span> = <span class="k">new</span> <span class="t">PricingRequest</span> { BasePrice = <span class="n">100m</span>, Quantity = <span class="n">10</span> };

        <span class="v">_output</span>.<span class="m">WriteLine</span>(<span class="s">$"Input: BasePrice={request.BasePrice}, Qty={request.Quantity}"</span>);

        <span class="k">var</span> <span class="v">result</span> = <span class="v">_sut</span>.<span class="m">Calculate</span>(<span class="v">request</span>);

        <span class="v">_output</span>.<span class="m">WriteLine</span>(<span class="s">$"Result: {result}"</span>);  <span class="c">// Only shown if test FAILS</span>

        <span class="v">result</span>.FinalPrice.Should().<span class="m">Be</span>(<span class="n">850m</span>);
    }

    [<span class="a">Theory</span>]
    [<span class="a">InlineData</span>(<span class="n">1</span>, <span class="n">100m</span>)]
    [<span class="a">InlineData</span>(<span class="n">5</span>, <span class="n">475m</span>)]
    [<span class="a">InlineData</span>(<span class="n">10</span>, <span class="n">850m</span>)]
    <span class="k">public void</span> <span class="m">CalculatePrice_BulkDiscount_AppliesCorrectly</span>(<span class="k">int</span> <span class="v">qty</span>, <span class="k">decimal</span> <span class="v">expected</span>)
    {
        <span class="v">_output</span>.<span class="m">WriteLine</span>(<span class="s">$"Testing qty={qty}, expecting={expected}"</span>);
        <span class="k">var</span> <span class="v">result</span> = <span class="v">_sut</span>.<span class="m">Calculate</span>(<span class="k">new</span> <span class="t">PricingRequest</span> { BasePrice = <span class="n">100m</span>, Quantity = <span class="v">qty</span> });
        <span class="v">result</span>.FinalPrice.Should().<span class="m">Be</span>(<span class="v">expected</span>);
    }
}`}
  </Code>
</section>

{/* ══════════════════════════════════════════════
    SECTION: RUNNING TESTS
══════════════════════════════════════════════ */}
<section className="section" id="running-tests" data-section>
  <div className="section-eyebrow">11 — Workflow</div>
  <h1 className="section-h1">Running Tests in Visual Studio &amp; CLI</h1>
  <p className="section-lead">
    You should be comfortable running tests three ways: Test Explorer (mouse-driven,
    great for exploration), keyboard shortcuts (fast during active development),
    and the CLI (for CI pipelines and scripts).
  </p>

  <h3 className="section-h3">Visual Studio Test Explorer</h3>
  <div className="card-grid">
    {[
      { icon: "🔍", title: "Open Test Explorer", body: "View → Test Explorer (Ctrl+E, T). Docks as a panel. Tests appear automatically after a build." },
      { icon: "▶️", title: "Run All Tests", body: "Click the green Run All button, or Ctrl+R, A. All test projects in the solution run." },
      { icon: "🔁", title: "Run Failed Tests", body: "Click the 'Run Failed Tests' button to re-run only tests that failed last time. Great after fixing a bug." },
      { icon: "🔬", title: "Run Single Test", body: "Right-click any test method in the editor gutter (green/red dot) → Run Test. Or click the test in Test Explorer." },
      { icon: "⚡", title: "Live Unit Testing", body: "Test → Live Unit Testing → Start. Tests run automatically on save. Green tick = passing, red X = failing, right there in the editor." },
      { icon: "🗂️", title: "Group & Filter", body: "Group by Project, Namespace, Class, or Trait. Filter by 'Failed', 'Not Run', or search by name. Essential for large suites." },
    ].map(c => (
      <div className="card" key={c.title}>
        <div className="card-icon">{c.icon}</div>
        <div className="card-title">{c.title}</div>
        <div className="card-body">{c.body}</div>
      </div>
    ))}
  </div>

  <h3 className="section-h3">Essential CLI Commands</h3>
  <Code lang="BASH" file="dotnet test — most useful commands">
{`<span class="c"># Run all tests in the solution</span>
dotnet test

<span class="c"># Run a specific project</span>
dotnet test tests/MyApp.Domain.UnitTests

<span class="c"># Filter by test name (partial match)</span>
dotnet test --filter "CalculateDiscount"

<span class="c"># Filter by class name</span>
dotnet test --filter "ClassName=OrderServiceTests"

<span class="c"># Filter by trait (requires [Trait] on test)</span>
dotnet test --filter "Category=Unit"

<span class="c"># Filter by multiple traits (AND)</span>
dotnet test --filter "Category=Unit&Feature=Orders"

<span class="c"># Run only unit test projects by name pattern</span>
dotnet test --filter "FullyQualifiedName~UnitTests"

<span class="c"># Run with detailed logging (shows all test names + duration)</span>
dotnet test --verbosity normal

<span class="c"># Stop at first failure (fail fast)</span>
dotnet test --blame-hang-timeout 30s

<span class="c"># Collect code coverage (generates coverage.xml)</span>
dotnet test --collect:"XPlat Code Coverage"

<span class="c"># Run in parallel (max CPU cores)</span>
dotnet test --maxCpuCount

<span class="c"># Combine: filter + coverage + output</span>
dotnet test \
  tests/MyApp.Domain.UnitTests \
  --filter "Category=Unit" \
  --collect:"XPlat Code Coverage" \
  --results-directory ./coverage \
  --verbosity minimal

<span class="c"># Output TRX report for Azure DevOps / GitHub Actions</span>
dotnet test --logger "trx;LogFileName=results.trx"
dotnet test --logger "junit;LogFilePath=results.xml"  <span class="c"># GitHub Actions</span>`}
  </Code>

  <Note type="info" icon="⌨️" title="Key Keyboard Shortcuts in Visual Studio">
    <strong>Ctrl+R, T</strong> — Run test the cursor is in<br/>
    <strong>Ctrl+R, A</strong> — Run all tests<br/>
    <strong>Ctrl+R, F</strong> — Run failed tests<br/>
    <strong>Ctrl+R, L</strong> — Repeat last test run<br/>
    <strong>Ctrl+E, T</strong> — Open Test Explorer
  </Note>
</section>

{/* ══════════════════════════════════════════════
    SECTION: EXERCISE
══════════════════════════════════════════════ */}
<section className="section" id="exercise" data-section>
  <div className="section-eyebrow">12 — Practice</div>
  <h1 className="section-h1">Capstone Exercise: Scaffold a Complete Solution</h1>
  <p className="section-lead">
    Apply everything from this module. By the end, you will have a fully
    structured, professional .NET solution with correctly configured test
    projects, ready for the testing work covered in Files 2–6.
  </p>

  <div className="exercise">
    <div className="exercise-header">
      <span className="exercise-badge">Exercise 1</span>
      <span className="exercise-num">Estimated time: 45–60 min</span>
    </div>
    <h3 className="exercise-title">Build the ECommerceApp Solution</h3>
    <p className="exercise-intro">
      You are building a simple e-commerce domain. Scaffold the solution structure,
      create all test projects correctly, configure shared build properties, and
      write your first correctly named and structured tests.
    </p>
    <ol className="exercise-steps">
      {[
        {
          body: <><strong>Scaffold the solution.</strong> Use the CLI: create a solution named <code>ECommerceApp</code>. Create four source projects: <code>ECommerceApp.Domain</code> (classlib), <code>ECommerceApp.Application</code> (classlib), <code>ECommerceApp.Infrastructure</code> (classlib), <code>ECommerceApp.Api</code> (webapi). Add all to the solution.</>,
        },
        {
          body: <><strong>Create test projects.</strong> Create three xUnit test projects: <code>ECommerceApp.Domain.UnitTests</code>, <code>ECommerceApp.Application.UnitTests</code>, <code>ECommerceApp.Api.IntegrationTests</code>. Add each to the solution. Add the correct project references (Domain.UnitTests → Domain, etc.).</>,
        },
        {
          body: <><strong>Configure Directory.Build.props.</strong> Create a root <code>Directory.Build.props</code> with <code>LangVersion=latest</code>, <code>Nullable=enable</code>, <code>ImplicitUsings=enable</code>. Create a <code>tests/Directory.Build.props</code> that inherits root settings and adds <code>IsPackable=false</code> and the four standard test NuGet references.</>,
        },
        {
          body: <><strong>Configure Directory.Packages.props.</strong> Enable central package management. Define versions for: xunit 2.9.2, xunit.runner.visualstudio 2.8.2, Microsoft.NET.Test.Sdk 17.12.0, coverlet.collector 6.0.2, FluentAssertions 6.12.1, Moq 4.20.72.</>,
        },
        {
          body: <><strong>Create GlobalUsings.cs</strong> in each test project. Include global usings for Xunit, FluentAssertions, Moq, and the relevant domain namespaces.</>,
        },
        {
          body: <><strong>Create the domain model.</strong> In <code>ECommerceApp.Domain</code>, create: a <code>Product</code> entity (Id, Name, Price, Stock), a <code>Money</code> value object (Amount, Currency), and a <code>ProductService</code> with a method <code>decimal CalculateTotalPrice(Product product, int quantity)</code> that throws <code>ArgumentException</code> if quantity ≤ 0 or exceeds stock.</>,
        },
        {
          body: <><strong>Write tests for ProductService</strong> in <code>ECommerceApp.Domain.UnitTests</code>. Create a class <code>ProductServiceTests</code> (or use nested classes per method). Write these tests — correctly named following the <code>MethodName_Scenario_ExpectedResult</code> convention: (a) valid quantity returns correct total, (b) zero quantity throws ArgumentException, (c) quantity exceeds stock throws ArgumentException, (d) use <code>[Theory]</code> with at least 4 <code>[InlineData]</code> rows for the happy path.</>,
        },
        {
          body: <><strong>Verify everything.</strong> Run <code>dotnet build</code> — must succeed with zero warnings. Run <code>dotnet test</code> — all tests must pass. Open Visual Studio Test Explorer and confirm tests appear with correct grouping. Delete the auto-generated <code>UnitTest1.cs</code> files.</>,
        },
      ].map((s, i) => (
        <li className="exercise-step" key={i}>
          <span className="step-num">{i + 1}</span>
          <span className="step-body">{s.body}</span>
        </li>
      ))}
    </ol>
  </div>

  <Note type="tip" icon="🎯" title="What Success Looks Like">
    After completing this exercise, <code>dotnet test</code> prints something like:
    <br/><br/>
    <code>Test summary: total: 7, failed: 0, succeeded: 7, skipped: 0, duration: 0.3s</code>
    <br/><br/>
    All 7 tests are green. The solution structure is clean. Test Explorer shows tests
    grouped under <strong>ECommerceApp.Domain.UnitTests → ProductServiceTests</strong>.
    You are ready for File 2: The Art of Unit Testing.
  </Note>

  <div className="bq">
    The best time to establish correct test project structure is before you
    write a single line of production code. The second best time is now.
    <div className="bq-attr">— This module, summarised</div>
  </div>
</section>

          </main>
        </div>
      </div>
    </>
  );
}