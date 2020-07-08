import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Main.scss';

import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';
import { pathURL } from '../../redux/actions/routes';
import SearchResult from '../search-result/SearchResult';

const Main = (props) => {
  const { loadMoreMovies, page, totalPages, movieType, searchResult, loadingMore, match, pathURL } = props;
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    pathURL(match.path, match.url);
    setResponsePageNumber(currentPage, totalPages);
    // eslint-disable-next-line
  }, [currentPage, totalPages, page]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };

  return (
    <div className="main" onScroll={() => handleScroll()} ref={mainRef}>
      {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}</>}
      <div className="bottom-line" ref={bottomLineRef}>
        {loadingMore ? <Spinner /> : ''}
      </div>
    </div>
  );
};

Main.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  totalPage: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  movieType: PropTypes.string,
  totalPages: PropTypes.number,
  searchResult: PropTypes.array,
  pathURL: PropTypes.func,
  match: PropTypes.object,
  loadingMore: PropTypes.bool,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  searchResult: state.movies.searchResult,
  loadingMore: state.movies.loadingMore,
  errors: state.errors
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber, pathURL })(Main);
