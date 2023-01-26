import { useState, useEffect } from 'react';
import { useWindowSize } from './useWindowSize';

export const MOBILE_WIDTH = 915;
export const TABLET_WIDTH = 1024;

export function useIsMobileView() {
  const { width } = useWindowSize();
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    if (!width) return;
    setIsMobileView(width <= MOBILE_WIDTH);
  }, [width]);
  return isMobileView;
}

export function useIsTabletView() {
  const { width } = useWindowSize();
  const [isTabletView, setIsTabletView] = useState(false);
  useEffect(() => {
    if (!width) return;
    setIsTabletView(width <= TABLET_WIDTH && width > MOBILE_WIDTH);
  }, [width]);
  return isTabletView;
}
