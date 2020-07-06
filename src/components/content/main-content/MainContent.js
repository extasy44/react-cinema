import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './MainContent.scss';
import SlideShow from '../slide-show/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';
import { IMAGE_URL } from '../../../services/movies.service';
import { getMovies, setResponsePageNumber } from '../../../redux/actions/movies';

const MainContent = (props) => {
  const { list, movieType, totalPages, page, getMovies, setResponsePageNumber } = props;
  const [images, setImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(page);
  const randomMovies = list.sort(() => Math.random() - Math.random()).slice(0, 4);

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'upcoming'
  };

  useEffect(() => {
    if (randomMovies.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}/${randomMovies[0].backdrop_path}`,
          title: randomMovies[0].title,
          overview: randomMovies[0].overview
        },
        {
          id: 2,
          url: `${IMAGE_URL}/${randomMovies[1].backdrop_path}`,
          title: randomMovies[1].title,
          overview: randomMovies[1].overview
        },
        {
          id: 3,
          url: `${IMAGE_URL}/${randomMovies[2].backdrop_path}`,
          title: randomMovies[2].title,
          overview: randomMovies[2].overview
        },
        {
          id: 4,
          url: `${IMAGE_URL}/${randomMovies[3].backdrop_path}`,
          title: randomMovies[3].title,
          overview: randomMovies[3].overview
        }
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(page);
    // eslint-disable-next-line
  }, [page, totalPages]);

  const paginate = (type) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    setResponsePageNumber(pageNumber, totalPages);
    getMovies(movieType, pageNumber);
  };

  return (
    <div className="main-content">
      <SlideShow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <Grid images={images} />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  movieType: PropTypes.string,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  getMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  movieType: state.movies.movieType,
  totalPages: state.movies.totalPages,
  page: state.movies.page
});
export default connect(mapStateToProps, { getMovies, setResponsePageNumber })(MainContent);
