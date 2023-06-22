import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import slider3 from "../../../../assets/combine-img1.webp";
import slider1 from "../../../../assets/slider1-1.jpg";
import slider2 from "../../../../assets/slider2-1.jpg";
import ContactPage from "../../ContactPage/ContactPage";
import PopularClass from "../PopularClass/PopularClass";
import PopuLarInstructor from "../PopuLarInstructor/PopuLarInstructor";
import "./Home.css";
const Home = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <div className="fixed right-0 z-40">
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
        <div onClick={toggleTheme}>
          <button className="btn">Change Them Mode</button>
        </div>
      </div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <img src={slider1} alt="" />
          <div className="absolute top-1/2 left-1/2 w-full -translate-y-1/2 -translate-x-1/2 text-center space-y-5">
            <h3 className="md:text-2xl text-white">
              Create the best moves for you
            </h3>
            <h2 className="uppercase md:text-8xl font-bold text-white">
              DANCE TO BE THE BEAT
            </h2>
            <button className="btn btn-primary uppercase text-white">
              our services
            </button>
            <button className="btn btn-outline btn-primary uppercase ml-5 text-white">
              get a quote
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img src={slider2} alt="" />
          <div className="absolute top-0 mt-20 ml-24 space-y-4">
            <h3 className="md:text-2xl text-white">Be in the</h3>
            <h2 className="md:text-8xl font-bold text-blue-600 uppercase">
              SPOTLIGHT
            </h2>
            <p className="text-white italic">
              Learn from best dance - professionals
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
        </SwiperSlide>
      </Swiper>
      <div className="max-w-screen-xl mx-auto">
        <PopularClass></PopularClass>
        <div>
          <PopuLarInstructor></PopuLarInstructor>
        </div>
        <ContactPage></ContactPage>
      </div>
    </>
  );
};

export default Home;
