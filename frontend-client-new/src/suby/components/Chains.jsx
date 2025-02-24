import React, { useState, useEffect } from "react";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { MagnifyingGlass } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Chains = () => {
  const [vendorData, setVendorData] = useState([
    {
      id: 1,
      firm: [
        {
          _id: "1",
          firmName: "Tasty Bites",
          image: "tasty-bites.jpg",
        },
        {
          _id: "2",
          firmName: "Spicy Treats",
          image: "spicy-treats.jpg",
        },
      ],
    },
    {
      id: 2,
      firm: [
        {
          _id: "3",
          firmName: "Healthy Bowl",
          image: "healthy-bowl.jpg",
        },
        {
          _id: "4",
          firmName: "Dessert Delight",
          image: "dessert-delight.jpg",
        },
      ],
    },
  ]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mediaChainSection">
      <div className="loaderSection">
        {loading && (
          <>
            <div className="loader">Your 🥣 is Loading...</div>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </>
        )}
      </div>
      <div className="btnSection">
        <button onClick={() => handleScroll("left")} className="scrollButton">
          <FaRegArrowAltCircleLeft className="btnIcons" />
        </button>
        <button onClick={() => handleScroll("right")} className="scrollButton">
          <FaRegArrowAltCircleRight className="btnIcons" />
        </button>
      </div>
      <h2 className="chainTitle">
        Discover the Best Restaurant Chains in Mumbai
      </h2>
      <section className="chainSection" id="chainGallery">
        {vendorData.map((vendor) => (
          <div className="vendorBox" key={vendor.id}>
            {vendor.firm.map((item) => (
              <Link
                to={`/products/${item._id}/${item.firmName}`}
                className="link"
                key={item._id}
              >
                <div className="firmImage zoomEffect">
                  <img
                    src={`/images/${item.image}`}
                    className="topimg"
                    alt={item.firmName}
                  />
                </div>
                <h4 className="firmName">{item.firmName}</h4>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Chains;
