import {
  Field,
  FormCard,
  SectionTitle,
  SelectField,
  StudentLayout,
} from "./StudentShared";

const emptySibling = () => ({
  name: "",
  relationship: "",
  education: "",
  occupation: "",
  institution: "",
});

export default function SiblingInformation({
  data,
  onChange,
  onSave,
  onNavigate,
  onHome,
}) {
  const siblings = data.siblings || [];
  const updateSibling = (index, key, value) => {
    onChange(
      "siblings",
      siblings.map((sibling, siblingIndex) =>
        siblingIndex === index ? { ...sibling, [key]: value } : sibling,
      ),
    );
  };
  const addSibling = () => {
    onChange("noSiblings", false);
    onChange("siblings", [...siblings, emptySibling()]);
  };
  const removeSibling = (index) =>
    onChange(
      "siblings",
      siblings.filter((_, siblingIndex) => siblingIndex !== index),
    );
  return (
    <StudentLayout
      activeStep="SiblingInformation"
      onNavigate={onNavigate}
      onHome={onHome}
    >
      <FormCard
        step="03"
        title="Sibling Information"
        description="Add details for brothers and sisters in your family. You can continue if you have none."
        onSave={onSave}
        onPrevious={() => onNavigate("ParentInformation")}
        previousLabel="Previous: Parent Info"
        onNext={() => onNavigate("EducationInformation")}
        nextLabel="Next: Educational Info"
        extraAction={
          <button
            type="button"
            className="button button-outline"
            onClick={addSibling}
          >
            ＋ Add sibling
          </button>
        }
      >
        <SectionTitle
          number="01"
          title="Household siblings"
          note={`${siblings.length} sibling record${siblings.length === 1 ? "" : "s"} added.`}
        />
        <label className="check-field sibling-none">
          <input
            type="checkbox"
            checked={Boolean(data.noSiblings)}
            onChange={(event) => {
              onChange("noSiblings", event.target.checked);
              if (event.target.checked) onChange("siblings", []);
            }}
          />
          <span>I do not have any siblings</span>
        </label>
        {!data.noSiblings &&
          siblings.map((sibling, index) => (
            <article className="sibling-card" key={index}>
              <div className="sibling-card-heading">
                <b>Sibling {index + 1}</b>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => removeSibling(index)}
                >
                  Remove
                </button>
              </div>
              <div className="form-grid two-columns">
                <Field
                  label="Full name"
                  name={`sibling-${index}-name`}
                  value={sibling.name}
                  onChange={(_, value) => updateSibling(index, "name", value)}
                  placeholder="Enter full name"
                />
                <SelectField
                  label="Relationship"
                  name={`sibling-${index}-relationship`}
                  value={sibling.relationship}
                  onChange={(_, value) =>
                    updateSibling(index, "relationship", value)
                  }
                  options={["Brother", "Sister"]}
                />
                <Field
                  label="Education or current status"
                  name={`sibling-${index}-education`}
                  value={sibling.education}
                  onChange={(_, value) =>
                    updateSibling(index, "education", value)
                  }
                  placeholder="e.g. College student, employed"
                />
                <Field
                  label="Occupation"
                  name={`sibling-${index}-occupation`}
                  value={sibling.occupation}
                  onChange={(_, value) =>
                    updateSibling(index, "occupation", value)
                  }
                  placeholder="If currently working"
                />
                <Field
                  label="School, college, or employer"
                  name={`sibling-${index}-institution`}
                  value={sibling.institution}
                  onChange={(_, value) =>
                    updateSibling(index, "institution", value)
                  }
                  placeholder="Organization name"
                />
              </div>
            </article>
          ))}
        {!data.noSiblings && siblings.length === 0 && (
          <button type="button" className="empty-add" onClick={addSibling}>
            <b>＋</b>
            <span>Add a sibling record</span>
            <small>Include siblings who are studying or working.</small>
          </button>
        )}
      </FormCard>
    </StudentLayout>
  );
}
