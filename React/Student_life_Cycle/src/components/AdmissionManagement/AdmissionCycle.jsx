import { PageHeading } from "./shared";

export default function AdmissionCycle({
  cycles,
  setCycles,
  onToast,
  addAudit,
}) {
  const createCycle = () => {
    const year = 2026 + cycles.length - 1;
    const name = `AY ${year}-${String((year + 1) % 100).padStart(2, "0")}`;
    if (cycles.some((cycle) => cycle.name === name)) {
      onToast("That admission cycle already exists.");
      return;
    }
    setCycles([
      ...cycles,
      {
        name,
        applications: 0,
        seats: 500,
        status: "Draft",
        deadline: "Not set",
      },
    ]);
    addAudit(`created ${name} admission cycle`);
    onToast(`${name} draft is ready to configure.`);
  };

  return (
    <>
      <PageHeading
        title="Admission Cycles"
        subtitle="Manage yearly intakes, application windows, and seat capacity."
        actions={
          <button className="button button-primary" onClick={createCycle}>
            ＋ Create cycle
          </button>
        }
      />
      <div className="cycle-cards">
        {cycles.map((cycle) => (
          <article className="panel cycle-card" key={cycle.name}>
            <div className="cycle-card-top">
              <span className="cycle-pill">{cycle.status}</span>
              <button
                className="button"
                onClick={() => onToast(`Opening ${cycle.name} settings.`)}
              >
                Manage cycle
              </button>
            </div>
            <h2>{cycle.name}</h2>
            <p>
              {cycle.status === "Active"
                ? "Applications are being reviewed"
                : "Configure dates and eligibility before opening"}
            </p>
            <div className="cycle-metrics">
              <div>
                <small>APPLICATIONS</small>
                <b>{cycle.applications.toLocaleString()}</b>
              </div>
              <div>
                <small>SEAT CAPACITY</small>
                <b>{cycle.seats}</b>
              </div>
              <div>
                <small>DEADLINE</small>
                <b>{cycle.deadline}</b>
              </div>
            </div>
          </article>
        ))}
      </div>
      <article className="panel padded">
        <h2 className="section-title">Cycle setup checklist</h2>
        <div className="setup-checks">
          <span>✓ Define eligibility rules</span>
          <span>✓ Set seat capacity</span>
          <span>○ Choose application dates</span>
          <span>○ Publish applicant form</span>
        </div>
      </article>
    </>
  );
}
