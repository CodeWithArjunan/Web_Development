import { PageHeading } from "./shared";

export default function Profile({ profile, setProfile, onToast }) {
  return (
    <>
      <PageHeading
        title="My Profile"
        subtitle="Administrator account details for this local prototype."
      />
      <article className="panel profile-card">
        <div className="profile-avatar">
          {profile.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <span className="profile-role">CHIEF ADMISSIONS ADMIN</span>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <p>Maatram Community · Admissions Office</p>
        </div>
      </article>
      <article className="panel profile-form">
        <label>
          Full name
          <input
            value={profile.name}
            onChange={(event) =>
              setProfile({ ...profile, name: event.target.value })
            }
          />
        </label>
        <label>
          Email address
          <input
            value={profile.email}
            onChange={(event) =>
              setProfile({ ...profile, email: event.target.value })
            }
          />
        </label>
        <label>
          Role
          <input value="Chief Admissions Admin" readOnly />
        </label>
        <button
          className="button button-primary"
          onClick={() => onToast("Profile changes saved.")}
        >
          Save profile
        </button>
      </article>
    </>
  );
}
