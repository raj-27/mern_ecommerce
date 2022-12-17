import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import './productImageSlider.scss'
const ProductImageSlider = ({images}) => {
  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      navigation={true}
      modules={[Pagination, Navigation]}
      grabCursor={true}
      className="product-images-slider"
    >
      {images &&
        images.map((item, index) => (
          <SwiperSlide key={item.url}>
            <img src={item.url} alt={`${index}Slide`} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ProductImageSlider;
