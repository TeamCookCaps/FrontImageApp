import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecommandImage } from '../api/recommand';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function Banner() {
  const { user } = useAuthContext();
  const { isLoading, isFetching, error, data : result } = useQuery(['recommandImage'], () => getRecommandImage(user.uid));
  const idx = 0

  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <section className="items-center">
      {result &&
          <Link
            to="/recommand"
            className="flex justify-center items-center"
          >
            <img
              src={result[idx]?.image_url}
              alt="recommandImage"
              className="h-54 w-96 object-cover object-center lg:h-54 lg:w-96"
            />
          </Link>
      }
      {/* <Slider {...settings}>
        {result && result?.map((recommand) => (
          <div key={recommand.id} className="justify-center items-center">
          <img
            src={recommand.image_url}
            alt="recommandImage"
            className="h-54 w-96 lg:h-54 lg:w-96"
          />
          </div>
        ))}
      </Slider> */}
    </section>
  );
}
