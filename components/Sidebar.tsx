import Link from "next/link";
import {
  Approvals,
  Bell,
  ChevronDown,
  Clock,
  Collapse,
  Doc,
  Download,
  Folder,
  Help,
  Members,
  Power,
  Send,
  Settings,
  Star,
  Tasks,
  TimeOff,
  Timeline,
  Upgrade,
} from "./Icons";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  starred?: boolean;
};

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Track",
    items: [{ name: "Timer", href: "/timer", icon: <Clock /> }],
  },
  {
    label: "Analyze",
    items: [{ name: "Reports", href: "/reports", icon: <Doc /> }],
  },
  {
    label: "Plan",
    items: [
      { name: "Projects", href: "/", icon: <Folder /> },
      { name: "Tasks", href: "/tasks", icon: <Tasks /> },
      { name: "Timeline", href: "/timeline", icon: <Timeline />, starred: true },
    ],
  },
  {
    label: "Manage",
    items: [
      { name: "Members", href: "/members", icon: <Members /> },
      { name: "Approvals", href: "/approvals", icon: <Approvals />, starred: true },
      { name: "Time off", href: "/time-off", icon: <TimeOff />, starred: true },
    ],
  },
];

/**
 * The sidebar is two columns on one black panel: a 48px icon rail and a
 * 200px nav. The collapse toggle lives in the rail but is rendered inside the
 * nav flow and shifted left, so it always sits directly under the last nav item.
 */
export default function Sidebar({ active }: { active: string }) {
  return (
    <div className="side">
      <div className="rail">
        <span className="mark" aria-hidden>
          <Power size={24} />
        </span>

        <div className="rail-spacer" />

        <button className="rail-btn" aria-label="Account">
          <span className="avatar">IG</span>
        </button>
        <button className="rail-btn" aria-label="Notifications">
          <Bell />
        </button>
        <button className="rail-btn" aria-label="Share feedback">
          <Send />
        </button>
        <button className="rail-btn" aria-label="Help">
          <Help />
        </button>
      </div>

      <nav className="nav">
        <div className="org">
          <div className="org-name">Ignacio&apos;s organization</div>
          <ChevronDown size={16} />
        </div>

        <div className="ask">
          <span>Ask Toggl ⏎</span>
          <kbd>Ctrl K</kbd>
        </div>

        {navSections.map((section) => (
          <div key={section.label}>
            <h6 className="nav-label">{section.label}</h6>
            {section.items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item${
                  item.name.toLowerCase() === active ? " active" : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.starred && <Star size={12} className="star" />}
              </Link>
            ))}
          </div>
        ))}

        <button className="collapse" aria-label="Toggle sidebar">
          <Collapse />
        </button>

        <div className="nav-spacer" />

        <button className="footer-item">
          <Upgrade className="upgrade-icon" />
          <span className="upgrade-text">Upgrade</span>
          <span className="badge">29 DAYS</span>
        </button>
        <button className="footer-item">
          <Download />
          <span>Download apps</span>
        </button>
        <button className="footer-item">
          <Settings />
          <span>Admin settings</span>
        </button>
      </nav>
    </div>
  );
}
