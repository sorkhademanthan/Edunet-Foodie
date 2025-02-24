import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const firmDataHandler = async () => {
      try {
        const response = await fetch("/mock-api/food-vendors.json");
        const newFirmData = await response.json();
        setFirmData(newFirmData.vendors);
      } catch (error) {
        console.error("Firm data not fetched", error);
      }
    };
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };

  return (
    <>
      <h3 className="sectionTitle">
        🍽️ Restaurants with Online Food Delivery in Mumbai
      </h3>
      <div className="filterButtons">
        <button
          onClick={() => filterHandler("All", "all")}
          className={activeCategory === "all" ? "activeButton" : ""}
        >
          <FaFilter /> All
        </button>
        <button
          onClick={() => filterHandler("South-Indian", "south-indian")}
          className={activeCategory === "south-indian" ? "activeButton" : ""}
        >
          South-Indian
        </button>
        <button
          onClick={() => filterHandler("North-Indian", "north-indian")}
          className={activeCategory === "north-indian" ? "activeButton" : ""}
        >
          North-Indian
        </button>
        <button
          onClick={() => filterHandler("Chinese", "chinese")}
          className={activeCategory === "chinese" ? "activeButton" : ""}
        >
          Chinese
        </button>
        <button
          onClick={() => filterHandler("Bakery", "bakery")}
          className={activeCategory === "bakery" ? "activeButton" : ""}
        >
          Bakery
        </button>
      </div>
      <section className="firmSection">
        {firmData.map((vendor) =>
          vendor.firm.map((item) =>
            selectedRegion === "All" ||
            item.region.includes(selectedRegion.toLowerCase()) ? (
              <Link
                to={`/products/${item._id}/${item.firmName}`}
                className="link"
                key={item._id}
              >
                <div className="zoomEffect">
                  <div className="firmGroupBox">
                    <div className="firmGroup">
                      <img src={`/images/${item.image}`} alt={item.firmName} />
                      <div className="firmOffer">{item.offer}</div>
                    </div>
                    <div className="firmDetails">
                      <strong>{item.firmName}</strong>
                      <div className="firmArea">
                        📍 {item.region.join(", ")}
                      </div>
                      <div className="firmArea">📍 {item.area}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null
          )
        )}
      </section>
    </>
  );
};

export default FirmCollections;
