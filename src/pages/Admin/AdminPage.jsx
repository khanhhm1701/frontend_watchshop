import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../untils";
import { AppstoreOutlined, CalendarOutlined, LogoutOutlined, PieChartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import HeaderLogo from "../../assets/img/shop_logo_white.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";

const AdminPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDay = currentTime.getDate();

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;

      case "order":
        return <AdminOrder />;
      default:
        return (
          <div className="w-full mt-64 flex justify-center items-center">
            <PieChartOutlined className="text-9xl text-slate-300" />
          </div>
        );
    }
  };

  const items = [
    getItem("Quản lý người dùng", "user", <UserOutlined />),
    getItem("Quản lý sản phẩm", "product", <AppstoreOutlined />),
    getItem("Quản lý đơn hàng", "order", <ShoppingCartOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const handleOnclick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <div className="flex">
      <div className="flex flex-col h-screen fixed">
        <div className="w-64 h-32 p-8 text-white bg-[#001529] flex justify-center items-center border-b">
          <img className="cursor-pointer" src={HeaderLogo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <Menu className="w-64 flex-1 py-2" mode="inline" theme="dark" onClick={handleOnclick} items={items} />
      </div>
      <div className="flex-1 flex flex-col ml-64">
        <div className="bg-slate-100 w-full h-14 flex justify-between items-center px-12">
          <div className="font-semibold text-base">
            <CalendarOutlined className="mr-2" />
            {currentDay}/{currentMonth}/{currentYear}
          </div>
          <div className="flex gap-8 items-center">
            <div className="font-semibold text-base">
              <UserOutlined className="mr-2" />
              {user.name}
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 bg-white border-yellow-600 border-2 rounded-full w-10 h-10 flex justify-center items-center hover:opacity-70"
            >
              <LogoutOutlined />
            </button>
          </div>
        </div>
        <div className="">{renderPage(keySelected)}</div>
      </div>
    </div>
  );
};

export default AdminPage;
