import { useState } from "react";
import { Field, StudentLayout } from "./StudentShared";

export default function StudentLogin({ onLogin, onHome, onToast }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <StudentLayout
      activeStep="StudentLogin"
      onNavigate={() => {}}
      onHome={onHome}
    >
      <section className="login-card">
        <div className="login-emblem">M</div>
        <span className="form-kicker">STUDENT ACCESS · AY 2025–26</span>
        <h1>Welcome to Maatram</h1>
        <p>
          Sign in to continue your scholarship application. Your progress is
          saved on this device.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onLogin(username);
          }}
        >
          <Field
            label="Username or email"
            name="loginUsername"
            value={username}
            onChange={(_, value) => setUsername(value)}
            placeholder="Enter your registered email"
            required
          />
          <label className="form-field" htmlFor="loginPassword">
            <span>
              Password<b className="required-mark"> *</b>
            </span>
            <div className="password-control">
              <input
                id="loginPassword"
                name="loginPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="button button-outline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <label className="check-field">
            <input type="checkbox" />
            <span>Remember my credentials on this device</span>
          </label>
          <button className="button button-primary login-submit" type="submit">
            Login and continue →
          </button>
        </form>
        <button
          className="text-button"
          onClick={() =>
            onToast(
              "For this local prototype, use any non-empty username and password.",
            )
          }
        >
          Forgot your password?
        </button>
        <div className="login-note">
          <b>Important</b>
          <span>
            Maatram Foundation does not collect an application fee. Report any
            request for payment to the Foundation.
          </span>
        </div>
      </section>
    </StudentLayout>
  );
}
