import React from "react";

function getStars(value) {
  const stars = [];
  const [whole, part] = parseFloat(value).toString().split(".");
  for (let i = 0; i < whole; i++) stars.push(100);
  if (part) stars.push(50);
  for (let i = whole; i < (part ? 4 : 5); i++) stars.push(0);

  return stars;
}

const qualityRatingStars = '../../assets/rating-stars'

export default function Rating({ value }) {
  console.log(`${qualityRatingStars}/${value}.png`)
  return (
    <div>
      {getStars(value).map((value) => (
        <img className="inline-block h-8" src={`${qualityRatingStars}/${value}.png`} alt="" />
      ))}
    </div>
  );
}