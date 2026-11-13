import { useState } from "react";

const cycleOptions = ["AY 2025-26", "AY 2024-25", "AY 2023-24"];
const navigation = [
  ["Dashboard", "▦"],
  ["Admission Cycles", "▤"],
  ["Applications", "▣"],
  ["Document Verification", "☑"],
  ["Staff Review", "▧"],
  ["Shortlisted Applicants", "♙"],
  ["Final Approvals", "◇"],
  ["Admission History", "◴"],
  ["Audit Logs", "▤"],
  ["Settings", "⚙"],
];

export function AdminHeader({
  cycle,
  setCycle,
  query,
  setQuery,
  onNewCycle,
  go,
  profile,
  audit,
  cycles,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <header className="topbar">
      <button
        className="brand"
        onClick={() => go("Dashboard")}
        aria-label="Go to dashboard"
      >
        <span className="brand-mark">M</span>
        <span>
          <b>Maatram SLM</b>
          <small>MA26-05 Portal</small>
        </span>
      </button>
      <label className="top-search">
        <span>⌕</span>
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) go("Applications");
          }}
          placeholder="Search applicants, cycle, documents…"
        />
        <kbd>Ctrl K</kbd>
      </label>
      <select
        className="cycle-select"
        value={cycle}
        onChange={(event) => setCycle(event.target.value)}
        aria-label="Select admission cycle"
      >
        {[
          ...new Set([...cycleOptions, ...cycles.map((item) => item.name)]),
        ].map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <button className="button button-primary new-cycle" onClick={onNewCycle}>
        ＋ New Cycle
      </button>
      <div className="notification-wrap">
        <button
          className="bell"
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Notifications"
        >
          ♧<i>{audit.length}</i>
        </button>
        {showNotifications && (
          <div className="notification-popover">
            <b>Recent activity</b>
            {audit.slice(0, 3).map((entry, index) => (
              <p key={`${entry.actor}-${index}`}>
                <strong>{entry.actor}</strong> {entry.action}
                <small>{entry.time}</small>
              </p>
            ))}
            <button
              className="text-link"
              onClick={() => {
                go("Audit Logs");
                setShowNotifications(false);
              }}
            >
              Open audit log →
            </button>
          </div>
        )}
      </div>
      <button className="user" onClick={() => go("My Profile")}>
        <b>{profile.name}</b>
        <small>Chief Admissions Admin</small>
      </button>
      <button
        className="avatar admin-avatar"
        onClick={() => go("My Profile")}
        aria-label="Open profile"
      >
        {profile.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </button>
    </header>
  );
}

export function AdminSidebar({ active, go, onHome }) {
  return (
    <aside className="sidebar">
      <div className="side-label">OPERATIONS</div>
      <nav>
        {navigation.map(([name, icon]) => (
          <button
            key={name}
            onClick={() => go(name)}
            className={`nav-item ${active === name ? "active" : ""}`}
          >
            <span className="icon">{icon}</span>
            {name}
          </button>
        ))}
      </nav>
      <div className="side-bottom">
        <span>VER MA26-05</span>
        <small>System Admin</small>
        <button onClick={() => go("Settings")}>ⓘ Quick Help & Docs</button>
        <button onClick={onHome}>← Maatram home</button>
      </div>
    </aside>
  );
}
