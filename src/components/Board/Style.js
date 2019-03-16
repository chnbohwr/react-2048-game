import styled from "styled-components";

const tileBackground = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e"
};

const tileColor = value => (value >= 8 ? "#f9f6f2" : "#776e66");

const tileFontSize = value => (value > 100 ? (value > 1000 ? 35 : 45) : 55);

export const Container = styled.div`
  width: 450px;
  height: 450px;
  background: #bbab9f;
  display: flex;
  border-radius: 4px;
  position: relative;
  flex-direction: column;
  & > *:last-child {
    margin-bottom: 10px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  & > *:last-child {
    margin-right: 10px;
  }
`;

export const Col = styled.div`
  width: 100px;
  height: 100px;
  background: #cebfb4;
  margin-left: 10px;
  border-radius: 4px;
`;

export const Tile = styled.div`
  &.tile {
    position: absolute;
    border-radius: 4px;
    transition: transform 100ms ease-in-out;
  }
  transform: translate(
    ${p => p.x * 100 + p.x * 10 + 10}px,
    ${p => p.y * 100 + p.y * 10 + 10}px
  );
`;

export const TileInner = styled.div`
  width: 100px;
  height: 100px;
  background: ${p => tileBackground[p.value]};
  font-size: ${p => tileFontSize(p.value)}px;
  font-weight: 700;
  color: ${p => tileColor(p.value)};
  text-align: center;
  line-height: 100px;
  animation-name: ${p => (p.isNew ? "fadeIn" : p.isMerge ? "tada" : "")};
  animation-duration: 500ms;
  animation-timing-function: ease-in;
  animation-delay: ${p => (p.isNew ? "0" : "200ms")};
`;

export const TileId = styled.div`
  font-size: 24px;
  color: #999;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
`;
