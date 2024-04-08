import React, { useEffect, useMemo, useState } from "react";
import { currencyFormatter } from "../../service/currencyFormater";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderApi from "../../api/OrderApi";
import { Radio, message } from "antd";
import Logo_GHTK from "../../assets/img/logo/Logo-GHTK.png";
import Logo_ViettelPost from "../../assets/img/logo/logo_viettelPost.png";
import Logo_NinjaVan from "../../assets/img/logo/Logo-Ninjavan.png";
import Logo_COD from "../../assets/img/logo/logo_cod.png";
import Logo_Paypal from "../../assets/img/logo/logo_paypal.png";
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";

const PaymentPage = () => {
  const [delivery, setDelivery] = useState("GHTK");
  const [payment, setPayment] = useState("COD");
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate()
  const  dispatch = useDispatch()

  const totalPrice = useMemo(() => {
    const result = orders?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [orders]);

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderApi.createOrder({ ...rests }, token);
    return res;
  });

  const { data: dataAdd, isSuccess, isError } = mutationAddOrder;

  useEffect(() => { 
    if (isSuccess && dataAdd?.status === "OK") {
      const arrOrder = [];
      dispatch(removeAllOrderProduct({listChecked: arrOrder}))
      message.success("Đặt hàng thành công!");
      navigate('/order-success', {
        state: {
          delivery,
          payment,
          orders: orders?.orderItems,
          totalPrice: totalPrice,
        }
      })
    } else if (isError && dataAdd?.status !== "OK") {
      message.error("Đặt hàng thất bại!");
    }
  }, [isSuccess, isError]);

  const handleAddOrder = () => {
    if (user?.access_token && orders?.orderItems) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: orders?.orderItems,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        totalPrice: totalPrice,
        user: user?.id,
        email: user?.email,
      });
    }
  };

  const handleChangeDevivery = (e) => {
    setDelivery(e.target.value);
  };

  const handleChangePayment = (e) => {
    setPayment(e.target.value);
  };

  return (
    <div className="mt-28 mb-16 w-full px-32 flex gap-8">
      <div className="w-3/4 border p-8 shadow">
        <div className="pb-8 border-b">
          <h2 className="font-semibold mb-4 text-lg text-yellow-700">Chọn phương thức giao hàng</h2>
          <div className="w-full px-8 py-4 bg-gray-50 rounded">
            <Radio.Group className="flex flex-col gap-1" onChange={handleChangeDevivery} value={delivery}>
              <Radio className="flex items-center" value="GHTK">
                <img className="w-44 ml-4" src={Logo_GHTK} alt="Giao hàng tiết kiệm" />
              </Radio>
              <Radio className="flex items-center" value="VTP">
                <img className="w-28 ml-4" src={Logo_ViettelPost} alt="Viettel Post" />
              </Radio>
              <Radio className="flex items-center mt-3" value="NJV">
                <img className="w-24 ml-4" src={Logo_NinjaVan} alt="Ninja Van" />
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="font-semibold mb-4 text-lg text-yellow-700">Chọn phương thức thanh toán</h2>
          <div className="w-full px-8 py-4 bg-gray-50 rounded">
            <Radio.Group className="flex flex-col gap-4" onChange={handleChangePayment} value={payment}>
              <Radio className="flex items-center gap-3" value="COD">
                <div className="flex items-center gap-3">
                  <img className="w-8" src={Logo_COD} alt="Thanh toán khi nhận hàng" />
                  <span className="font-semibold text-base">Thanh toán khi nhận hàng</span>
                </div>
              </Radio>
              <Radio className="flex items-center gap-3" value="Paypal">
                <div className="flex items-center gap-3">
                  <img className="w-8" src={Logo_Paypal} alt="Thanh toán Paypal" />
                  <span className="font-semibold text-base">Thanh toán qua Paypal</span>
                </div>
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="w-1/4 mb-32">
        <div className="w-full border shadow p-4 flex flex-col">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between">
              <span className="font-semibold">Người nhận:</span>
              <span>{user?.name || user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Số điện thoại:</span>
              <span>{user?.phone || ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Địa chỉ giao hàng :</span>
              <span>{user?.address || ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">VAT:</span>
              <span>Đã áp dụng</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 pb-4 border-t-2">
            <span className="text-xl font-bold">Tổng tiền</span>
            <span className="text-2xl font-bold text-yellow-700 ">{currencyFormatter.format(totalPrice)}</span>
          </div>
        </div>
        <button onClick={handleAddOrder} className="bg-black  text-white w-full text-2xl text-center mt-8 py-3 font-semibold hover:opacity-70">
          Đặt Hàng
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
