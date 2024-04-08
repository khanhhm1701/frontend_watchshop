import { Badge, Col, Popover, Row } from "antd";
import React, { useEffect, useState } from "react";
import HeaderLogo from "../../assets/img/shop_logo_white.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/slides/productSlide";
import { MenuOutlined } from "@ant-design/icons";
import "../HeaderComponent/responsive.scss";

const HeaderComponent = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [name, setName] = useState(user?.name);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    setName(user?.name);
  }, [user?.name]);

  const handleNavigateType = () => {
    navigate("/type");
  };

  const handleSearchClick = () => {
    dispatch(searchProduct(searchValue));
  };

  const handleNavigateMyOrder = () => {
    navigate("/my-order");
  };

  const content = (
    <div className="p-0">
      <p
        onClick={() => navigate("/profile")}
        className="py-1 cursor-pointer hover:text-yellow-700 font-semibold"
      >
        Thông tin tài khoản
      </p>
      <p
        onClick={handleNavigateMyOrder}
        className="py-1 cursor-pointer hover:text-yellow-700 font-semibold"
      >
        Đơn hàng của tôi
      </p>
      {user?.isAdmin && (
        <p
          onClick={() => navigate("/system/admin")}
          className="py-1 cursor-pointer hover:text-yellow-700 font-semibold"
        >
          Quản lý hệ thống
        </p>
      )}
      <p
        onClick={handleNavigateLogin}
        className="py-1 cursor-pointer hover:text-yellow-700 font-semibold"
      >
        Đăng xuất
      </p>
    </div>
  );

  return (
    <div className="bg-black text-white h-16 flex items-center px-32 fixed top-0 z-10 w-full">
      <div className="w-full flex gap-24 justify-between items-center">
        <div className="flex flex-1 gap-24 items-center">
          {/* Logo */}
          <div className="w-40">
            <Link to={"/"}>
              <img src={HeaderLogo} alt="" className="w-40 cursor-pointer" />
            </Link>
          </div>
          {/* Search bar */}
          <div className="flex flex-1">
            <div className="w-full flex">
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Tìm kiếm..."
                className="px-4 py-2 flex-1 text-slate-800 focus:outline-none"
              />
              <button
                onClick={handleSearchClick}
                className="border border-white px-6 hover:opacity-80 bg-gray-700"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="menu-bar flex items-center justify-end" span={9}>
          <div
            onClick={handleNavigateType}
            className="hover:text-yellow-500 cursor-pointer flex items-center"
          >
            <i className="fa-solid fa-clock mr-2 text-2xl"></i>
            <span>Sản phẩm</span>
          </div>
          <div
            onClick={() => navigate("/order")}
            className="hover:text-yellow-500 cursor-pointer ml-12 flex items-center"
          >
            <Badge size="small" count={order?.orderItems.length}>
              <i className="fa-solid text-white fa-cart-shopping mr-2 text-2xl"></i>
            </Badge>
            <span>Giỏ hàng</span>
          </div>
          <div className="flex items-center ml-12">
            <div className="mr-4">
              <i className="fa-solid fa-user text-2xl"></i>
            </div>
            {user?.name ? (
              <Popover content={content} title="">
                <div className="cursor-pointer">{name}</div>
              </Popover>
            ) : (
              <div
                onClick={handleNavigateLogin}
                className="cursor-pointer hover:text-yellow-500"
              >
                Đăng nhập/Đăng ký
              </div>
            )}
          </div>
        </div>
        <Col className="menu-icon flex items-center justify-end" span={9}>
          <MenuOutlined />
        </Col>
      </div>
    </div>
  );
};

export default HeaderComponent;
