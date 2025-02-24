import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === "true";
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        console.error("User not authenticated");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      formData.append("image", image);

      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully ✅");
      }

      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setImage(null);
      setDescription("");
    } catch (error) {
      alert("Failed to add Product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.loaderSection}>
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#FFD700"
            ariaLabel="three-circles-loading"
          />
          <p style={styles.loadingText}>
            Please wait, your product is being added...
          </p>
        </div>
      )}

      {!loading && (
        <form style={styles.form} onSubmit={handleAddProduct}>
          <h3 style={styles.heading}>Add Product</h3>

          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />

          <div style={styles.checkInp}>
            <label style={styles.label}>Category</label>
            <div style={styles.inputsContainer}>
              <div style={styles.checkboxContainer}>
                <label>Veg</label>
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes("veg")}
                  onChange={handleCategoryChange}
                />
              </div>
              <div style={styles.checkboxContainer}>
                <label>Non-Veg</label>
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes("non-veg")}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>

          <div style={styles.checkInp}>
            <label style={styles.label}>Best Seller</label>
            <div style={styles.inputsContainer}>
              <div style={styles.checkboxContainer}>
                <label>Yes</label>
                <input
                  type="radio"
                  value="true"
                  checked={bestSeller === true}
                  onChange={handleBestSeller}
                />
              </div>
              <div style={styles.checkboxContainer}>
                <label>No</label>
                <input
                  type="radio"
                  value="false"
                  checked={bestSeller === false}
                  onChange={handleBestSeller}
                />
              </div>
            </div>
          </div>

          <label style={styles.label}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Product Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            style={styles.fileInput}
          />

          <br />
          <div style={styles.btnSubmit}>
            <button type="submit" style={styles.submitBtn}>
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
  container: {
    width: "100%",
    maxWidth: "500px",
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
    fontWeight: "bold",
  },
  label: {
    alignSelf: "flex-start",
    marginTop: "10px",
    fontWeight: "bold",
    color: "black",
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
  fileInput: {
    width: "100%",
    padding: "5px",
    marginTop: "5px",
  },
  checkInp: {
    marginTop: "15px",
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  btnSubmit: {
    width: "100%",
    marginTop: "15px",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: "#FFCC00",
    color: "black",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
  submitBtnHover: {
    background: "yellow",
    color: "black",
  },
  loaderSection: {
    textAlign: "center",
    padding: "20px",
  },
  loadingText: {
    color: "black",
    fontWeight: "bold",
  },
};

export default AddProduct;
