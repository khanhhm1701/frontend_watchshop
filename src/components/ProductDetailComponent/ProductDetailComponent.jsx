import { Image, Input, InputNumber, Rate } from "antd";
import React, { useEffect, useState } from "react";
import * as ProductApi from "../../api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { currencyFormatter } from "../../service/currencyFormater";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import CommentComponent from "../CommentComponent/CommentComponent";
import LongBanner from "../LongBanner/LongBanner";
import { initFacebookSDK } from "../../untils";

const ProductDetailComponent = ({ idProduct }) => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const [numProduct, setNumProduct] = useState(1);

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductApi.getDetailsProduct(id);
      return res.data;
    }
  };

  const { data: productDetails } = useQuery(["product-details", idProduct], fetchGetDetailsProduct, { enabled: !!idProduct });

  const handleNumProduct = (e) => {
    setNumProduct(Number(e.target.value));
  };
  console.log("num", numProduct);

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else if (type === "decrease" && numProduct > 1) {
      setNumProduct(numProduct - 1);
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  useEffect(() => {
    initFacebookSDK()
  }, [])

  return (
    <div className="px-32 w-full mb-12">
      <div className="flex w-full mb-12">
        {/* Ảnh */}
        <div className="w-2/5 flex flex-col gap-4">
          <div className="w-full p-4 border flex justify-center overflow-hidden">
            <Image className="w-full" src={productDetails?.image} />
          </div>
          <div className="w-full flex justify-between gap-4">
            <Image className="border p-2" src={productDetails?.image} />
            <Image className="border p-2" src={productDetails?.image} />
            <Image className="border p-2" src={productDetails?.image} />
            <Image className="border p-2" src={productDetails?.image} />
          </div>
        </div>
        {/* Thông tin */}
        <div className="flex-1 ml-12">
          <h2 className="font-bold text-4xl mb-6">{productDetails?.name}</h2>
          <div className="flex mb-6">
            <Rate className="mr-4" allowHalf disabled value={productDetails?.rating} />
            <span className="pl-4 border-l border-slate-400">Số lượng còn lại: {productDetails?.countInStock}</span>
          </div>
          <div className="mt-6 py-6 border-y flex flex-col gap-2">
            <p>
              <span className="font-bold">Mô tả: </span>
              {productDetails?.description}{" "}
            </p>
            <p>
              <span className="font-bold">Thương hiệu: </span>
              {productDetails?.type}
            </p>
          </div>
          <div className="py-6 border-b flex flex-col gap-2">
            <p className="font-bold text-4xl text-yellow-700">{currencyFormatter.format(productDetails?.price)}</p>
          </div>
          <div className="mt-6 pb-6 border-b">
            <span className="">Số lượng:</span>
            <div className="mt-3 flex items-center">
              <button onClick={() => handleChangeCount("increase")} className="bg-black text-white px-3 py-1 mr-2 rounded hover:opacity-70">
                <i className="fa-solid fa-plus "></i>
              </button>
              <Input onChange={(e) => handleNumProduct} className="w-16" value={numProduct} />
              <button onClick={() => handleChangeCount("decrease")} className="bg-black text-white px-3 py-1 ml-2 rounded hover:opacity-70">
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          </div>
          <div className="mt-6 flex gap-8">
            <button onClick={handleAddOrderProduct} className="bg-black text-white p-3 w-36 text-lg font-semibold hover:opacity-70">
              Chọn mua
            </button>
            <button className="bg-white text-black p-3 w-36 text-lg font-semibold border-2 border-black hover:bg-slate-100">Mua trả sau</button>
          </div>
        </div>
      </div>
      <CommentComponent dataHref="https://developers.facebook.com/docs/plugins/comments#configurator" width= "1320"/>
    </div>
  );
};

export default ProductDetailComponent;
