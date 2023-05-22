import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecommandImage } from '../api/recommand';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../App.css';


export default function Banner() {
  const { user } = useAuthContext();
  const { isLoading, isFetching, error, data : result } = useQuery(['recommandImage'], () => getRecommandImage(user.uid));

  return (
    <section className="items-center">
        <Swiper
          allowTouchMove={false}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="mySwiper"
          loop={true}
          loopAdditionalSlides={1}
          navigation={true}
          modules={[Navigation, Pagination]}
          onActiveIndexChange={(swiper) => {
            console.log(swiper.activeIndex);
          }}
          // style={{
          //   width: '480px',
          //   padding: '50px 0px 50px'
          // }}
        >
        {result && result?.map((recommand) => (
          <SwiperSlide>
          <Link
            to="/recommand"
            className="flex justify-center items-center"
          >
          <img
            src={recommand.image_url}
            alt="recommandImage"
            // style={{
            //   width: '100%',
            //   height: '270px'
            // }}  
          />
          </Link>
          </SwiperSlide>
        ))}
        </Swiper>
    </section>
  );
}
