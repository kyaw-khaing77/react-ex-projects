import React, { useState } from "react";

const Tour = ({ id, image, info, price, name, removeTour }) => {
  const [readMore, setReadMore] = useState(false);

  const readMoreHandler = () => {
    setReadMore(!readMore);
  };

  const notInterestedHandler = () => {
    removeTour(id);
  };

  return (
    <article className="single-tour">
      <img src={image} alt={name}></img>
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={readMoreHandler}>
            {" "}
            {readMore ? "Show Less" : "Read More"}
          </button>
        </p>
        <button className="delete-btn" onClick={notInterestedHandler}>
          not interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;
