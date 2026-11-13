import { PageHeading, Table } from "./shared";

export default function StaffReview({
  applicants,
  setApplicants,
  addAudit,
  onToast,
}) {
  const assign = (id, reviewer) => {
    setApplicants(
      applicants.map((applicant) =>
        applicant.id === id ? { ...applicant, reviewer } : applicant,
      ),
    );
    addAudit(`assigned ${reviewer} to ${id}`);
    onToast(`Reviewer assigned to ${id}.`);
  };
  return (
    <>
      <PageHeading
        title="Staff Review"
        subtitle="Assign an admissions reviewer and track each open application."
      />
      <div className="mini-stats">
        {[
          [
            "OPEN REVIEWS",
            applicants.filter((a) => a.status === "Under review").length,
          ],
          [
            "UNASSIGNED",
            applicants.filter((a) => a.reviewer === "Unassigned").length,
          ],
          ["REVIEWERS", 3],
          ["SLA TARGET", "2 days"],
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
          "CURRENT REVIEWER",
          "ASSIGN REVIEWER",
        ]}
      >
        {applicants
          .filter(
            (a) => a.status === "Under review" || a.reviewer === "Unassigned",
          )
          .map((applicant) => (
            <tr key={applicant.id}>
              <td>
                <b className="id-text">{applicant.id}</b>
              </td>
              <td>
                {applicant.name}
                <small>{applicant.district}</small>
              </td>
              <td>{applicant.course}</td>
              <td>{applicant.reviewer}</td>
              <td>
                <select
                  className="inline-select"
                  value={applicant.reviewer}
                  onChange={(event) => assign(applicant.id, event.target.value)}
                >
                  <option>Unassigned</option>
                  <option>Kavitha R</option>
                  <option>Arun V</option>
                  <option>Meena S</option>
                </select>
              </td>
            </tr>
          ))}
      </Table>
    </>
  );
}
