import { getStarted } from "@/lib/data";
import {
  BarChart,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  Collapse,
  EmptyCircle,
  Folder,
  Help,
  Power,
  Rocket,
  Send,
  Star,
  Timeline,
  Upgrade,
} from "./Icons";

const navSections = [
  {
    label: "TRACK",
    items: [{ name: "Timer", icon: <Clock />, active: false, starred: false }],
  },
  {
    label: "ANALYZE",
    items: [{ name: "Reports", icon: <BarChart />, active: true, starred: false }],
  },
  {
    label: "PLAN",
    items: [
      { name: "Projects", icon: <Folder />, active: false, starred: false },
      { name: "Timeline", icon: <Timeline />, active: false, starred: true },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="org">
        <div className="org-logo">
          <Power />
          <span className="version">2.0</span>
        </div>
        <div className="org-name">Ignacio&apos;s organization</div>
        <ChevronDown size={13} />
      </div>

      <div className="ask">
        <span>Ask Toggl ⏎</span>
        <kbd>Ctrl K</kbd>
      </div>

      {navSections.map((section) => (
        <div key={section.label}>
          <div className="nav-label">{section.label}</div>
          {section.items.map((item) => (
            <button
              key={item.name}
              className={`nav-item${item.active ? " active" : ""}`}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.starred && <Star className="star" />}
            </button>
          ))}
        </div>
      ))}

      <button className="collapse" aria-label="Collapse sidebar">
        <Collapse />
      </button>

      <div className="sidebar-spacer" />

      <div className="get-started">
        <div className="get-started-head">
          <Rocket />
          <span>Get started</span>
          <span className="count">
            {getStarted.done}/{getStarted.total}
          </span>
          <span style={{ display: "flex", transform: "rotate(180deg)" }}>
            <ChevronDown size={13} />
          </span>
        </div>
        {getStarted.steps.map((step) => (
          <div
            key={step.title}
            className={`step${step.complete ? " complete" : ""}`}
          >
            {step.complete ? (
              <CheckCircle className="check" />
            ) : (
              <EmptyCircle className="check" />
            )}
            <div>
              <div className="step-title">{step.title}</div>
              {step.note && <div className="step-note">{step.note}</div>}
            </div>
          </div>
        ))}
      </div>

      <button className="footer-item">
        <span className="avatar">IG</span>
      </button>
      <button className="footer-item">
        <Bell />
      </button>
      <button className="footer-item">
        <Upgrade className="upgrade-icon" />
        <span>Upgrade</span>
        <span className="badge">29 DAYS</span>
      </button>
      <button className="footer-item">
        <Send />
        <span>Download apps</span>
      </button>
      <button className="footer-item">
        <Help />
        <span>Admin settings</span>
      </button>
    </aside>
  );
}
