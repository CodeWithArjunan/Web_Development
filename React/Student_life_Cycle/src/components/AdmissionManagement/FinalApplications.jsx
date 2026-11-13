import { PageHeading, Table } from "./shared";
import {
  createPendingApplicationStages,
} from "../MaatramStudentAdmission/applicationStatus";

export default function FinalApplications({
  applicants,
  setApplicants,
  addAudit,
  onToast,
}) {
  const approve = (applicant, status) => {
    setApplicants(
      applicants.map((item) =>
        item.id === applicant.id
          ? {
              ...item,
              status,
              statusStages: {
                ...createPendingApplicationStages(),
                ...item.statusStages,
                finalStatus: status === "Approved" ? "Completed" : "Rejected",
              },
            }
          : item,
      ),
    );
    addAudit(
      `${status.toLowerCase()} final admission decision for ${applicant.id}`,
    );
    onToast(`${applicant.name} marked ${status.toLowerCase()}.`);
  };
  const candidates = applicants.filter(
    (applicant) => applicant.status === "Shortlisted",
  );
  return (
    <>
      <PageHeading
        title="Final Approvals"
        subtitle="Record the final admission decision. Each change is added to the audit feed."
      />
      <div className="approval-note">
        Review the applicant's documents and score before recording a final
        decision.
      </div>
      <Table
        headers={[
          "APPLICATION",
          "APPLICANT",
          "PROGRAM",
          "SCORE",
          "DOCUMENTS",
          "DECISION",
        ]}
      >
        {candidates.map((applicant) => (
          <tr key={applicant.id}>
            <td>
              <b className="id-text">{applicant.id}</b>
            </td>
            <td>
              {applicant.name}
              <small>{applicant.district}</small>
            </td>
            <td>{applicant.course}</td>
            <td>{applicant.score}/600</td>
            <td>{applicant.verification}</td>
            <td>
              <div className="row-actions">
                <button
                  className="button button-primary"
                  onClick={() => approve(applicant, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="button danger"
                  onClick={() => approve(applicant, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        ))}
        {candidates.length === 0 && (
          <tr>
            <td colSpan="6" className="empty-cell">
              There are no applicants waiting for final approval.
            </td>
          </tr>
        )}
      </Table>
    </>
  );
}
