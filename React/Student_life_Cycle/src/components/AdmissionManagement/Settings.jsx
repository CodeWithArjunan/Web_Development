import { PageHeading } from "./shared";

export default function Settings({ settings, setSettings, onToast }) {
  const update = (key) => setSettings({ ...settings, [key]: !settings[key] });
  return (
    <>
      <PageHeading
        title="Settings"
        subtitle="Choose how the administration workspace behaves."
      />
      <div className="settings-grid">
        {[
          [
            "Email notifications",
            "Send staff a notice when an application needs attention.",
            "email",
          ],
          [
            "Document reminders",
            "Remind applicants when a required file needs correction.",
            "reminders",
          ],
          [
            "Audit event logging",
            "Keep an entry when an administrator updates a record.",
            "audit",
          ],
          [
            "Compact applicant rows",
            "Show more applicant records on the screen at once.",
            "compact",
          ],
        ].map(([title, description, key]) => (
          <label className="panel setting-row" key={key}>
            <span>
              <b>{title}</b>
              <small>{description}</small>
            </span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => update(key)}
            />
          </label>
        ))}
      </div>
      <button
        className="button button-primary save-settings"
        onClick={() => onToast("Your workspace settings have been saved.")}
      >
        Save settings
      </button>
    </>
  );
}
