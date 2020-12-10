import React from "react";

function getStars(value) {
  const stars = [];
  const [whole, part] = parseFloat(value).toString().split(".");
  for (let i = 0; i < whole; i++) stars.push(100);
  if (part) stars.push(50);
  for (let i = whole; i < (part ? 4 : 5); i++) stars.push(0);

  return stars;
}

export default function Rating({ value }) {
  return (
    <div>
      {getStars(value).map((value, i) => (
        <img
          key={i}
          className="inline-block h-8"
          src={require(`../../assets/rating-stars/${value}.png`)}
          alt=""
        />
      ))}
    </div>
  );
}
