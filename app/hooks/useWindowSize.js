/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';

const isClient = typeof window === 'object';

function getSize() {
  return {
    width: isClient ? screen.width : undefined,
    height: isClient ? screen.height : undefined,
  };
}

// https://usehooks.com/useWindowSize/
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    if (isClient) {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    return undefined;
  }, []);

  return windowSize;
}
