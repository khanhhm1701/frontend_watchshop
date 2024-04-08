import React, { useMemo, useState } from "react";
import { currencyFormatter } from "../../service/currencyFormater";
import OrderItem from "../../components/OrderItem/OrderItem";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    const result = orders?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [orders]);

  const handlePayment = () => {
    if (!user?.name || !user?.address || !user?.phone) {
      setIsModalOpen(true);
    }
    navigate('/payment')
  };

  const handleUpdateUser = () => {
    navigate("/profile");
  };

  return (
    <div className="mt-28 mb-16 w-full px-32 flex gap-8">
      <div className="w-3/4">
        <div className="w-full flex items-center border p-4 shadow-sm gap-2">
          <div className="flex-1">
            <span>Tất cả {orders?.orderItems?.length} sản phẩm</span>
          </div>
          <div className="w-1/6 text-center">Đơn giá</div>
          <div className="w-1/6 text-center">Số lượng</div>
          <div className="w-1/6 text-center">Thành tiền</div>
          <div className="w-1/12 text-center cursor-pointer">
            <i className="fa-solid fa-trash text-rose-700 hover:opacity-70 "></i>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {orders?.orderItems?.map((item, index) => (
            <OrderItem key={index} order={item} />
          ))}
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
        <button onClick={handlePayment} className="bg-black  text-white w-full text-2xl text-center mt-8 py-3 font-semibold hover:opacity-70">
          Mua hàng
        </button>
      </div>
      <Modal title="Cập thông tin tài khoản để đặt hàng" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleUpdateUser}>
        <p>Cần cập nhật tên người nhận, địa chỉ và số điện thoại để đặt hàng?</p>
      </Modal>
    </div>
  );
};

export default OrderPage;
