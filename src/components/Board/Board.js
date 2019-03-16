import React from "react";
import Grid from "./Grid";
import * as Style from "./Style";

const Board = ({ tiles }) => {
  const tileArr = tiles
    .concatAll()
    .filter(tileData => Boolean(tileData.value))
    .sort((a, b) => a.createTime - b.createTime);
  return (
    <Style.Container>
      <Grid />
      {tileArr.map(tileData => (
        <Style.Tile
          className="tile"
          key={tileData.id}
          x={tileData.x}
          y={tileData.y}
        >
          <Style.TileInner
            value={tileData.value}
            isNew={tileData.isNew ? 1 : 0}
            isMerge={tileData.isMerge ? 1 : 0}
          >
            {tileData.value}
          </Style.TileInner>
        </Style.Tile>
      ))}
    </Style.Container>
  );
};

export default React.memo(Board);
