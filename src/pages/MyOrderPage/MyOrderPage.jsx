import React from "react";

import * as OrderApi from "../../api/OrderApi";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { currencyFormatter } from "../../service/currencyFormater";
const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await OrderApi.getOrderByUserId(user?.id, user?.access_token);
    return res.data;
  };
  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrder },
    {
      enabled: user?.id && user?.token,
    }
  );
  const { data: ordersData } = queryOrder;
  console.log("data", ordersData);

  return (
    <div className="my-24 mx-32">
      <div className="w-full border shadow h-12 flex justify-between items-center">
        <span className="font-semibold w-1/5 text-center text-yellow-600 border-b-2 border-b-yellow-600 h-full flex items-center justify-center cursor-pointer">
          <span>Tất cả</span>
        </span>
        <span className="font-semibold w-1/5 text-center cursor-pointer">Chờ lấy hàng</span>
        <span className="font-semibold w-1/5 text-center cursor-pointer">Đang vận chuyển</span>
        <span className="font-semibold w-1/5 text-center cursor-pointer">Đang giao hàng</span>
        <span className="font-semibold w-1/5 text-center cursor-pointer">Hoàn thành</span>
      </div>
      <div className="w-full mt-6 flex flex-col gap-8">
        {ordersData?.map((order) => (
          <div className="border shadow-md p-8 hover:shadow-lg">
            <div className="pb-4 flex items-center">
              <i className="fa-solid fa-truck-fast"></i>
              <div className="mx-2">Đơn hàng đang giao đến: </div>
              <spa className="font-semibold" n>
                {order?.shippingAddress?.address}
              </spa>
            </div>
            <div className="flex flex-col gap-2 py-6 border-y">
              {order?.orderItems?.map((item) => (
                <div className="shadow p-4 flex items-center">
                  <div className="h-16 w-16 flex justify-center items-center">
                    <img className="h-16" src={item?.image} alt="" />
                  </div>
                  <div className="flex flex-col ml-4 justify-start flex-1">
                    <span className="font-semibold text-lg">{item?.name}</span>
                    <span className="text-sm">Số lượng: {item?.amount}</span>
                  </div>
                  <div className="w-20 font-semibold">{currencyFormatter.format(item.price)}</div>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-between mt-6">
              <div className="font-semibold text-xl flex items-center">
                <span className="mr-4">Tổng thanh toán:</span>
                <span className="font-bold text-yellow-700"> {currencyFormatter.format(order?.totalPrice)}</span>
              </div>
              <button className=" bg-black text-white px-4 py-2 w-40 font-semibold hover:opacity-75">Huỷ đơn hàng</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrderPage;
