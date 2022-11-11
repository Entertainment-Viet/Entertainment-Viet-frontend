import { createGlobalStyle } from 'styled-components';

import FontWoff from './Font/SFProDisplay-Regular.woff';
import FontTtf from './Font/SFProDisplay-Regular.ttf';
import FontEot from './Font/SFProDisplay-Regular.eot';
import FontSvg from './Font/SFProDisplay-Regular.svg';

import FontBoldWoff from './FontBold/SFProDisplay-Bold.woff';
import FontBoldTtf from './FontBold/SFProDisplay-Bold.ttf';
import FontBoldEot from './FontBold/SFProDisplay-Bold.eot';
import FontBoldSvg from './FontBold/SFProDisplay-Bold.svg';

export default createGlobalStyle`
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
