import { createGlobalStyle } from 'styled-components';
import { device, PRI_FONTCOLOR, INACTIVE_COLOR } from './constants/styles';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;

    font-family: SF Pro Display, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  
    @media ${device.mob} {
      font-size: 12px;
    }
  
    @media ${device.tab} {
      font-size: 14px;
    }
    
    @media ${device.lap} {
      font-size: 16px;
    }
  }

  strong, b, h1, h2, h3, h4, h5, h6{
    font-family: SF Pro Display, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: SF Pro Display, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .nomargin{margin:0;}
  #app {
    background: linear-gradient(205.76deg, #090F36 0%, #07091A 100%);
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;
  }

  p, label, section, input {
    font-style: normal;
    font-weight: normal;
    line-height: 17px;

    color: ${PRI_FONTCOLOR};
  }
  button, [type="button"], [type="reset"], [type="submit"] {
    border: 0;
  }
  .hidden{display: none !important;}
  .wrapper{
    padding: 0 16px;
  }
  .text-center{
    text-align: center;
  }
  .text-right{
    text-align: right;
  }
  .text-left{
    text-align: left;
  }
  
  .disabled, .disabled *{
    pointer-events: none;
    cursor: default;
  }
  .header-column, .header-row{
    display: flex;
    min-height: 100vh;
  }

  .header-column{
    flex-direction: column;
  }
  .header-column .slogan{display:none;}

  a.disabled {
    background-color: ${INACTIVE_COLOR};
  }

  @media screen and (min-width: 993px) {
    .header-row{
      flex-direction: row;
      justify-content: center;
      max-width: inherit;
    }
    .header-row>div{
      align-self: center;
      align-items: stretch;
      width: 100%;
    }
  }
  @media screen and (max-width: 992px) {
    .header-row{
      flex-direction: column;
    }
    .header-row>div{
      width: 100%;
    }
  }
  
`;

export default GlobalStyle;
