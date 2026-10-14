import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          (requestError.message === "Network Error"
            ? "Could not reach the server. Check that the backend is running."
            : requestError.message) ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .register-form { width: 100%; display: flex; flex-direction: column; gap: 18px; }
        .register-input { width: 100%; padding: 15px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px; outline: none; transition: .2s; }
        .register-input:focus { border-color: #0f3d3e; box-shadow: 0 0 0 3px rgba(15,61,62,.15); }
        .register-button { width: 100%; padding: 15px; border: 0; border-radius: 8px; background: #0f3d3e; color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; }
        .register-button:hover { background: #0b3132; }
        .register-button:disabled { opacity: .6; cursor: not-allowed; }
        .login-text { text-align: center; color: #6b7280; }
        .login-link { color: #0f3d3e; font-weight: 600; text-decoration: none; }
        .login-link:hover { text-decoration: underline; }
        .register-error { margin: 0; color: #a22b22; font-size: .9rem; }
      `}</style>

      <form onSubmit={handleSubmit} className="register-form">
        {error && <p className="register-error" role="alert">{error}</p>}
        <input type="text" name="name" placeholder="Full Name" autoComplete="name" required value={form.name} onChange={handleChange} className="register-input" />
        <input type="email" name="email" placeholder="Email Address" autoComplete="email" required value={form.email} onChange={handleChange} className="register-input" />
        <input type="password" name="password" placeholder="Password" autoComplete="new-password" required value={form.password} onChange={handleChange} className="register-input" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" required value={form.confirmPassword} onChange={handleChange} className="register-input" />
        <button type="submit" disabled={loading} className="register-button">
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </>
  );
}