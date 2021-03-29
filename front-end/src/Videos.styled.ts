import styled from "styled-components";
export const StyledVideos = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 25% 25% 25% 25%;
  height: 100vh;
  min-height: 100vh;
`;
export const Local = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 5;
  background: black;
  z-index: 1;
`;
export const Remote = styled.div`
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 5;
  background: black;
`;
