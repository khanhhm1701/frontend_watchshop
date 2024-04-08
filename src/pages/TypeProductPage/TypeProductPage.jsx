import React, { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardList from "../../components/CardComponent/CardList";

const TypeProductPage = () => {
  const [brandFilters, setBrandFilters] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState({ min: "", max: "" });


  const handleBrandFilter = (brand) => {
    if (brandFilters.includes(brand)) {
      setBrandFilters(brandFilters.filter((item) => item !== brand));
    } else {
      setBrandFilters([...brandFilters, brand]);
    }
  };

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const handlePriceFilter = (range) => {
    setPriceRangeFilter(range);
  };
  return (
    <div className="mt-16 flex pb-16">
      <NavbarComponent handleBrandFilter={handleBrandFilter} handleRatingFilter={handleRatingFilter} handlePriceFilter={handlePriceFilter} />
      <div className="flex-1 px-12">
        <CardList brandFilters={brandFilters} ratingFilter={ratingFilter} priceRangeFilter={priceRangeFilter} />
      </div>
    </div>
  );
};

export default TypeProductPage;
