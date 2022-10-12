import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ isActive }) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.0833H15M1 15.0833H15"
        stroke={isActive}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 1.08337H1V7.08337H15V1.08337Z"
        stroke={isActive}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
Categories.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
