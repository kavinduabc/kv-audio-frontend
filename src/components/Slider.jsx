import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import PCard from './ProductCard';
import toast from 'react-hot-toast';

const Slider = () => {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/featured`)
        .then((res) => {
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 3 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="pt-[50px] bg-gray-100">
      <h3 className='m-3 text-2xl text-[#333] font-medium'>FEATURED PRODUCTS.</h3>
      {state === "loading" ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      ) : (
        <Carousel
  responsive={responsive}
  autoPlay={true}
  autoPlaySpeed={1000}
  infinite={true}
  showDots={false}
  arrows={false}

  className='bg-gray-100 w-full h-[400px]  items-center'
>
  {items.map((item) => (
    <PCard key={item.key} item={item} />
  ))}
</Carousel>

      )}
    </div>
  );
};

export default Slider;
