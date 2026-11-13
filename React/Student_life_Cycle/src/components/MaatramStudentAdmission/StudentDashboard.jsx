import { useState } from "react";
import {
  APPLICATION_STATUS_STAGES,
  normalizeApplicationStages,
} from "./applicationStatus";

const informationSections = [
  {
    title: "Personal Information",
    fields: [
      ["Full name", "fullName"],
      ["Email address", "emailAddress"],
      ["Phone number", "phoneNumber"],
      ["Date of birth", "dob"],
      ["Gender", "gender"],
      ["Community", "community"],
      ["Aadhaar number", "aadhaarNumber"],
      ["Applicant photo", "photoName"],
      ["Permanent address", "permanentAddress"],
      ["Current address", "temporaryAddress"],
      ["Current address same as permanent", "sameAddress"],
    ],
  },
  {
    title: "Parent Information",
    fields: [
      ["Household situation", "parentStatus"],
      ["Father / parent 1", "fatherName"],
      ["Parent 1 gender", "fatherGender"],
      ["Parent 1 occupation", "fatherOccupation"],
      ["Parent 1 annual income", "fatherIncome"],
      ["Mother / parent 2", "motherName"],
      ["Parent 2 gender", "motherGender"],
      ["Parent 2 occupation", "motherOccupation"],
      ["Parent 2 annual income", "motherIncome"],
      ["Single parent relationship", "singleRelationship"],
      ["Single parent / guardian", "singleName"],
      ["Single parent occupation", "singleOccupation"],
      ["Single parent annual income", "singleIncome"],
      ["Guardian relationship", "guardianRelationship"],
      ["Guardian name", "guardianName"],
      ["Guardian occupation", "guardianOccupation"],
      ["Guardian annual income", "guardianIncome"],
    ],
  },
  {
    title: "Educational Information",
    fields: [
      ["10th standard school", "sslcSchool"],
      ["10th registration number", "sslcRollNumber"],
      ["10th marks", "sslcMarks"],
      ["10th maximum marks", "sslcMaxMarks"],
      ["12th standard school", "hscSchool"],
      ["12th registration number", "hscRollNumber"],
      ["First generation graduate", "firstGeneration"],
      ["Education declaration", "educationDeclaration"],
    ],
  },
];

