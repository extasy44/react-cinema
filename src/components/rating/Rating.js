import React, { useState, useEffect, Fragment, useRef } from 'react';
import ProTypes from 'prop-types';
import './Rating.scss';

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStars] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map((i) => i + 1));
    let percentage;

    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }
    const startPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = startPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberOfStars &&
          numberOfStars.map((i) => (
            <Fragment key={i}>
              <i className="fa fa-star" area-hidden="true"></i>
            </Fragment>
          ))}

        <div className={`front-stars ${className}`} ref={ratingRef}>
          {numberOfStars &&
            numberOfStars.map((i) => (
              <Fragment key={i}>
                <i className="fa fa-star" area-hidden="true"></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: ProTypes.number.isRequired,
  totalStars: ProTypes.number.isRequired,
  className: ProTypes.string
};

export default Rating;
