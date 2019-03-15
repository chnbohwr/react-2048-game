import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  & > *:last-child {
    margin-right: 10px;
  }
`;

const Col = styled.div`
  width: 100px;
  height: 100px;
  background: #cebfb4;
  margin-left: 10px;
  border-radius: 4px;
`;

const Tile = styled.div`
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

const TileInner = styled.div`
  width: 100px;
  height: 100px;
  background: #efe3d9;
  font-size: 55px;
  font-weight: 700;
  color: #776e66;
  text-align: center;
  line-height: 100px;
  animation-name: ${p => (p.isNew ? "fadeIn" : p.isMerge ? "tada" : "")};
  animation-duration: 500ms;
  animation-timing-function: ease-in;
  animation-delay: ${p => (p.isNew ? "0" : "200ms")};
`;

const TileId = styled.div`
  font-size: 24px;
  color: #999;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

const Board = ({ size, tiles }) => {
  const rowArr = Array.from(Array(size)).map((v, i) => `row${i}`);
  const colArr = Array.from(Array(size)).map((v, i) => `col${i}`);
  const tileArr = tiles
    .concatAll()
    .filter(tileData => Boolean(tileData.value))
    .sort((a, b) => a.createTime - b.createTime);
  return (
    <Container>
      {rowArr.map(row => (
        <Row key={row}>
          {colArr.map(col => (
            <Col key={col} />
          ))}
        </Row>
      ))}
      {tileArr.map(tileData => (
        <Tile className="tile" key={tileData.id} x={tileData.x} y={tileData.y}>
          <TileInner
            value={tileData.value}
            isNew={tileData.isNew ? 1 : 0}
            isMerge={tileData.isMerge ? 1 : 0}
          >
            {tileData.value}
          </TileInner>
        </Tile>
      ))}
    </Container>
  );
};

export default React.memo(Board);
