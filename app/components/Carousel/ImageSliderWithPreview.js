import React from 'react';
// import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSliderWithPreview = ({ slides }) => (
  <Carousel>
    {slides.map(slide => (
      <div className="h-128">
        <img alt="Description" src={slide} />
      </div>
    ))}
  </Carousel>
);

ImageSliderWithPreview.propTypes = {
  slides: PropTypes.any,
};
export default ImageSliderWithPreview;
