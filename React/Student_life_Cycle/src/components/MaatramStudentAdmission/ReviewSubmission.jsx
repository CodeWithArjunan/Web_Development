import { StudentLayout } from "./StudentShared";

export default function ReviewSubmission({
  data,
  onNavigate,
  onHome,
  onSave,
  onSubmit,
  submitted,
}) {
  const submitAndOpenDashboard = () => {
    if (onSubmit()) onNavigate("StudentDashboard");
  };

  return (
    <StudentLayout
      activeStep="ReviewSubmission"
      onNavigate={onNavigate}
      onHome={onHome}
    >
      <section className="student-card review-card">
        <div className="form-heading">
          <span className="form-kicker">APPLICATION · FINAL STEP</span>
          <h1>Review and Submission</h1>
          <p>
            Check your application details before submitting. You can return to
            any completed section to make changes.
          </p>
        </div>
        {submitted ? (
          <div className="submission-success">
            <span>✓</span>
            <h2>Application submitted</h2>
            <p>
              Your local demo application has been marked as submitted. Your
              reference number is shown below.
            </p>
            <b>{data.applicationId || "MTR-DEMO-0001"}</b>
            <button className="button button-primary" onClick={onHome}>
              Return to home
            </button>
          </div>
        ) : (
          <>
            <div className="review-section">
              <div>
                <h2>Personal information</h2>
                <button
                  className="text-button"
                  onClick={() => onNavigate("PersonalInformation")}
                >
                  Edit
                </button>
              </div>
              <dl>
                <dt>Full name</dt>
                <dd>{data.fullName || "Not provided"}</dd>
                <dt>Email</dt>
                <dd>{data.emailAddress || "Not provided"}</dd>
                <dt>Phone</dt>
                <dd>{data.phoneNumber || "Not provided"}</dd>
                <dt>Date of birth</dt>
                <dd>{data.dob || "Not provided"}</dd>
                <dt>Community</dt>
                <dd>{data.community || "Not provided"}</dd>
              </dl>
            </div>
            <div className="review-section">
              <div>
                <h2>Parent and sibling details</h2>
                <button
                  className="text-button"
                  onClick={() => onNavigate("ParentInformation")}
                >
                  Edit
                </button>
              </div>
              <p>
                {data.parentStatus || "Parent details not selected"} ·{" "}
                {(data.siblings || []).length} sibling records
              </p>
            </div>
            <div className="review-section">
              <div>
                <h2>Educational details</h2>
                <button
                  className="text-button"
                  onClick={() => onNavigate("EducationInformation")}
                >
                  Edit
                </button>
              </div>
              <p>
                {data.sslcSchool || "10th school not provided"} ·{" "}
                {data.hscSchool || "12th school not provided"}
              </p>
              <p>
                First generation graduate:{" "}
                {data.firstGeneration || "Not selected"}
              </p>
            </div>
            <div className="notice-box">
              <b>Before you submit</b>
              <span>
                This local prototype stores your application in this browser
                only. Do not enter real personal or identity information.
              </span>
            </div>
            <div className="form-actions">
              <button
                className="button button-outline"
                onClick={() => onNavigate("EducationInformation")}
              >
                ← Previous: Education
              </button>
              <div className="form-actions-right">
                <button className="button button-outline" onClick={onSave}>
                  Save Draft Progress
                </button>
                <button
                  className="button button-primary"
                  onClick={submitAndOpenDashboard}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </StudentLayout>
  );
}
