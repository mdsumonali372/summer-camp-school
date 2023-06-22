import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import usePopularClass from "../../../hooks/usePopularClass";

const PopularClass = () => {
  const [classes] = usePopularClass();
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold mb-3 px-10 md:px-0">Popular Class</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        autoplay={true}
        className="mySwiper"
      >
        {classes.map((item) => (
          <SwiperSlide key={item._id}>
            <img className=" h-32 md:h-64 w-full" src={item.image} alt="" />
            <div className="bg-orange-500 h-40 p-3">
              <h3 className="text-white text-[12px] md:text-xl font-bold">
                {item.className}
              </h3>
              <p className="text-white text-[12px] md:text-xl">
                Total Enrolled: {item.enrolled}
              </p>
              <p className="text-white text-[12px] md:text-xl">
                Price: ${item.price}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularClass;
