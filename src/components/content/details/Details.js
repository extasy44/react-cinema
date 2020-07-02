import React from 'react';

import './Details.scss';

import Rating from '../../rating/Rating';
import Tabs from './tabs/Tabs';
import Overview from './overview/Overview';
import Media from './media/Media';
import Crew from './crew/Crew';
import Reviews from './reviews/Reviews';

const Details = () => {
  return (
    <>
      <div className="movie-container">
        <div className="movie-bg" style={{ backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/back_pic/05/08/10/69597aa7e2441d0.jpg)` }}></div>

        <div className="movie-overlay"></div>
        <div className="movie-details">
          <div className="movie-image">
            <img src="https://png.pngtree.com/thumb_back/fw800/back_pic/05/08/10/69597aa7e2441d0.jpg" alt="" />
          </div>
          <div className="movie-body">
            <div className="movie-overview">
              <div className="title">
                {' '}
                Avengers <span>2020-10-10</span>
              </div>
              <div className="movie-genres">
                <ul className="genres">
                  <li>Actions</li>
                  <li>Comedy</li>
                  <li>Sci-fi</li>
                </ul>
              </div>
              <div className="rating">
                <Rating className="rating-start" rating={6.5} totalStars={5} />
                &nbsp;
                <span>6.5</span>
                <p>(200) Reviews</p>
              </div>
              <Tabs>
                <div label="overview">
                  <Overview />
                </div>
                <div label="crew">
                  <Crew />
                </div>
                <div label="media">
                  <Media />
                </div>
                <div label="reviews">
                  <Reviews />
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
