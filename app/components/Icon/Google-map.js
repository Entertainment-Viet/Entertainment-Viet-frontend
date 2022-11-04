/* eslint-disable react/prop-types */
import React from 'react';

export default function GoogleMap({ color }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99967 10.8332C9.38039 10.8332 10.4997 9.71388 10.4997 8.33317C10.4997 6.95246 9.38039 5.83317 7.99967 5.83317C6.61896 5.83317 5.49967 6.95246 5.49967 8.33317C5.49967 9.71388 6.61896 10.8332 7.99967 10.8332Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99967 18.3332C11.333 14.9998 14.6663 12.0151 14.6663 8.33317C14.6663 4.65127 11.6816 1.6665 7.99967 1.6665C4.31778 1.6665 1.33301 4.65127 1.33301 8.33317C1.33301 12.0151 4.66634 14.9998 7.99967 18.3332Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
