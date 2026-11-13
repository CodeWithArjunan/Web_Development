import {
  Field,
  FormCard,
  SectionTitle,
  SelectField,
  StudentLayout,
} from "./StudentShared";

export default function PersonalInformation({
  data,
  onChange,
  onSave,
  onNavigate,
  onHome,
}) {
  const update = (key, value) => {
    onChange(key, value);
    if (key === "permanentAddress" && data.sameAddress)
      onChange("temporaryAddress", value);
  };
  const toggleSameAddress = (checked) => {
    onChange("sameAddress", checked);
    if (checked) onChange("temporaryAddress", data.permanentAddress || "");
  };
  return (
    <StudentLayout
      activeStep="PersonalInformation"
      onNavigate={onNavigate}
      onHome={onHome}
    >
      <FormCard
        step="01"
        title="Personal Information"
        description="Enter your details as they appear on your official documents."
        onSave={onSave}
        onNext={() => onNavigate("ParentInformation")}
        nextLabel="Next: Parent Information"
      >
        <SectionTitle
          number="01"
          title="Applicant details"
          note="Please use your legal name and a phone number you can access."
        />
        <div className="form-grid two-columns">
          <Field
            label="Full name"
            name="fullName"
            value={data.fullName}
            onChange={update}
            placeholder="Surname, first name, middle name"
            required
          />
          <Field
            label="Email address"
            name="emailAddress"
            type="email"
            value={data.emailAddress}
            onChange={update}
            placeholder="applicant@example.com"
            required
          />
          <Field
            label="Phone number"
            name="phoneNumber"
            type="tel"
            value={data.phoneNumber}
            onChange={update}
            placeholder="10 digit mobile number"
            required
          />
          <Field
            label="Date of birth"
            name="dob"
            type="date"
            value={data.dob}
            onChange={update}
            required
          />
          <Field
            label="Applicant photo"
            name="photoName"
            value={data.photoName}
            onChange={update}
            type="file"
            accept="image/*"
            hint={
              data.photoName
                ? `Selected: ${data.photoName}`
                : "Choose a recent passport-style photo."
            }
          />
          <SelectField
            label="Gender"
            name="gender"
            value={data.gender}
            onChange={update}
            options={["Female", "Male", "Prefer not to say"]}
            required
          />
          <Field
            label="Aadhaar number"
            name="aadhaarNumber"
            value={data.aadhaarNumber}
            onChange={update}
            placeholder="XXXX XXXX XXXX"
            maxLength={14}
            hint="Your information stays in this browser prototype."
          />
          <SelectField
            label="Community"
            name="community"
            value={data.community}
            onChange={update}
            options={["General", "BC", "MBC", "SC", "ST", "Other"]}
          />
        </div>
        <SectionTitle number="02" title="Address" />
        <div className="form-grid">
          <Field
            label="Permanent address"
            name="permanentAddress"
            value={data.permanentAddress}
            onChange={update}
            placeholder="Door number, street, town, district, state, PIN code"
            required
          />
        </div>
        <label className="check-field address-check">
          <input
            type="checkbox"
            checked={Boolean(data.sameAddress)}
            onChange={(event) => toggleSameAddress(event.target.checked)}
          />
          <span>My current address is the same as my permanent address</span>
        </label>
        {!data.sameAddress && (
          <div className="form-grid">
            <Field
              label="Current address"
              name="temporaryAddress"
              value={data.temporaryAddress}
              onChange={update}
              placeholder="Enter your current address"
            />
          </div>
        )}
      </FormCard>
    </StudentLayout>
  );
}
