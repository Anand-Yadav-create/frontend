import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from './redux/authSlice';
import { motion } from "framer-motion";
// import { motion } from "framer-motion";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
]

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? category.length - 1 : prev - 1));
    setClicked(!clicked);
  }
  const nextSlide = () => {
    setClicked(!clicked);
    setIndex((prev) => (prev === category.length - 1 ? 0 : prev + 1));
  }

  const searchJobHandler = (query) => {



    dispatch(setSearchedQuery(query));
    navigate("/browse");


  }

  const [clicked, setClicked] = useState(false);


  return (
    <div>



      <div className="relative w-96 h-48 overflow-hidden border rounded-lg" style={{ textAlign: "center", marginTop: "8px" }}>
        {/* <img src={category[index]} alt="carousel" className="w-full h-full object-cover" /> */}
        <button onClick={prevSlide} style={{ backgroundColor: "gray" }}>
          ❮
        </button>

        <motion.button animate={{
          scale: clicked ? 1.1 : 1,
          rotate: clicked ? 360 : 0,

        }}

          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          onClick={() => searchJobHandler(category[index])} style={{ backgroundColor: "red", height: "3rem", width: "10rem" }}>
          {category[index]}


        </motion.button>

        <button onClick={nextSlide} style={{ backgroundColor: "gray" }}>
          ❯
        </button>
      </div>


    </div>
  )
}

export default CategoryCarousel;

