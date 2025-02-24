import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful! 🎉");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log("Checking for VendorId:", vendorId);
      const vendorResponse = await fetch(
        `${API_URL}/vendor/single-vendor/${vendorId}`
      );
      window.location.reload();
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmName);
      }
    } catch (error) {
      alert("Login failed. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.loadingOverlay}>
          <ThreeCircles
            visible={loading}
            height={80}
            width={80}
            color="#FFD700"
            ariaLabel="loading-animation"
          />
          <p style={styles.loadingText}>Logging in... Please wait</p>
        </div>
      )}

      {!loading && (
        <form style={styles.form} onSubmit={loginHandler} autoComplete="off">
          <h2 style={styles.heading}>Vendor Login</h2>

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
            <span onClick={handleShowPassword} style={styles.togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" style={styles.loginBtn}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "linear-gradient(135deg, #FFD700, #FFA500)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    textAlign: "center",
    color: "black",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "24px",
    color: "#333",
  },
  label: {
    alignSelf: "flex-start",
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "2px solid black",
    borderRadius: "5px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "black",
    outline: "none",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  togglePassword: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#333",
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#FFCC00",
    color: "black",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  loginBtnHover: {
    background: "yellow",
    color: "black",
  },
  loadingOverlay: {
    textAlign: "center",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
  },
  loadingText: {
    color: "white",
  },
};

export default Login;
