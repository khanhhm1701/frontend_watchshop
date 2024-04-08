import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Banner1 from "../../assets/img/banner/banner1.png";
import Banner2 from "../../assets/img/banner/banner2.png";
import Banner3 from "../../assets/img/banner/banner3.png";

const Banner = () => {
  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src={Banner1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner2} alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner3} alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
