import React from "react";
import TypeProductsItem from "./TypeProductsItem";

const TypeProducts = ({ types }) => {
  return (
    <div className="w-full px-32 flex justify-center gap-16 mb-12 border-b border-gray-300 py-4">
      {types.map((item, index) => (
        <TypeProductsItem key={index} name={item.name} />
      ))}
    </div>
  );
};

export default TypeProducts;
