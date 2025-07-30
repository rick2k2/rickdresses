import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/ImageSlider.css";

const ImageSlider = () => {
  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img src="/assests/rdb1.png" alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assests/rdb2.png" alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assests/rdb3.png" alt="Slide 3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
