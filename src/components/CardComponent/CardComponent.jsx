import React from "react";
import { currencyFormatter } from "../../service/currencyFormater";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ name, image, discount, price, rating, countInStock, id }) => {
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/details/${id}`)
  }

  return (
    <div onClick={() => handleDetailsProduct(id)} className="flex flex-col w-56 border border-solid border-slate-50 cursor-pointer transition duration-300 transform hover:shadow-lg">
      <div className="w-full p-4 h-56 flex justify-center items-center">
        <img className="h-48 w-auto" src={image} alt="Ảnh sản phẩm" />
      </div>
      <div className="flex flex-col bg-slate-50 p-4">
        <div className="text-lg font-medium my-1 line-clamp-2">{name}</div>
        <div className="my-1 flex items-center">
          <span className="flex items-center">
            <span>{rating}</span>
            <i className="fa-solid fa-star text-yellow-500 px-2 border-r border-gray-400"></i>
          </span>
          <span className="ml-2">
            <span>Số lượng: </span>
            <span>{countInStock || 100}</span>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-2xl font-bold my-1 text-yellow-700">{currencyFormatter.format(price)}</div>
          <span className="mt-1 font-semibold text-lg">-{discount || 5}%</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
