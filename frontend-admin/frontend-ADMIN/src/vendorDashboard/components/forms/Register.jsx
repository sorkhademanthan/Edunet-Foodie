import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
        alert("Registration Failed, Contact Admin");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.registerSection}>
      {loading && (
        <div style={styles.loaderSection}>
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="gold"
            ariaLabel="three-circles-loading"
          />
          <p style={styles.loaderText}>
            Hi, Your Registration is under process...
          </p>
        </div>
      )}
      {!loading && (
        <form
          style={styles.authForm}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3 style={styles.heading}>Vendor Register</h3>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            style={styles.input}
          />
          <br />
          <label style={styles.label}>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
          <br />
          <label style={styles.label}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password"
            style={styles.input}
          />
          <br />
          <span style={styles.showPassword} onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </span>
          <div style={styles.btnSubmit}>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  registerSection: {
    background: "linear-gradient(135deg, #FFD700, #FFA500)",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    width: "350px",
    margin: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  loaderSection: {
    textAlign: "center",
    color: "black",
  },
  loaderText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  authForm: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    color: "black",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "black",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#FFF8DC",
  },
  showPassword: {
    cursor: "pointer",
    color: "black",
    fontSize: "14px",
    fontWeight: "bold",
  },
  btnSubmit: {
    marginTop: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#FFCC00",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Register;
