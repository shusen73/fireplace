// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; 
    box-sizing: border-box;
    overflow: hidden;
  }
  html, body, #app, #app>div {
    height: 100%;
    
  }
  body {
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default GlobalStyle;
