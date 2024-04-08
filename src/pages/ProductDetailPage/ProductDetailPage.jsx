import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="mt-16 ">
      <h2 className="mb-12 py-3 pl-32 bg-slate-100">
        <span onClick={() => navigate("/")} className="font-semibold cursor-pointer hover:opacity-70">
          Trang chủ
        </span>{" "}
        - Chi tiết sản phẩm
      </h2>
      <ProductDetailComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailPage;
