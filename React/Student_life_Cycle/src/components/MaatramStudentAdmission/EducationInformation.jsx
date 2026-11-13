import { Field, FormCard, SectionTitle, StudentLayout } from "./StudentShared";

const subjectRows = [
  ["Tamil", "tamil"],
  ["English", "english"],
  ["Physics", "physics"],
  ["Chemistry", "chemistry"],
  ["Mathematics", "mathematics"],
];

export default function EducationInformation({
  data,
  onChange,
  onSave,
  onNavigate,
  onHome,
}) {
  const marks = data.subjectMarks || {};
  const updateMark = (key, value) =>
    onChange("subjectMarks", { ...marks, [key]: value });
  const physics = Number(marks.physics) || 0;
  const chemistry = Number(marks.chemistry) || 0;
  const mathematics = Number(marks.mathematics) || 0;
  const cutoff = (mathematics + (physics + chemistry) / 2).toFixed(1);
  return (
    <StudentLayout
      activeStep="EducationInformation"
      onNavigate={onNavigate}
      onHome={onHome}
    >
      <FormCard
        step="04"
        title="Educational Information"
        description="Provide your school history and board examination marks. Check your entries against your marksheets."
        onSave={onSave}
        saveLabel="Save Draft Progress"
        onPrevious={() => onNavigate("SiblingInformation")}
        previousLabel="Previous: Siblings Info"
        onNext={() => onNavigate("ReviewSubmission")}
        nextLabel="Proceed to Review & Submission"
      >
        <SectionTitle number="01" title="Secondary school (10th standard)" />
        <div className="form-grid two-columns">
          <Field
            label="School name and district"
            name="sslcSchool"
            value={data.sslcSchool}
            onChange={onChange}
            placeholder="School name, district"
            required
          />
          <Field
            label="Registration number"
            name="sslcRollNumber"
            value={data.sslcRollNumber}
            onChange={onChange}
            placeholder="Board examination number"
          />
          <Field
            label="Marks obtained"
            name="sslcMarks"
            type="number"
            min="0"
            max="500"
            value={data.sslcMarks}
            onChange={onChange}
            placeholder="Marks"
            required
          />
          <Field
            label="Maximum marks"
            name="sslcMaxMarks"
            type="number"
            min="1"
            value={data.sslcMaxMarks || "500"}
            onChange={onChange}
            placeholder="500"
            required
          />
        </div>
        <SectionTitle
          number="02"
          title="Higher secondary (12th standard)"
          note="Enter subject scores from your provisional marksheet."
        />
        <div className="form-grid two-columns">
          <Field
            label="School name and district"
            name="hscSchool"
            value={data.hscSchool}
            onChange={onChange}
            placeholder="School name, district"
            required
          />
          <Field
            label="Registration number"
            name="hscRollNumber"
            value={data.hscRollNumber}
            onChange={onChange}
            placeholder="Board examination number"
          />
        </div>
        <div className="marks-table">
          <div className="marks-table-head">
            <b>SUBJECT</b>
            <b>MARKS (0–100)</b>
          </div>
          {subjectRows.map(([label, key]) => (
            <label className="mark-row" key={key}>
              <span>{label}</span>
              <input
                type="number"
                min="0"
                max="100"
                value={marks[key] ?? ""}
                onChange={(event) => updateMark(key, event.target.value)}
                aria-label={`${label} marks`}
              />
            </label>
          ))}
        </div>
        <div className="cutoff-summary">
          <span>Calculated engineering cutoff</span>
          <b>{cutoff} / 200</b>
          <small>Mathematics + (Physics + Chemistry) ÷ 2</small>
        </div>
        <SectionTitle number="03" title="First generation graduate" />
        <div className="radio-options">
          {["Yes", "No", "Not sure"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="firstGeneration"
                checked={data.firstGeneration === option}
                onChange={() => onChange("firstGeneration", option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className="check-field declaration">
          <input
            type="checkbox"
            required
            checked={Boolean(data.educationDeclaration)}
            onChange={(event) =>
              onChange("educationDeclaration", event.target.checked)
            }
          />
          <span>I confirm the education details above match my documents.</span>
        </label>
      </FormCard>
    </StudentLayout>
  );
}
