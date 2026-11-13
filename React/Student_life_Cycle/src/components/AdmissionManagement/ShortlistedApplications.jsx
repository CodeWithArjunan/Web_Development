import { PageHeading, Table } from "./shared";

export default function ShortlistedApplications({
  applicants,
  setApplicants,
  addAudit,
  onToast,
}) {
  const shortlist = applicants.filter(
    (applicant) => applicant.status === "Shortlisted",
  );
  const shortlistTopCandidates = () => {
    const next = applicants.map((applicant) =>
      applicant.score >= 580 && applicant.status !== "Approved"
        ? { ...applicant, status: "Shortlisted" }
        : applicant,
    );
    setApplicants(next);
    addAudit("shortlisted eligible applicants using the 580 point cut-off");
    onToast("Eligible applicants have been shortlisted.");
  };
  return (
    <>
      <PageHeading
        title="Shortlisted Applicants"
        subtitle="Review candidates selected for the next interview or evaluation round."
        actions={
          <button
            className="button button-primary"
            onClick={shortlistTopCandidates}
          >
            ✦ Shortlist eligible
          </button>
        }
      />
      <div className="mini-stats">
        {[
          ["SHORTLISTED", shortlist.length],
          ["INTERVIEW READY", shortlist.length],
          [
            "AVERAGE SCORE",
            shortlist.length
              ? Math.round(
                  shortlist.reduce((sum, a) => sum + a.score, 0) /
                    shortlist.length,
                )
              : "—",
          ],
          ["NEXT ROUND", "Interview"],
        ].map(([label, value]) => (
          <div key={label}>
            <small>{label}</small>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <Table
        headers={[
          "APPLICATION",
          "APPLICANT",
          "PROGRAM",
          "QUOTA",
          "SCORE",
          "NEXT STEP",
        ]}
      >
        {shortlist.map((applicant) => (
          <tr key={applicant.id}>
            <td>
              <b className="id-text">{applicant.id}</b>
            </td>
            <td>
              {applicant.name}
              <small>{applicant.district}</small>
            </td>
            <td>{applicant.course}</td>
            <td>{applicant.quota}</td>
            <td>
              <b>{applicant.score}/600</b>
            </td>
            <td>
              <button
                className="button"
                onClick={() =>
                  onToast(`Interview details opened for ${applicant.name}.`)
                }
              >
                Schedule interview
              </button>
            </td>
          </tr>
        ))}
        {shortlist.length === 0 && (
          <tr>
            <td colSpan="6" className="empty-cell">
              No applicants are shortlisted yet. Use “Shortlist eligible” to
              select qualified candidates.
            </td>
          </tr>
        )}
      </Table>
    </>
  );
}
