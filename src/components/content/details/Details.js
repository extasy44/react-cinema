import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Details.scss';
import { movieDetails } from '../../../redux/actions/movies';

import Rating from '../../rating/Rating';
import Tabs from './tabs/Tabs';
import Overview from './overview/Overview';
import Media from './media/Media';
import Crew from './crew/Crew';
import Reviews from './reviews/Reviews';
import { IMAGE_URL } from '../../../services/movies.service';

const Details = (props) => {
  const { movieDetails, movie } = props;
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    movieDetails(id);
    setDetails(movie[0]);
  }, [id, movie, movieDetails]);

  return (
    <>
      {details && (
        <div className="movie-container">
          <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details.backdrop_path})` }}></div>

          <div className="movie-overlay"></div>
          <div className="movie-details">
            <div className="movie-image">
              <img src={`${IMAGE_URL}${details.poster_path}`} alt="" />
            </div>
            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  {details.title} <span>{details.release_date}</span>
                </div>
                <div className="movie-genres">
                  <ul className="genres">{details && details.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}</ul>
                </div>
                <div className="rating">
                  <Rating className="rating-start" rating={details.vote_average} totalStars={5} />
                  &nbsp;
                  <span>{details.vote_average}</span>
                  <p>({details.vote_count}) Reviews</p>
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
      )}
    </>
  );
};

Details.propTypes = {
  movie: PropTypes.array,
  movieDetails: PropTypes.func,
  pathURL: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, { movieDetails })(Details);
