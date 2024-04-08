import React, { useState } from "react";
import { Rate } from "antd";

const NavbarComponent = ({ handleBrandFilter, handleRatingFilter, handlePriceFilter }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handlePriceInputChange = (event, type) => {
    const value = event.target.value;
    setPriceRange((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleApplyFilter = () => {
    handlePriceFilter(priceRange);
  };

  const typeProduct = [
    { id: 1, name: "Citizen" },
    { id: 2, name: "Orient" },
    { id: 3, name: "Seiko" },
    { id: 4, name: "Epos Swiss" },
    { id: 5, name: "SRWatch" },
    { id: 6, name: "Atlantic" },
  ];

  return (
    <div className="p-8 border-r-2 w-72">
      {/* Thương hiệu */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg">Thương hiệu</h2>
        <div className="flex flex-col gap-2 mt-2">
          {typeProduct.map((item, i) => (
            <label key={i} className="flex items-center gap-2">
              <input className="w-4 h-4" type="checkbox" onChange={() => handleBrandFilter(item.name)} /> {item.name}
            </label>
          ))}
        </div>
      </div>

      {/* Đánh giá */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Đánh giá</h2>
        <div className="mb-1 cursor-pointer">
          <Rate className="text-lg" disabled defaultValue={3} />
          <span onClick={() => handleRatingFilter(3)} className="ml-4 hover:text-yellow-600">Từ 3 sao</span>
        </div>
        <div className="mb-1 cursor-pointer">
          <Rate className="text-lg" disabled defaultValue={4} />
          <span onClick={() => handleRatingFilter(4)} className="ml-4 hover:text-yellow-600">Từ 4 sao</span>
        </div>
        <div className="mb-1 cursor-pointer">
          <Rate className="text-lg" disabled defaultValue={5} />
          <span onClick={() => handleRatingFilter(5)} className="ml-4 hover:text-yellow-600">5 sao</span>
        </div>
        <div onClick={() => handleRatingFilter(0)} className="mb-1 cursor-pointer mt-4 hover:text-yellow-600">
          Bỏ lọc đánh giá
        </div>
      </div>

      {/* Giá */}
      <div>
        <h3 className="text-lg font-medium mb-4">Khoảng giá</h3>
        <div>
          <input
            className="w-full px-4 py-2 border mb-4 focus:outline-none "
            type="text"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceInputChange(e, "min")}
          />
          <input
            className="w-full px-4 py-2 border mb-4 focus:outline-none "
            type="text"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => handlePriceInputChange(e, "max")}
          />
        </div>
        <button className="w-full bg-black font-medium text-white h-12 text-lg hover:opacity-80" onClick={handleApplyFilter}>
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
