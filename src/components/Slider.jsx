import React, { useEffect } from "react";
import { ApiStore } from "../store/ApiContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
const Slider = () => {
  const { movieSlider } = ApiStore();

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        slidesPerGroup={2}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movieSlider.length > 0 &&
          movieSlider.map((element) => (
            <SwiperSlide
              key={element.id}
              className=" h-48 border border-slate-900"
            >
              {element.original_title}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Slider;
