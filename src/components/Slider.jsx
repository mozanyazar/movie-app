import React, { useEffect } from "react";
import { ApiStore } from "../store/ApiContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import "../css/Slider.css";
import { UserAuth } from "../store/AuthContext";
import { WatchListStore } from "../store/WatchListContext";
const Slider = () => {
  const { movieSlider, dataSnapShot } = ApiStore();
  const { WatchListHandler } = WatchListStore();

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        slidesPerGroup={4}
        loop={false}
        pagination={{
          clickable: false,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper home-page-slider"
        breakpoints={{
          300: {
            // min-width: 300
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          600: {
            // min-width: 600,
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          828: {
            // min-width: 828,
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1240: {
            // min-width: 1240,
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {movieSlider.length > 0 &&
          movieSlider.map((element) => (
            <SwiperSlide key={element.id}>
              <img
                className="slider-image"
                src={`https://image.tmdb.org/t/p/w342/${element.poster_path}`}
                alt={`${element.original_title}`}
              />

              <div className="slider-texts-wrapper">
                <div className="slider-title-group">
                  <h5 className="slider-title">{element.original_title}</h5>
                  <span>
                    {" "}
                    Rate : <b>{element.vote_average}</b>{" "}
                  </span>
                </div>
                <div className="button-group-slide">
                  <button onClick={dataSnapShot} className="read-more">
                    Read More
                  </button>
                  <button
                    onClick={() => WatchListHandler(element)}
                    className="add-watch-list"
                  >
                    Add Watch List
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Slider;
