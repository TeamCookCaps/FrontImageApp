import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecommandImage } from '../api/recommand';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


export default function Banner() {
  const { user } = useAuthContext();
  const { isLoading, isFetching, error, data : result } = useQuery(['recommandImage'], () => getRecommandImage(user.uid));


  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    pauseOnHover: true,
  };

  return (
    <section className="flex flex-col items-center">
      {result && 
          <Link
            to="/recommand"
            className="flex justify-center items-center"
          >
            <img
              src={result[0]?.image_url}
              alt="recommandImage"
              className="h-1/4 w-1/4 object-cover object-center lg:h-1/4 lg:w-1/4"
            />
          </Link>
      }
    </section>
  );
}
