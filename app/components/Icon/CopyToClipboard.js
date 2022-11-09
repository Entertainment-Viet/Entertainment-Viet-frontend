import React from 'react';
import PropTypes from 'prop-types';

export default function CopyToClipboard({ size, handleCopyClipboard }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => handleCopyClipboard()}
    >
      <g opacity="0.6">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 5V14C17 14.5523 17.4477 15 18 15C18.5523 15 19 14.5523 19 14V4C19 3.44772 18.5523 3 18 3H11C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H17Z"
          fill="#B6FF6D"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 6C5.44772 6 5 6.44772 5 7V19C5 19.5523 5.44772 20 6 20H15C15.5523 20 16 19.5523 16 19V7C16 6.44772 15.5523 6 15 6H6ZM7 18V8H14V18H7Z"
        fill="#B6FF6D"
      />
    </svg>
  );
}
CopyToClipboard.propTypes = {
  size: PropTypes.number,
  handleCopyClipboard: PropTypes.func,
};
