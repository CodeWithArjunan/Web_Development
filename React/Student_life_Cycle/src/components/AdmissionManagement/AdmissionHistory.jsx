import { useState } from "react";
import { PageHeading, Table } from "./shared";

export default function AdmissionHistory({ applicants }) {
  const [query, setQuery] = useState("");
  const decided = applicants.filter((applicant) => {
    const isFinal = ["Approved", "Rejected"].includes(applicant.status);
    const matches = `${applicant.id} ${applicant.name} ${applicant.course}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return isFinal && matches;
  });
  return (
    <>
      <PageHeading
        title="Admission History"
        subtitle="Browse decisions across the current synthetic admissions dataset."
      />
      <div className="panel filters">
        <label className="search-field">
          ⌕{" "}
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by year, applicant, or course"
          />
        </label>
      </div>
      <Table
        headers={[
          "CYCLE",
          "APPLICATION",
          "APPLICANT",
          "PROGRAM",
          "FINAL STATUS",
          "SCORE",
        ]}
      >
        {decided.map((applicant) => (
          <tr key={applicant.id}>
            <td>{applicant.cycle}</td>
            <td>
              <b className="id-text">{applicant.id}</b>
            </td>
            <td>{applicant.name}</td>
            <td>{applicant.course}</td>
            <td>
              <span
                className={`status ${applicant.status === "Approved" ? "green" : "red"}`}
              >
                {applicant.status}
              </span>
            </td>
            <td>{applicant.score}/600</td>
          </tr>
        ))}
        {decided.length === 0 && (
          <tr>
            <td colSpan="6" className="empty-cell">
              No final decisions match this search yet.
            </td>
          </tr>
        )}
      </Table>
    </>
  );
}
