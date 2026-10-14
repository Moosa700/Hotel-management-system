import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Lock } from "lucide-react";

export default function LoginForm({ onSubmit }) {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await onSubmit(form);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          (requestError.message === "Network Error"
            ? "Could not reach the server. Check that the backend is running."
            : requestError.message) ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (

    <>

      <style>{`

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }


        .form-group {
          display: flex;
          flex-direction: column;
        }


        .form-label {
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #374151;
        }


        .input-wrapper {
          position: relative;
        }


        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--secondary);
        }


        .form-input {

          width: 100%;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          padding: 16px 16px 16px 48px;
          font-size: 16px;
          outline: none;
          transition: 0.3s;

        }


        .form-input:focus {

          border-color: #d4a24c;
          box-shadow: 0 0 0 4px rgba(212,162,76,0.2);

        }


        .login-button {

          width: 100%;
          border-radius: 999px;
          padding: 16px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: 0.3s;
          background: var(--primary);

        }


        .login-button:hover {

          transform: translateY(-4px);

        }


        .login-button:disabled {

          opacity: 0.6;
          cursor: not-allowed;

        }


        .register-text {

          text-align: center;
          color: #6b7280;

        }


        .register-link {

          font-weight: 600;
          color: var(--secondary);
          text-decoration: none;

        }


        .register-link:hover {

          text-decoration: underline;

        }

        .login-error {
          margin: 0;
          color: #a22b22;
          font-size: .9rem;
        }


      `}</style>



      <form
        onSubmit={handleSubmit}
        className="login-form"
      >

        {error && <p className="login-error" role="alert">{error}</p>}


        {/* Email */}

        <div className="form-group">

          <label className="form-label">
            Email Address
          </label>


          <div className="input-wrapper">


            <Mail
              size={20}
              className="input-icon"
            />


            <input

              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="form-input"

            />


          </div>


        </div>




        {/* Password */}


        <div className="form-group">


          <label className="form-label">
            Password
          </label>


          <div className="input-wrapper">


            <Lock
              size={20}
              className="input-icon"
            />


            <input

              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="form-input"

            />


          </div>


        </div>





        {/* Button */}


        <button

          disabled={loading}

          className="login-button"

        >

          {loading
            ? "Signing In..."
            : "Login"
          }


        </button>





        {/* Register */}


        <p className="register-text">

          Don't have an account?{" "}


          <Link
            to="/register"
            className="register-link"
          >

            Register

          </Link>


        </p>



      </form>


    </>

  );

}