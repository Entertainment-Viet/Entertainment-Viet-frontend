import React from 'react';
import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const TopSlider = ({ slides }) => (
  <Carousel
    infiniteLoop
    autoPlay
    style={{ display: 'inherit' }}
    className="slider-1"
  >
    {slides.map(slide => (
      <div className="container">
        <Image
          src={slide.image}
          height="315px"
          width="800px"
          borderRadius="10px"
          objectFit="cover"
        />
        <div className="top-text-block">
          <h4>Entertainment Viet</h4>
        </div>
      </div>
    ))}
  </Carousel>
);

TopSlider.propTypes = {
  slides: PropTypes.any,
};
export default TopSlider;
