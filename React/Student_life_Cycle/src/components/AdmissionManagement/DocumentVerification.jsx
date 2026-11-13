import { useState } from "react";
import { documentNames } from "../../adminData";
import { PageHeading } from "./shared";
import { createPendingApplicationStages } from "../MaatramStudentAdmission/applicationStatus";

export default function DocumentVerification({
  applicants,
  setApplicants,
  selectedId,
  setSelectedId,
  addAudit,
  onToast,
}) {
  const applicant =
    applicants.find((item) => item.id === selectedId) || applicants[0];
  const [documentIndex, setDocumentIndex] = useState(1);
  const [filter, setFilter] = useState("All");
  const [remarks, setRemarks] = useState(
    "Marks verified against the synthetic merit record. Please confirm details before final approval.",
  );
  const selectedDocument = documentNames[documentIndex];
  const documentStatus = applicant.docs[documentIndex];
  const documentInfo = [
    "Score: 488/500 (97.6%)",
    "Cutoff: 194.5 / 200",
    "Income: ₹72,000 / annum",
    "Category: BC Community",
    "Annexure VIII submitted",
    "Identity match confirmed",
    "Page 2 is unreadable",
  ][documentIndex];
  const moveApplicant = (direction) => {
    const index = applicants.findIndex((item) => item.id === applicant.id);
    const next =
      applicants[(index + direction + applicants.length) % applicants.length];
    setSelectedId(next.id);
    setDocumentIndex(1);
    setRemarks(`Review notes for ${next.name}.`);
  };
  const updateDocument = (nextStatus) => {
    const nextApplicants = applicants.map((item) => {
      if (item.id !== applicant.id) return item;
      const docs = [...item.docs];
      docs[documentIndex] = nextStatus;
      return {
        ...item,
        docs,
        statusStages: {
          ...createPendingApplicationStages(),
          ...item.statusStages,
          documentVerification:
            nextStatus === "Needs correction"
              ? "Rejected"
              : nextStatus === "Resubmission requested"
                ? "Pending"
                : docs.every((value) => value === "Verified")
                  ? "Completed"
                  : item.statusStages?.documentVerification || "Pending",
        },
        verification: docs.every((value) => value === "Verified")
          ? "Verified"
          : "Action needed",
      };
    });
    setApplicants(nextApplicants);
    addAudit(
      `${nextStatus.toLowerCase()} ${selectedDocument} for ${applicant.id}${remarks ? ` · ${remarks}` : ""}`,
    );
    onToast(`${selectedDocument}: ${nextStatus.toLowerCase()}.`);
  };
  const visibleDocs = documentNames
    .map((name, index) => ({ name, index, status: applicant.docs[index] }))
    .filter(
      (doc) =>
        filter === "All" ||
        (filter === "Action needed"
          ? doc.status !== "Verified"
          : doc.status === "Verified"),
    );
  const statusClass = (value) =>
    value === "Verified"
      ? "green"
      : value === "Under review"
        ? "blue"
        : value === "Resubmission requested" || value === "Needs correction"
          ? "pink"
          : "gold";
  return (
    <>
      <PageHeading
        title="Document Verification Scrutiny Desk"
        crumb="DOCUMENT VERIFICATION"
        subtitle={`${applicant.name} · ${applicant.id} · ${applicant.district}`}
      >
        <button className="button" onClick={() => moveApplicant(-1)}>
          ‹ Previous student
        </button>
        <button
          className="button button-primary"
          onClick={() => moveApplicant(1)}
        >
          Next student ›
        </button>
      </PageHeading>
      <div className="stepper">
        <span>✓ Registration</span>
        <i />
        <span>✓ Document upload</span>
        <i />
        <b>▣ Document verification</b>
        <i />
        <span>4 Staff review</span>
        <i />
        <span>5 Final approval</span>
      </div>
      <div className="document-layout">
        <section className="doc-list">
          <div className="panel doc-summary">
            <b>Document repository</b>
            <span>
              {applicant.docs.length} mandatory records ·{" "}
              {applicant.docs.filter((value) => value === "Verified").length}{" "}
              verified
            </span>
            <strong>
              {applicant.docs.filter((value) => value === "Verified").length} /
              7<small>VERIFIED</small>
            </strong>
          </div>
          <div className="doc-tabs">
            {["All", "Action needed", "Approved"].map((tab) => (
              <button
                key={tab}
                className={filter === tab ? "selected" : ""}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {visibleDocs.map((doc) => (
            <button
              className={`panel doc-card ${doc.index === documentIndex ? "selected-doc" : ""}`}
              key={doc.name}
              onClick={() => setDocumentIndex(doc.index)}
            >
              <span className="doc-card-head">
                <b>▤ &nbsp;{doc.name}</b>
                <span className={`status ${statusClass(doc.status)}`}>
                  ● {doc.status}
                </span>
              </span>
              <span className="doc-description">
                {
                  [
                    "Score: 488/500 (97.6%)",
                    "Cutoff: 194.5 / 200",
                    "Income: ₹72,000 / annum",
                    "Category: BC Community",
                    "Annexure VIII submitted",
                    "Identity match confirmed",
                    "Page 2 is unreadable",
                  ][doc.index]
                }
              </span>
            </button>
          ))}
        </section>
        <section className="doc-workspace">
          <div className="panel preview-head">
            <div>
              <b>
                ▣ &nbsp;{selectedDocument.replaceAll(" ", "_")}_
                {applicant.initials}.pdf
              </b>
              <small>
                Sample preview · synthetic applicant document · {documentStatus}
              </small>
            </div>
            <div>
              <button onClick={() => onToast("Preview zoomed in.")}>＋</button>
              <button onClick={() => onToast("Preview zoomed out.")}>−</button>
              <button onClick={() => onToast("Preview refreshed.")}>⟳</button>
              <button onClick={() => onToast("Preview download is simulated.")}>
                ⇩
              </button>
            </div>
          </div>
          <div className="pdf-preview">
            <div className="paper">
              <div className="paper-seal">♜</div>
              <h3>MAATRAM COMMUNITY</h3>
              <p>STUDENT SUPPORT PROGRAM · ADMISSIONS OFFICE</p>
              <h4>{selectedDocument.toUpperCase()}</h4>
              <p>AY 2025-26 · Synthetic sample record</p>
              <div className="paper-meta">
                <span>
                  APPLICANT
                  <br />
                  <b>{applicant.name.toUpperCase()}</b>
                </span>
                <span>
                  APPLICATION ID
                  <br />
                  <b>{applicant.id}</b>
                </span>
                <span>
                  DISTRICT
                  <br />
                  <b>{applicant.district}</b>
                </span>
              </div>
              <div className="sample-document">
                <b>{documentInfo}</b>
                <p>
                  This is a preview placeholder for a synthetic applicant
                  document. No real student information is shown.
                </p>
                <span>Document state: {documentStatus}</span>
              </div>
              <div className="paper-footer">
                <b>▦</b>
                <span>
                  DEMO RECORD
                  <br />
                  LOCAL PREVIEW
                </span>
                <i>
                  Verification workspace
                  <br />
                  Maatram SLM
                </i>
              </div>
            </div>
          </div>
          <div className="panel checklist">
            <div className="panel-heading">
              <h2>✓ Verification checklist</h2>
              <small>Record the review before approval</small>
            </div>
            <div className="checks">
              {[
                "Applicant name matches",
                "Document is readable",
                "Required details are present",
              ].map((item) => (
                <label key={item}>
                  <input type="checkbox" />
                  <span>
                    <b>{item}</b>
                    <small>Check against the application record</small>
                  </span>
                </label>
              ))}
            </div>
            <label className="remarks">
              Reviewer note
              <textarea
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
              />
            </label>
            <div className="doc-actions">
              <button
                className="button"
                onClick={() => updateDocument("Resubmission requested")}
              >
                ↻ Request correction
              </button>
              <button
                className="button danger"
                onClick={() => updateDocument("Needs correction")}
              >
                × Reject document
              </button>
              <button
                className="button button-primary"
                onClick={() => updateDocument("Verified")}
              >
                ✓ Verify & approve
              </button>
              <button
                className="button"
                onClick={() => {
                  updateDocument("Verified");
                  setDocumentIndex((documentIndex + 1) % documentNames.length);
                }}
              >
                Save & next →
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
