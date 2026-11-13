export default function Home({ onStudentLogin, onAdminLogin }) {
  return (
    <div className="home-page">
      <header className="home-header">
        <a className="home-brand" href="#top">
          <span className="brand-mark">M</span>
          <span>
            <b>MAATRAM</b>
            <small>FOUNDATION</small>
          </span>
        </a>
        <nav className="home-nav" aria-label="Main navigation">
          <a href="#purpose">Our purpose</a>
          <button className="button button-outline" onClick={onStudentLogin}>
            Student Login
          </button>
          <button className="button button-primary" onClick={onAdminLogin}>
            Admin Login
          </button>
        </nav>
      </header>
      <main id="top">
        <section className="home-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <i /> EDUCATION · OPPORTUNITY · CHANGE
            </span>
            <h1>
              Every student deserves a chance to <mark>move forward.</mark>
            </h1>
            <p>
              Maatram Foundation supports deserving students with access to
              higher education, ongoing mentorship, skills development, and
              preparation for a confident future.
            </p>
            <div className="hero-actions">
              <button
                className="button button-primary"
                onClick={onStudentLogin}
              >
                Continue as a student <span>→</span>
              </button>
              <button className="button button-outline" onClick={onAdminLogin}>
                Open administration portal
              </button>
            </div>
            <small className="no-fee-note">
              <b>Important</b> · Maatram does not collect application fees from
              students.
            </small>
          </div>
          <div
            className="hero-art"
            aria-label="Maatram Foundation education illustration"
          >
            <div className="art-rings" />
            <div className="art-sun" />
            <div className="art-book">
              <div />
              <div />
              <span>M</span>
            </div>
            <span className="art-label art-label-top">LEARN</span>
            <span className="art-label art-label-bottom">THEN LIFT OTHERS</span>
            <span className="art-star">✳</span>
          </div>
        </section>
        <section className="home-purpose" id="purpose">
          <div className="purpose-intro">
            <span className="eyebrow">OUR PURPOSE</span>
            <h2>
              Education is a beginning.
              <br />A community makes it possible.
            </h2>
          </div>
          <p>
            Through sponsored education and sustained support, Maatram helps
            young people grow academically, build practical skills, and take
            part in the world around them. Students are encouraged to carry that
            support forward to the next generation.
          </p>
        </section>
        <section className="home-pillars" aria-label="Maatram student support">
          <article>
            <span>01</span>
            <h3>Access to education</h3>
            <p>
              Help deserving students pursue quality higher education and focus
              on their goals.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Support along the way</h3>
            <p>
              Mentoring and continued guidance help students adapt, learn, and
              keep progressing.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Skills for the future</h3>
            <p>
              Skill development and employability preparation connect learning
              with opportunity.
            </p>
          </article>
        </section>
        <section className="home-callout">
          <div>
            <span className="eyebrow">MAATRAM STUDENT PORTAL</span>
            <h2>Your next step starts here.</h2>
            <p>
              Sign in to continue an application, or enter the administration
              portal to support the admissions process.
            </p>
          </div>
          <div className="callout-actions">
            <button className="button button-primary" onClick={onStudentLogin}>
              Student Login →
            </button>
            <button className="button button-outline" onClick={onAdminLogin}>
              Admin Login →
            </button>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <span>© Maatram Foundation</span>
        <span>Education can create lasting change.</span>
      </footer>
    </div>
  );
}
