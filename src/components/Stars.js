import "./Stars.css";
import React, { useState, useEffect } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "lightgrey";
const DEFAULT_COLOR = "#FFC300";

export default function Stars({ count, defaultRating, icon, color, iconSize }) {
// console.log("lllll" + defaultRating);
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0);


  useEffect(() => {
    if (defaultRating !== 0) setRating(localStorage.getItem("starRating"));
    //localStorage.setItem("starRating", 0);

   // console.log(rating);
  }, [defaultRating]);


  let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

  const handleClick = (rating) => {
    // sets clicked value to local storage
    localStorage.setItem("starRatingTemp", rating);
    console.log("temp Star rating " + localStorage.getItem("starRatingTemp"));
    setRating(rating);
    
  };

  return (
    <div className="starsContainer">
      {stars.map((item, index) => {
        const isActiveColor =
          (rating || temporaryRating) &&
          (index < rating || index < temporaryRating);

        let elementColor = "";

        if (isActiveColor) {
          elementColor = color || DEFAULT_COLOR;
        } else {
          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div
            className="star"
            key={index}
            style={{
              fontSize: iconSize ? `${iconSize}px` : "14px",
              color: elementColor,
              filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
            }}
            onMouseEnter={() => setTemporaryRating(index + 1)}
            onMouseLeave={() => setTemporaryRating(0)}
            onClick={() => handleClick(index + 1)}
          >
            {icon ? icon : DEFAULT_ICON}
          </div>
        );
      })}
    </div>
  );
}
