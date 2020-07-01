import React, { useState } from 'react';
import './MainContent.scss';
import SlideShow from '../slide-show/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';

const MainContent = () => {
  const images = [
    {
      url: 'https://tr4.cbsistatic.com/hub/i/r/2020/04/07/c7294023-ff9e-470b-bfe2-4e685ad64686/resize/1200x900/b9b8e6b0deb434ecb8109ab94dac88f0/game-of-thrones-background.jpg',
      rating: 7.5
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg',
      rating: 9.5
    },
    {
      url: 'https://tr4.cbsistatic.com/hub/i/r/2020/04/07/c7294023-ff9e-470b-bfe2-4e685ad64686/resize/1200x900/b9b8e6b0deb434ecb8109ab94dac88f0/game-of-thrones-background.jpg',
      rating: 8.5
    },
    {
      url: 'https://tr4.cbsistatic.com/hub/i/r/2020/04/07/c7294023-ff9e-470b-bfe2-4e685ad64686/resize/1200x900/b9b8e6b0deb434ecb8109ab94dac88f0/game-of-thrones-background.jpg',
      rating: 7.8
    },
    {
      url: 'https://tr4.cbsistatic.com/hub/i/r/2020/04/07/c7294023-ff9e-470b-bfe2-4e685ad64686/resize/1200x900/b9b8e6b0deb434ecb8109ab94dac88f0/game-of-thrones-background.jpg',
      rating: 9.8
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (type) => {
    if (type === 'prev' && currentPage >= 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="main-content">
      <SlideShow images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={10} paginate={paginate} />
        </div>
      </div>
      <Grid images={images} />
    </div>
  );
};

export default MainContent;
