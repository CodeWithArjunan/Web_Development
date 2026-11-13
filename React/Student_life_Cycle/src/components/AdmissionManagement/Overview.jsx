import { useState } from "react";
import { PageHeading } from "./shared";

function StatCard({ label, value, note, icon, color = "gold" }) {
  return (
    <article className={`stat-card ${color}`}>
      <div className="stat-head">
        {label}
        <b>{icon}</b>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

const chartData = {
  Weekly: {
    title: "Weekly volume trajectory",
    labels: [
      "W01 · Jan 15",
      "W04 · Feb 05",
      "W07 · Feb 26",
      "W11 · Deadline",
      "W14 · Apr 02",
      "W18 · May 05",
    ],
    path: "M0 180L100 156L190 120L280 105L365 75L440 18L505 57L570 43L630 27L680 12",
    benchmark:
      "M0 193L100 176L190 153L280 139L365 115L440 84L505 71L570 65L630 58L680 52",
  },
  Daily: {
    title: "Daily submissions · last 7 days",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    path: "M0 150L110 115L220 138L330 75L440 95L550 40L680 60",
    benchmark: "M0 183L110 169L220 158L330 143L440 129L550 116L680 100",
  },
  Cumulative: {
    title: "Cumulative applications received",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    path: "M0 200L136 175L272 142L408 102L544 50L680 12",
    benchmark: "M0 205L136 188L272 165L408 139L544 111L680 85",
  },
};

function TrendChart({ range, setRange }) {
  const data = chartData[range];
  return (
    <article className="panel trend-panel">
      <div className="panel-heading">
        <div>
          <h2>
            <i>⌁</i> Applications Received Over Time
          </h2>
          <p>{data.title} across the active cycle</p>
        </div>
        <div className="segmented">
          {Object.keys(chartData).map((key) => (
            <button
              key={key}
              className={range === key ? "selected" : ""}
              onClick={() => setRange(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-wrap">
        <div className="chart-y">
          <span>1.2k</span>
          <span>900</span>
          <span>600</span>
          <span>300</span>
          <span>0</span>
        </div>
        <div className="chart-main">
          <div className="gridline g1" />
          <div className="gridline g2" />
          <div className="gridline g3" />
          <div className="gridline g4" />
          <svg viewBox="0 0 680 220" preserveAspectRatio="none">
            <path
              d={`${data.path}L680 220L0 220Z`}
              fill="#FFD700"
              fillOpacity=".18"
            />
            <path d={data.path} fill="none" stroke="#FFD700" strokeWidth="3" />
            <path
              d={data.benchmark}
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />{" "}
          </svg>
          <div className="chart-x">
            {data.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="chart-legend">
        <span>
          <i className="line-orange" />
          AY 2025-26 (Active Intake)
        </span>
        <span>
          <i className="line-blue" />
          AY 2024-25 Benchmark
        </span>
        <small>
          Average daily throughput: <b>114 submissions</b>
        </small>
      </div>
    </article>
  );
}

export default function Overview({ applicants, cycle, go, onExport, audit }) {
  const [range, setRange] = useState("Weekly");
  const received = applicants.length.toLocaleString();
  const statusValues = [
    "Approved",
    "Under review",
    "Pending",
    "Shortlisted",
    "Rejected",
  ].map((status) => ({
    status,
    value: applicants.filter((applicant) => applicant.status === status).length,
  }));
  const approvedCount =
    statusValues.find((stage) => stage.status === "Approved")?.value || 0;
  const approvedArc = applicants.length
    ? (approvedCount / applicants.length) * 314
    : 0;
  const counts = [
    ["TOTAL RECEIVED", received, "+14.2% vs last cycle", "▱", "gold"],
    [
      "PENDING SCRUTINY",
      applicants.filter((a) => a.verification === "Action needed").length,
      "Needs document review",
      "◷",
      "orange",
    ],
    [
      "UNDER REVIEW",
      applicants.filter((a) => a.status === "Under review").length,
      "Staff evaluating",
      "▧",
      "blue",
    ],
    [
      "SHORTLISTED",
      applicants.filter((a) => a.status === "Shortlisted").length,
      "Interview pool ready",
      "♙",
      "gold",
    ],
    [
      "APPROVED SEATS",
      applicants.filter((a) => a.status === "Approved").length,
      "Of 500 seat target",
      "⬡",
      "blue",
    ],
    [
      "CUTOFF / REJECTED",
      applicants.filter((a) => a.status === "Rejected").length,
      "Final decisions",
      "⊗",
      "rose",
    ],
  ];
  return (
    <>
      <PageHeading
        title="Admission Management Overview"
        crumb="ADMISSION OVERVIEW"
        subtitle={`${cycle} · live synthetic application data`}
      >
        <button className="button" onClick={onExport}>
          ⇩ Export summary
        </button>
      </PageHeading>
      <section className="stats-grid">
        {counts.map(([label, value, note, icon, color]) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            note={note}
            icon={icon}
            color={color}
          />
        ))}
      </section>
      <section className="analytics-grid">
        <TrendChart range={range} setRange={setRange} />
        <article className="panel status-panel">
          <div className="panel-heading">
            <div>
              <h2>
                <i>◉</i> Status Distribution
              </h2>
              <p>Current applicant stages</p>
            </div>
          </div>
          <div className="donut-area">
            <div className="donut">
              <svg
                viewBox="0 0 140 140"
                aria-label={`${approvedCount} approved of ${applicants.length} applicants`}
              >
                <circle cx="70" cy="70" r="50" />
                <circle
                  className="donut-value"
                  cx="70"
                  cy="70"
                  r="50"
                  strokeDasharray={`${approvedArc} 314`}
                />
              </svg>
              <div>
                <b>{received}</b>
                <small>APPS FILED</small>
              </div>
            </div>{" "}
            <div className="legend">
              <span>
                Approved (
                {applicants.filter((a) => a.status === "Approved").length})
              </span>
              <span>
                Under review (
                {applicants.filter((a) => a.status === "Under review").length})
              </span>
              <span>
                Pending (
                {applicants.filter((a) => a.status === "Pending").length})
              </span>
              <span>
                Shortlisted (
                {applicants.filter((a) => a.status === "Shortlisted").length})
              </span>
              <span>
                Rejected (
                {applicants.filter((a) => a.status === "Rejected").length})
              </span>
            </div>
          </div>
        </article>
      </section>
      <section className="lower-grid">
        <div className="stack">
          <article className="panel padded">
            <div className="panel-heading">
              <h2>
                <i>▣</i> Pending Verification Queue
              </h2>
              <button
                className="text-link"
                onClick={() => go("Document Verification")}
              >
                View applicants →
              </button>
            </div>
            {applicants
              .filter((a) => a.verification === "Action needed")
              .slice(0, 4)
              .map((a) => (
                <div className="queue-row" key={a.id}>
                  <span className="initials">{a.initials}</span>
                  <div className="queue-info">
                    <b>
                      {a.name} <small>{a.id}</small>
                    </b>
                    <span>
                      <i>
                        {a.docs.find((doc) => doc !== "Verified") ||
                          "Review needed"}
                      </i>
                    </span>
                  </div>
                  <button
                    className="button button-primary"
                    onClick={() => go("Document Verification", a.id)}
                  >
                    Review
                  </button>
                </div>
              ))}
          </article>
          <article className="panel padded audit">
            <div className="panel-heading">
              <h2>
                <i>◷</i> Live Audit Log Feed
              </h2>
              <span>● Local activity</span>
            </div>
            {audit.slice(0, 4).map((entry, index) => (
              <div className="audit-row" key={`${entry.actor}-${index}`}>
                <i />
                <p>
                  <b>{entry.actor}</b> {entry.action}
                  <small>
                    {entry.time} · {entry.type}
                  </small>
                </p>
              </div>
            ))}
          </article>
        </div>
        <div className="stack">
          <article className="panel padded">
            <div className="panel-heading">
              <h2>
                <i>◉</i> Cycle Timeline & Intake Capacity
              </h2>
              <span className="remaining">48 days remaining</span>
            </div>
            <div className="capacity">
              <b>Scholarship seat intake</b>
              <strong>
                {applicants.filter((a) => a.status === "Approved").length} / 500
                seats
              </strong>
              <div className="progress">
                <i
                  style={{
                    width: `${Math.min(100, applicants.filter((a) => a.status === "Approved").length / 5)}%`,
                  }}
                />
              </div>
              <small>
                Seats allocated{" "}
                <b>
                  {Math.max(
                    0,
                    500 -
                      applicants.filter((a) => a.status === "Approved").length,
                  )}{" "}
                  available
                </b>{" "}
                Max cap: 500
              </small>
            </div>
            <small className="phase-label">PHASE PROGRESS ({cycle})</small>
            <div className="phases">
              {[
                ["✓", "Registration", "Closed", "done"],
                ["✓", "Doc Scrutiny", "In progress", "done"],
                ["◉", "Evaluation", "In progress", "current"],
                ["4", "Interviews", "Upcoming", ""],
                ["5", "Final Grants", "Upcoming", ""],
              ].map((phase) => (
                <div className={`phase ${phase[3]}`} key={phase[1]}>
                  <i>{phase[0]}</i>
                  <b>{phase[1]}</b>
                  <small>{phase[2]}</small>
                </div>
              ))}
            </div>
          </article>
          <article className="panel padded">
            <div className="panel-heading">
              <h2>
                <i>♧</i> Recent Submissions
              </h2>
              <button className="text-link" onClick={() => go("Applications")}>
                View all
              </button>
            </div>
            {applicants.slice(0, 4).map((a, index) => (
              <div className="recent-row" key={a.id}>
                <div className={`portrait portrait-${index}`}>{a.initials}</div>
                <div className="recent-name">
                  <b>{a.name}</b>
                  <small>⌖ {a.district}</small>
                </div>
                <div className="recent-score">
                  <b>{a.score}/600</b>
                  <small>HSC score</small>
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
