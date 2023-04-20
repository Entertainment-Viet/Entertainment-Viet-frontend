import { createGlobalStyle } from 'styled-components';

// OLD
import FontWoff from './Font/SFProDisplay-Regular.woff';
import FontTtf from './Font/SFProDisplay-Regular.ttf';
import FontEot from './Font/SFProDisplay-Regular.eot';
import FontSvg from './Font/SFProDisplay-Regular.svg';

import FontBoldWoff from './FontBold/SFProDisplay-Bold.woff';
import FontBoldTtf from './FontBold/SFProDisplay-Bold.ttf';
import FontBoldEot from './FontBold/SFProDisplay-Bold.eot';
import FontBoldSvg from './FontBold/SFProDisplay-Bold.svg';

// font-weight: 100
import SFProDisUltralight from './NewFont/SF-Pro-Display-Ultralight.otf';
import SFProDisUltralightItalic from './NewFont/SF-Pro-Display-UltralightItalic.otf';

// font-weight: 200
import SFProDisThin from './NewFont/SF-Pro-Display-Thin.otf';
import SFProDisThinItalic from './NewFont/SF-Pro-Display-ThinItalic.otf';

// font-weight: 300
import SFProDisLight from './NewFont/SF-Pro-Display-Light.otf';
import SFProDisLightItalic from './NewFont/SF-Pro-Display-LightItalic.otf';

// font-weight: 400
import SFProDisRegular from './NewFont/SF-Pro-Display-Regular.otf';
import SFProDisRegularItalic from './NewFont/SF-Pro-Display-RegularItalic.otf';

// font-weight: 500
import SFProDisMedium from './NewFont/SF-Pro-Display-Medium.otf';
import SFProDisMediumItalic from './NewFont/SF-Pro-Display-MediumItalic.otf';

// font-weight: 600
import SFProDisSemibold from './NewFont/SF-Pro-Display-Semibold.otf';
import SFProDisSemiboldItalic from './NewFont/SF-Pro-Display-SemiboldItalic.otf';

// font-weight: 700
import SFProDisBold from './NewFont/SF-Pro-Display-Bold.otf';
import SFProDisBoldItalic from './NewFont/SF-Pro-Display-BoldItalic.otf';

// font-weight: 800
import SFProDisHeavy from './NewFont/SF-Pro-Display-Heavy.otf';
import SFProDisHeavyItalic from './NewFont/SF-Pro-Display-HeavyItalic.otf';

// font-weight: 900
import SFProDisBlack from './NewFont/SF-Pro-Display-Black.otf';
import SFProDisBlackItalic from './NewFont/SF-Pro-Display-BlackItalic.otf';

export default createGlobalStyle`
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisUltralight});
        font-weight: 100;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisUltralightItalic});
        font-weight: 100;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisThin});
        font-weight: 200;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisThinItalic});
        font-weight: 200;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisLight});
        font-weight: 300;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisLightItalic});
        font-weight: 300;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisRegular});
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisRegularItalic});
        font-weight: 400;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisMedium});
        font-weight: 500;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisMediumItalic});
        font-weight: 500;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisSemibold});
        font-weight: 600;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisSemiboldItalic});
        font-weight: 600;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisBold});
        font-weight: 700;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisBoldItalic});
        font-weight: 700;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisHeavy});
        font-weight: 800;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisHeavyItalic});
        font-weight: 800;
        font-style: italic;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisBlack});
        font-weight: 900;
    }
    @font-face {
        font-family: 'SF Pro Display';
        src: url(${SFProDisBlackItalic});
        font-weight: 900;
        font-style: italic;
    }
    @font-face {
        font-family: 'SVN-Gilroy';
        src: url(${FontEot});
        src: local('☺'),
        url(${FontWoff}) format('woff'),
        url(${FontTtf}) format('truetype'),
        url(${FontSvg}) format('svg');
    }

    @font-face {
        font-family: 'SVN-Gilroy Bold';
        src: url(${FontBoldEot});
        src: local('☺'),
        url(${FontBoldWoff}) format('woff'),
        url(${FontBoldTtf}) format('truetype'),
        url(${FontBoldSvg}) format('svg');
    }
`;
