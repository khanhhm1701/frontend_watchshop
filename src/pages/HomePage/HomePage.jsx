import React from "react";
import TypeProducts from "../../components/TypeProducts/TypeProducts";
import Banner from "../../components/Banner/Banner";
import CardList from "../../components/CardComponent/CardList";
import LongBanner from "../../components/LongBanner/LongBanner";
import LongImg from "../../assets/img/long_banner/long_banner3.png";
import CollectionList from "../../components/Collection/CollectionList";
import AtlanticImg from "../../assets/img/home_brand/atlantic.jpg";
import CitizenImg from "../../assets/img/home_brand/citizen.jpg";
import EposImg from "../../assets/img/home_brand/epos.jpg";
import OrientImg from "../../assets/img/home_brand/orient.jpg";
import SeikoImg from "../../assets/img/home_brand/seiko.jpg";
import SrWatchImg from "../../assets/img/home_brand/srwatch.jpg";
import "./responsive.scss";

const HomePage = () => {
  const typeProduct = [
    { id: 1, name: "Citizen", image: CitizenImg },
    { id: 2, name: "Orient", image: OrientImg },
    { id: 3, name: "Seiko", image: SeikoImg },
    { id: 4, name: "Epos", image: EposImg },
    { id: 5, name: "SRWatch", image: SrWatchImg },
    { id: 6, name: "Atlantic", image: AtlanticImg },
  ];

  return (
    <div className="mt-16">
      <Banner />
      <TypeProducts types={typeProduct} />
      <CollectionList types={typeProduct} />
      <LongBanner img={LongImg} />
      <div className="px-32 my-16">
        <h2 className="font-semibold text-3xl mb-16">SẢN PHẨM NỔI BẬT</h2>
        <CardList />
      </div>
    </div>
  );
};

export default HomePage;
