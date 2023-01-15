export const ENUM_LANGS = {
  en: 'en',
  vi: 'vi',
};
export const GAP = '1rem';
export const PRI_TEXT_COLOR = '#00D5FF';
export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
  mob: `(max-width: 767px)`,
  tab: `(min-width: ${size.tablet}) and (max-width: 1023px)`,
  lap: `(min-width: ${size.laptop})`,
  des: `(min-width: ${size.laptopL})`,
};
export const ENUM_DEFAULT_LANGS = ENUM_LANGS.vi;
