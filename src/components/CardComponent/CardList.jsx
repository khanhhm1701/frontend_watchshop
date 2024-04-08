import React, { useEffect, useRef, useState } from "react";
import CardComponent from "./CardComponent";
import * as ProductApi from "../../api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "./pagination.scss";

const CardList = ({ brandFilters, ratingFilter, priceRangeFilter }) => {
  const searchValue = useSelector((state) => state.product?.search);
  const refSearch = useRef();

  const [currentPage, setCurrentPage] = useState(0);

  const [stateProduct, setStateProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProductAll = async (search) => {
    const res = await ProductApi.getAllProducts(search);
    if (search?.length > 0 || refSearch.current) {
      setStateProduct(res?.data);
      return [];
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      fetchProductAll(searchValue);
    }
    refSearch.current = true;
  }, [searchValue]);

  const { data: products } = useQuery(["products"], fetchProductAll, { retry: 3, retryDelay: 1000 });
  // console.log("data", products);

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProduct(products?.data);
    }
  }, [products]);

  useEffect(() => {
    const filtered = stateProduct.filter((product) => {
      const passBrandFilter = brandFilters.length === 0 || brandFilters.includes(product.type);
      const passRatingFilter = !ratingFilter || product.rating >= ratingFilter;
      const passPriceRangeFilter =
        (!priceRangeFilter.min || product.price >= parseInt(priceRangeFilter.min)) &&
        (!priceRangeFilter.max || product.price <= parseInt(priceRangeFilter.max));

      return passBrandFilter && passRatingFilter && passPriceRangeFilter;
    });

    setFilteredProducts(filtered);
    setCurrentPage(0);
  }, [brandFilters, ratingFilter, priceRangeFilter]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const productsPerPage = 10;
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const slicedProducts = filteredProducts.length > 0 ? filteredProducts.slice(startIndex, endIndex) : stateProduct.slice(startIndex, endIndex);
  const pageCount = filteredProducts.length > 0 ? Math.ceil(filteredProducts.length / productsPerPage) : Math.ceil(stateProduct.length / productsPerPage);

  return (
    <div className="flex-1 min-h-screen">
      <div className={`grid grid-cols-5 gap-6 my-12`}>
        {slicedProducts?.map((product) => (
          <CardComponent
            key={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            rating={product.rating}
            selled={product.selled}
            discount={product.discount}
            countInStock={product.countInStock}
            id={product._id}
          />
        ))}
      </div>

      <ReactPaginate
        previousLabel={<i className="fa-solid fa-angles-left text-slate-500"></i>}
        nextLabel={<i className="fa-solid fa-angles-right text-slate-500"></i>}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default CardList;
