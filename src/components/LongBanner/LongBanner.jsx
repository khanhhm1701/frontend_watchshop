import React from "react";
import "./long_banner.scss";
import { Link } from "react-router-dom";

const LongBanner = ({ img }) => {
  return (
    <div className="relative">
      <img src={img} alt="Banner" className="mb-0"/>
      <Link to='/type' className="btn w-48 text-center absolute bottom-0 right-0 transform translate-y-1/2">XEM NGAY</Link>
    </div>
  );
};

export default LongBanner;
