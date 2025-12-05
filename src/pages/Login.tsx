import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style_toko_auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = () => {
    if (username !== "admin" || password !== "admin@123") {
      setError("Username atau password kamu salah");
      return;
    }
    navigate("/products");
  };

  return (
    <div className="container-fluid kontainer">
      <div className="row h-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="kartu col-11 col-md-8">
            <h3 className="text-center fw-bold mb-4">
              <span style={{ color: "white", WebkitTextStroke: "2px black" }}>
                TOKO
              </span>{" "}
            </h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <label className="fw-semibold mb-1">Username</label>
            <div className="input-group mb-3">
              <span className="input-group-text field">
                <i className="fi-rr-user"></i>
              </span>
              <input
                placeholder="Masukkan username"
                type="text"
                className="form-control auth-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <label className="fw-semibold mb-1">Password</label>
            <div className="input-group mb-4">
              <span className="input-group-text field">
                <i className="fi-rr-lock"></i>
              </span>
              <input
                placeholder="Masukkan password"
                type="password"
                className="form-control auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100 py-2" onClick={login}>
              Masuk
            </button>
            <button
                type="button"
                className="btn btn-light w-100 py-2 mt-3 border rounded-3 d-flex justify-content-center align-items-center gap-2"
                style={{ fontWeight: 600 }}
                >
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google Logo"
                    width="20"
                />
                Masuk dengan Google
            </button>

          </div>
        </div>

        <div className="col-md-6 gradient d-none d-md-flex justify-content-center align-items-center"></div>
      </div>
    </div>
  );
}
