// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { PRI_TEXT_COLOR, TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';

// import { StyleFunctionProps } from '@chakra-ui/theme-tools';
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1537px',
};
const theme = extendTheme(
  {
    breakpoints,
    colors: {
      primary: {
        main: PRI_TEXT_COLOR,
      },
    },
    components: {
      Progress: {
        baseStyle: {
          filledTrack: {
            bg: TEXT_GREEN,
          },
          track: {
            bg: TEXT_PURPLE,
          },
        },
      },
      Text: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
      Input: {
        baseStyle: {
          field: {
            bg: 'transparent',
            ':focus': {
              bg: 'transparent',
            },
            _hover: { backgroundColor: 'transparent' },
            _focus: {
              color: '#b6ff6d',
              fontSize: '15px',
              border: '1px solid #a0aec0',
              backgroundColor: 'transparent',
            },
            _placeholder: {
              color: '#b6ff6d',
              fontSize: '15px',
            },
          },
        },
        sizes: {},
        variants: {},
        defaultProps: {
          variant: null,
        },
      },
      Button: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
      FormLabel: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
      Select: {
        baseStyle: {
          field: {
            bg: 'white',
          },
        },
        defaultProps: {
          variant: null,
        },
      },
      Container: {
        baseStyle: {
          color: PRI_TEXT_COLOR,
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);

export default theme;
