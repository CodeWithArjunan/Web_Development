import { PageHeading } from "./shared";

export default function AuditLogs({ audit }) {
  return (
    <>
      <PageHeading
        title="Audit Logs"
        subtitle="An activity trail of changes made in this prototype."
      />
      <article className="panel padded audit-page">
        {audit.map((entry, index) => (
          <div className="audit-entry" key={`${entry.actor}-${index}`}>
            <span className="audit-badge">{entry.actor.slice(0, 1)}</span>
            <div>
              <b>{entry.actor}</b>
              <p>{entry.action}</p>
              <small>
                {entry.time} · {entry.type}
              </small>
            </div>
          </div>
        ))}
      </article>
    </>
  );
}
