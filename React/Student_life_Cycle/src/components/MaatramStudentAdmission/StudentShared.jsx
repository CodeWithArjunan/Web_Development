import { applicationSteps } from "./steps";

export function StudentLayout({ activeStep, onNavigate, onHome, children }) {
  const currentIndex = applicationSteps.findIndex(
    (step) => step.id === activeStep,
  );
  return (
    <div className="student-app">
      <header className="student-header">
        <button className="student-brand" onClick={onHome}>
          <span className="brand-mark">M</span>
          <span>
            <b>MAATRAM FOUNDATION</b>
            <small>STUDENT ADMISSION PORTAL</small>
          </span>
        </button>
        <button className="button button-outline" onClick={onHome}>
          Return to home
        </button>
      </header>
      <div className="student-cycle">
        <span>AY 2025–26</span>
        <b>Foundation Scholarship Program</b>
        <small>
          Applications are free. Maatram never asks applicants for a fee.
        </small>
      </div>
      <main className="student-main">
        {activeStep !== "StudentLogin" && (
          <nav className="student-steps" aria-label="Application progress">
            {applicationSteps.slice(1).map((step, index) => {
              const stepIndex = index + 1;
              const isActive = stepIndex === currentIndex;
              const isComplete = stepIndex < currentIndex;
              return (
                <button
                  key={step.id}
                  className={`student-step ${isActive ? "active" : ""} ${isComplete ? "complete" : ""}`}
                  onClick={() => isComplete && onNavigate(step.id)}
                  disabled={!isComplete && !isActive}
                >
                  <span>{isComplete ? "✓" : `0${stepIndex}`}</span>
                  <b>{step.label}</b>
                </button>
              );
            })}
          </nav>
        )}
        {children}
      </main>
      <footer className="student-footer">
        © Maatram Foundation · Student support, mentorship, and higher education
      </footer>
    </div>
  );
}

export function FormCard({
  step,
  title,
  description,
  children,
  onSave,
  saveLabel = "Save Progress",
  onPrevious,
  previousLabel,
  onNext,
  nextLabel,
  extraAction,
}) {
  return (
    <section className="student-card">
      <div className="form-heading">
        <span className="form-kicker">APPLICATION · {step}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onNext?.();
        }}
      >
        {children}
        <div className="form-actions">
          {onPrevious && (
            <button
              type="button"
              className="button button-outline"
              onClick={onPrevious}
            >
              ← {previousLabel}
            </button>
          )}
          <div className="form-actions-right">
            {extraAction}
            {onSave && (
              <button
                type="button"
                className="button button-outline"
                onClick={onSave}
              >
                {saveLabel}
              </button>
            )}
            {onNext && (
              <button type="submit" className="button button-primary">
                {nextLabel} →
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  maxLength,
  min,
  max,
  accept,
  hint,
  children,
}) {
  return (
    <label className="form-field" htmlFor={name}>
      <span>
        {label}
        {required && <b className="required-mark"> *</b>}
      </span>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          value={type === "file" ? undefined : (value ?? "")}
          onChange={(event) =>
            onChange(
              name,
              type === "file"
                ? event.target.files?.[0]?.name || ""
                : event.target.value,
            )
          }
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          min={min}
          max={max}
          accept={accept}
        />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <Field
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    >
      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(event) => onChange(name, event.target.value)}
        required={required}
      >
        <option value="">Choose an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function SectionTitle({ number, title, note }) {
  return (
    <div className="student-section-title">
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </div>
  );
}
