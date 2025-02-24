import React from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogOut,
  logOutHandler,
}) => {
  const firmName = localStorage.getItem("firmName");

  return (
    <nav style={styles.navSection}>
      <div style={styles.logoContainer}>
        <img src="/assets/logo.jpg" alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.company}>Vendor Dashboard</div>
      <div style={styles.firmName}>
        <h4>
          Firm Name: <span>{firmName || "N/A"}</span>
        </h4>
      </div>
      <div style={styles.userAuth}>
        {!showLogOut ? (
          <>
            <span style={styles.authLink} onClick={showLoginHandler}>
              Login
            </span>
            <span style={styles.authLink} onClick={showRegisterHandler}>
              {" "}
              / Register
            </span>
          </>
        ) : (
          <span onClick={logOutHandler} style={styles.logout}>
            Logout
          </span>
        )}
      </div>
    </nav>
  );
};

// Inline Styles
const styles = {
  navSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(135deg, #FFD700, #FFA500)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    color: "black",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    borderRadius: "5px",
  },
  company: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  firmName: {
    fontSize: "18px",
    fontWeight: "500",
  },
  userAuth: {
    display: "flex",
    alignItems: "center",
  },
  authLink: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "black",
    padding: "8px 12px",
    transition: "0.3s",
  },
  logout: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "red",
    padding: "8px 12px",
    transition: "0.3s",
  },
};

export default NavBar;
