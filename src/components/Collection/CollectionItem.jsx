import React from "react";
import { Link } from "react-router-dom";

const CollectionItem = ({type}) => {
  return (
    <Link to='/type' className="group relative w-full hover:drop-shadow-lg cursor-pointer">
      <div className="relative w-full h-0 overflow-hidden" style={{ paddingBottom: "100%" }}>
        <img
          src= {type.image}
          alt= {type.name}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:brightness-100 brightness-75"
        />
      </div>
      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-black text-sm"> {type.name}</div>
    </Link>
  );
};

export default CollectionItem;
