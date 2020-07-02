import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './Grid.scss';

import Rating from '../../rating/Rating';
import LazyImage from '../../lazy-image/LazyImage';
import { IMAGE_URL } from '../../../services/movies.service';
const Grid = (props) => {
  const { list } = props;
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    const pattern = /[&\\#,+()$~%.'":*?<>{}]/g;
    return titleStr.replace(pattern, '-');
  };

  return (
    <>
      <div className="grid">
        {movieData.map((data, i) => (
          <div key={uuidv4()}>
            <LazyImage className="grid-cell" alt="placholder" src={`${IMAGE_URL}${data.poster_path}`}>
              <div className="grid-read-more">
                <button className="grid-cell-button">
                  <Link to={`${data.id}/${formatMovieTitle(data.title)}/details`}>Read More</Link>
                </button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">{data.title}</span>
                <div className="grid-detail-rating">
                  <Rating rating={data.vote_average} totalStars={10} />
                  &nbsp; &nbsp;
                  <div className="grid-vote-average">{data.vote_average}</div>
                </div>
              </div>
            </LazyImage>
          </div>
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list
});
export default connect(mapStateToProps, {})(Grid);
