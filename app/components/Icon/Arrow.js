import React from 'react';
import PropTypes from 'prop-types';

export default function Arrow({ onClick, colorIcon, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M1 8H15M15 8L8 1M15 8L8 15"
        stroke={colorIcon}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Arrow.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.number,
  colorIcon: PropTypes.string,
};
