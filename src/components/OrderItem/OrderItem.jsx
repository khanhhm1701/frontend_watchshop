import React from "react";
import { currencyFormatter } from "../../service/currencyFormater";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { decreaseAmount, increaseAmount, removeOrderProduct } from "../../redux/slides/orderSlide";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  console.log('order', order)

  const handleIncreaseAmount = (idProduct) => {
    dispatch(increaseAmount({idProduct}))
  }

  const handleDecreaseAmount = (idProduct) => {
    dispatch(decreaseAmount({idProduct}))
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))
  }
  return (
    <div className="w-full flex items-center h-28 border shadow p-4 gap-2">
      <div className="flex-1 flex items-center">
        <div className="h-20 w-20 overflow-hidden flex justify-center items-center">
          <img className="h-20" src={order?.image} alt="" />
        </div>
        <span className="font-semibold ml-4">{order?.name}</span>
      </div>
      <div className="w-1/6 text-center">{currencyFormatter.format(order?.price)}</div>
      <div className="w-1/6 text-center">
        <div className="mt-3 flex items-center justify-center">
          <button onClick={() => handleIncreaseAmount(order?.product)} className="bg-slate-600 text-white px-3 rounded-none py-1 rounded hover:opacity-70">
            <i className="fa-solid fa-plus "></i>
          </button>
          <Input className="w-12 rounded-none" value={order?.amount} />
          <button onClick={() => handleDecreaseAmount(order?.product)} className="bg-slate-600 text-white rounded-none px-3 py-1 rounded hover:opacity-70">
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
      </div>
      <div className="w-1/6 text-center font-semibold text-yellow-700">{currencyFormatter.format(order?.price * order?.amount)}</div>
      <div onClick={() => handleDeleteOrder(order?.product)} className="w-1/12 text-center cursor-pointer">
        <i className="fa-solid fa-trash text-rose-700 hover:opacity-70 "></i>
      </div>
    </div>
  );
};

export default OrderItem;
