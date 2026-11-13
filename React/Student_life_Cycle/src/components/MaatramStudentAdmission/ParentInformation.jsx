import {
  Field,
  FormCard,
  SectionTitle,
  SelectField,
  StudentLayout,
} from "./StudentShared";

const parentTypes = ["Both parents", "Single parent", "Legal guardian"];
const genders = ["Female", "Male", "Prefer not to say"];
const occupations = [
  "Employed",
  "Daily wage",
  "Self-employed",
  "Homemaker",
  "Retired",
  "Not currently working",
  "Other",
];

export default function ParentInformation({
  data,
  onChange,
  onSave,
  onNavigate,
  onHome,
}) {
  const parentType = data.parentStatus || parentTypes[0];
  return (
    <StudentLayout
      activeStep="ParentInformation"
      onNavigate={onNavigate}
      onHome={onHome}
    >
      <FormCard
        step="02"
        title="Parent Information"
        description="Tell us about the adults who support your family. Income details help assess scholarship eligibility."
        onSave={onSave}
        onPrevious={() => onNavigate("PersonalInformation")}
        previousLabel="Previous: Personal Info"
        onNext={() => onNavigate("SiblingInformation")}
        nextLabel="Next: Siblings Info"
      >
        <SectionTitle
          number="01"
          title="Family support"
          note="Choose the option that best describes your household."
        />
        <SelectField
          label="Parent or guardian situation"
          name="parentStatus"
          value={parentType}
          onChange={onChange}
          options={parentTypes}
          required
        />
        {parentType === "Both parents" && (
          <div className="form-grid two-columns">
            <Field
              label="Father or parent 1 full name"
              name="fatherName"
              value={data.fatherName}
              onChange={onChange}
              placeholder="Enter full legal name"
              required
            />
            <SelectField
              label="Parent 1 gender"
              name="fatherGender"
              value={data.fatherGender}
              onChange={onChange}
              options={genders}
            />
            <SelectField
              label="Parent 1 occupation"
              name="fatherOccupation"
              value={data.fatherOccupation}
              onChange={onChange}
              options={occupations}
            />
            <Field
              label="Parent 1 annual income (₹)"
              name="fatherIncome"
              type="number"
              min="0"
              value={data.fatherIncome}
              onChange={onChange}
              placeholder="Annual income"
            />
            <Field
              label="Mother or parent 2 full name"
              name="motherName"
              value={data.motherName}
              onChange={onChange}
              placeholder="Enter full legal name"
              required
            />
            <SelectField
              label="Parent 2 gender"
              name="motherGender"
              value={data.motherGender}
              onChange={onChange}
              options={genders}
            />
            <SelectField
              label="Parent 2 occupation"
              name="motherOccupation"
              value={data.motherOccupation}
              onChange={onChange}
              options={occupations}
            />
            <Field
              label="Parent 2 annual income (₹)"
              name="motherIncome"
              type="number"
              min="0"
              value={data.motherIncome}
              onChange={onChange}
              placeholder="Annual income"
            />
          </div>
        )}
        {parentType === "Single parent" && (
          <div className="form-grid two-columns">
            <Field
              label="Parent relationship"
              name="singleRelationship"
              value={data.singleRelationship}
              onChange={onChange}
              placeholder="Mother, father, or other"
              required
            />
            <Field
              label="Parent full name"
              name="singleName"
              value={data.singleName}
              onChange={onChange}
              placeholder="Enter full legal name"
              required
            />
            <SelectField
              label="Occupation"
              name="singleOccupation"
              value={data.singleOccupation}
              onChange={onChange}
              options={occupations}
            />
            <Field
              label="Annual income (₹)"
              name="singleIncome"
              type="number"
              min="0"
              value={data.singleIncome}
              onChange={onChange}
              placeholder="Annual income"
            />
          </div>
        )}
        {parentType === "Legal guardian" && (
          <div className="form-grid two-columns">
            <Field
              label="Guardian relationship"
              name="guardianRelationship"
              value={data.guardianRelationship}
              onChange={onChange}
              placeholder="Relationship to applicant"
              required
            />
            <Field
              label="Guardian full name"
              name="guardianName"
              value={data.guardianName}
              onChange={onChange}
              placeholder="Enter full legal name"
              required
            />
            <SelectField
              label="Occupation"
              name="guardianOccupation"
              value={data.guardianOccupation}
              onChange={onChange}
              options={occupations}
            />
            <Field
              label="Annual income (₹)"
              name="guardianIncome"
              type="number"
              min="0"
              value={data.guardianIncome}
              onChange={onChange}
              placeholder="Annual income"
            />
          </div>
        )}
        <div className="notice-box">
          <b>Privacy note</b>
          <span>
            Family information is used only for application assessment in this
            synthetic demo.
          </span>
        </div>
      </FormCard>
    </StudentLayout>
  );
}
