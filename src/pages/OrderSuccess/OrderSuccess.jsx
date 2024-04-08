import React from "react";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../constant";
import { currencyFormatter } from "../../service/currencyFormater";

const OrderSuccess = () => {
  const location = useLocation();
  console.log("local", location);
  const { state } = location;
  console.log("state", state);

  return (
    <div className="my-24 mx-32 p-8 border border-y-8 border-y-yellow-600 flex flex-col">
      <div className="flex flex-col pb-4 border-b">
        <span className="text-lg text-yellow-700 mb-4 font-bold">Phương thức giao hàng</span>
        <img className="w-32" src={orderContant.delivery.image[state?.delivery]} alt="" />
      </div>
      <div className="flex flex-col mt-4 pb-6 border-b">
        <span className="text-lg text-yellow-700 mb-4 font-bold">Phương thức thanh toán</span>
        <div className="flex items-center gap-4">
          <img className="w-8" src={orderContant.payment.image[state?.payment]} alt="" />
          <span className="font-semibold text-base">{orderContant.payment.name[state?.payment]}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 pb-8 border-b">
        <span className="text-lg text-yellow-700 mb-4 font-bold">Danh sách sản phẩm</span>
        <div className="flex w-full gap-2 items-center p-4 shadow">
          <span className="w-32 text-center text-lg font-semibold">Hình ảnh</span>
          <span className="flex-1 text-lg font-semibold ml-4">Tên sản phẩm</span>
          <span className="w-1/12 text-center text-lg font-semibold">Số lượng</span>
          <span className="w-1/6 text-center text-lg font-semibold">Đơn giá</span>
        </div>
        {state?.orders?.map((order, i) => {
          return (
            <div className="flex w-full gap-2 items-center p-4 shadow">
              <div className="w-32 flex justify-center items-center">
                <img className="w-16 text-center" src={order?.image} alt="" />
              </div>
              <span className="flex-1 text-lg font-semibold ml-4">{order?.name}</span>
              <span className="w-1/12 text-center text-lg font-semibold">{order?.amount}</span>
              <span className="w-1/6 text-center text-lg font-bold">{currencyFormatter.format(order?.price)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <span className="font-semibold text-2xl">Tổng thanh toán:</span>
        <span className="ml-4 font-bold text-2xl text-yellow-700">{currencyFormatter.format(state?.totalPrice)}</span>
      </div>
    </div>
  );
};

export default OrderSuccess;
