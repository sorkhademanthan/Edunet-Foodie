import React from "react";

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
}) => {
  return (
    <div style={styles.sideBarSection}>
      <ul style={styles.list}>
        {showFirmTitle ? (
          <li style={styles.listItem} onClick={showFirmHandler}>
            Add Firm
          </li>
        ) : (
          ""
        )}
        <li style={styles.listItem} onClick={showProductHandler}>
          Add Product
        </li>
        <li style={styles.listItem} onClick={showAllProductsHandler}>
          All Products
        </li>
        <li style={styles.listItem}>User Details</li>
      </ul>
    </div>
  );
};

// Inline Styles
const styles = {
  sideBarSection: {
    width: "250px",
    height: "100vh",
    background: "linear-gradient(135deg, #FFD700, #FFA500)",
    padding: "20px",
    boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "12px 20px",
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    background: "#FFCC00",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default SideBar;