function displayValue(value) {
  if (value === undefined || value === null || value === "") return "Not provided";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function InformationSection({ title, fields, data }) {
  return (
    <section className="student-dashboard-section">
      <div className="student-dashboard-section-heading">
        <span aria-hidden="true">✳</span>
        <h2>{title}</h2>
      </div>
      <dl className="student-information-grid">
        {fields
          .filter(
            ([, key]) =>
              data[key] !== undefined &&
              data[key] !== null &&
              data[key] !== "",
          )
          .map(([label, key]) => (
          <div className="student-information-item" key={key}>
            <dt>{label}</dt>
            <dd>{displayValue(data[key])}</dd>
          </div>
          ))}
        {title === "Educational Information" &&
          Object.entries(data.subjectMarks || {}).map(([subject, marks]) => (
            <div className="student-information-item" key={`mark-${subject}`}>
              <dt>{subject} marks</dt>
              <dd>{displayValue(marks)}</dd>
            </div>
          ))}
      </dl>
    </section>
  );
}

export default function StudentDashboard({ data, applicant, onLogout }) {
  const [activeSection, setActiveSection] = useState("Student Information");
  const stages = normalizeApplicationStages(applicant?.statusStages);
  const siblings = Array.isArray(data.siblings) ? data.siblings : [];
  const submittedAt = data.submittedAt
    ? new Date(data.submittedAt).toLocaleDateString()
    : "Submitted";

  return (
    <div className="student-dashboard">
      <aside className="student-dashboard-sidebar">
        <button className="student-dashboard-brand" onClick={() => setActiveSection("Student Information")}>
          <span className="brand-mark">M</span>
          <span>
            <b>MAATRAM</b>
            <small>FOUNDATION</small>
          </span>
        </button>
        <div className="student-dashboard-identity">
          <span className="student-dashboard-avatar">
            {(data.fullName || "S").trim().charAt(0).toUpperCase()}
          </span>
          <span>
            <b>{data.fullName || "Student"}</b>
            <small>{data.applicationId || "Application"}</small>
          </span>
        </div>
        <nav className="student-dashboard-menu" aria-label="Student dashboard">
          {["Student Information", "Application Status"].map((item) => (
            <button
              key={item}
              className={`student-dashboard-menu-item ${activeSection === item ? "active" : ""}`}
              onClick={() => setActiveSection(item)}
              aria-current={activeSection === item ? "page" : undefined}
            >
              <span aria-hidden="true">{item === "Student Information" ? "▤" : "◷"}</span>
              {item}
            </button>
          ))}
        </nav>
        <button className="student-dashboard-logout" onClick={onLogout}>
          <span aria-hidden="true">↪</span> Logout
        </button>
      </aside>

      <main className="student-dashboard-main">
        <header className="student-dashboard-header">
          <div>
            <span className="form-kicker">STUDENT PORTAL · AY 2025–26</span>
            <h1>{activeSection}</h1>
            <p>
              {activeSection === "Student Information"
                ? "Your submitted application details, all in one place."
                : "Follow the progress of your admission application."}
            </p>
          </div>
          <span className="student-submission-badge">
            <i aria-hidden="true" /> Application submitted · {submittedAt}
          </span>
        </header>

        {activeSection === "Student Information" ? (
          <div className="student-dashboard-content">
            <div className="student-dashboard-summary">
              <div>
                <small>APPLICATION REFERENCE</small>
                <b>{data.applicationId || "—"}</b>
              </div>
              <div>
                <small>ADMISSION CYCLE</small>
                <b>{applicant?.cycle || "AY 2025–26"}</b>
              </div>
              <div>
                <small>APPLICATION STATUS</small>
                <b>{stages.finalStatus}</b>
              </div>
            </div>
            {informationSections.map((section) => (
              <InformationSection
                key={section.title}
                {...section}
                data={data}
              />
            ))}
            <section className="student-dashboard-section">
              <div className="student-dashboard-section-heading">
                <span aria-hidden="true">✳</span>
                <h2>Sibling Information</h2>
              </div>
              {siblings.length ? (
                <div className="student-sibling-list">
                  {siblings.map((sibling, index) => (
                    <dl key={`${sibling.name || "sibling"}-${index}`}>
                      <div><dt>Name</dt><dd>{displayValue(sibling.name)}</dd></div>
                      <div><dt>Relationship</dt><dd>{displayValue(sibling.relationship)}</dd></div>
                      <div><dt>Education</dt><dd>{displayValue(sibling.education)}</dd></div>
                      <div><dt>Occupation</dt><dd>{displayValue(sibling.occupation)}</dd></div>
                      <div><dt>Institution</dt><dd>{displayValue(sibling.institution)}</dd></div>
                    </dl>
                  ))}
                </div>
              ) : (
                <p className="student-dashboard-empty">
                  {data.noSiblings ? "No siblings declared." : "No sibling details were provided."}
                </p>
              )}
            </section>
          </div>
        ) : (
          <section className="student-dashboard-section student-status-panel">
            <div className="student-dashboard-section-heading">
              <span aria-hidden="true">◷</span>
              <div>
                <h2>Admission Progress</h2>
                <p>Status updates are shared by the admissions team.</p>
              </div>
            </div>
            <div className="student-stage-list">
              {APPLICATION_STATUS_STAGES.map((stage, index) => (
                <article className="student-stage" key={stage.key}>
                  <span className="student-stage-number">0{index + 1}</span>
                  <div className="student-stage-copy">
                    <b>{stage.label}</b>
                    <small>
                      {stage.key === "finalStatus" ? "Final admission decision" : "Admissions review stage"}
                    </small>
                  </div>
                  <span className={`student-stage-status ${stages[stage.key].toLowerCase()}`}>
                    {stages[stage.key]}
                  </span>
                </article>
              ))}
            </div>
            <p className="student-status-note">
              This page is read-only. Contact the admissions office if you have a question about a status.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
