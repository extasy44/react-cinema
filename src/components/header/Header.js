import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import logo from '../../assets/cinema-logo.svg';
import { getMovies, setMovieType, setResponsePageNumber, searchResult, searchQuery, clearMovieDetails } from '../../redux/actions/movies';
import { pathURL } from '../../redux/actions/routes';
import { setError } from '../../redux/actions/errors';
import './Header.scss';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = (props) => {
  const { getMovies, setMovieType, page, totalPages, searchResult, searchQuery, clearMovieDetails, routesArray, path, url, pathURL, setError, errors } = props;
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');
  const [search, setSearch] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (errors.message || errors.statusCode) {
      pathURL('/', '/');
      const error = new Error(`${errors.message} with status code ${errors.statusCode}`);
      setError({ message: `Page with pathname ${location.pathname} not found`, statusCode: 404 });
      throw error;
    }
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    if (routesArray.length) {
      if (!path && !url) {
        pathURL('/', '/');
        const error = new Error(`Page with pathname ${location.pathname} not found with status code 404`);
        setError({ message: `Page with pathname ${location.pathname} not found`, statusCode: 404 });
        throw error;
      }
    }

    // eslint-disable-next-line
  }, [path, url, routesArray, pathURL]);

  useEffect(() => {
    getMovies(type, page);
    setResponsePageNumber(page, totalPages);

    if (location.pathname !== '/' && location.key) {
      setDisableSearch(true);
    }

    // eslint-disable-next-line
  }, [type, disableSearch, location]);

  const setMovieTypeUrl = (type) => {
    setDisableSearch(false);

    if (location.pathname !== '/') {
      clearMovieDetails();
      history.push('/');
    }
    setSearch('');
    searchQuery('');
    searchResult('');
    setType(type);
    setMovieType(type);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    searchQuery(e.target.value);
    searchResult(e.target.value);
  };

  const toggleMenu = () => {
    menuClass = !menuClass;
    navClass = !navClass;
    setMenuClass(menuClass);
    setNavClass(navClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image" onClick={() => setMovieTypeUrl('now_playing')}>
            <img src={logo} alt="Cinema" />
          </div>
          <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={() => toggleMenu()}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
            {HEADER_LIST.map((data) => (
              <li key={data.id} className={data.type === type ? 'header-nav-item active-item' : 'header-nav-item'} onClick={() => setMovieTypeUrl(data.type)}>
                <span className="header-list-name">
                  <i className={data.iconClass} />
                </span>
                &nbsp;
                <span className="header-list-name">{data.name}</span>
              </li>
            ))}
            <input className={`search-input ${disableSearch ? 'disabled' : ''}`} type="text" onChange={onSearchChange} value={search} placeholder="Search for a movie" />
          </ul>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  getMovies: PropTypes.func,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  searchResult: PropTypes.func,
  searchQuery: PropTypes.func,
  clearMovieDetails: PropTypes.func,
  path: PropTypes.string,
  url: PropTypes.string,
  routesArray: PropTypes.array,
  pathURL: PropTypes.func,
  setError: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  routesArray: state.routes.routesArray,
  path: state.routes.path,
  url: state.routes.url,
  errors: state.errors
});

export default connect(mapStateToProps, { getMovies, setMovieType, setResponsePageNumber, searchResult, searchQuery, clearMovieDetails, pathURL, setError })(Header);
