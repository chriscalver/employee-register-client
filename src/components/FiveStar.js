import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function FiveStar() {

 const [rating, setRating] = useState(null);

  return (
    <>
      {[...Array(5)].map((star, index) => {

        const currentRating = index + 1;
        return (
          <label>
            <input 
            type="radio"
            name= "rating"
            value={currentRating} 
            onClick={() => setRating(currentRating)
               
            }
            
            />
            <FaStar size={30} />
          </label>
        );
      })}
    </>
  );
}
