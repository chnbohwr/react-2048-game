import React, { useState, useEffect } from "react";
import produce from "immer";
import useEventListener from "use-event-listener";

const GAME_STATUS = {
  PLAYING: "PLAYING",
  WIN: "WIN",
  LOSS: "LOSS"
};

const randomId = () =>
  Math.random()
    .toString(32)
    .substr(3, 8);

const rotateMatrix = ({ tilesArr, addScore = 0 }) => {
  const resultTiles = tilesArr[0]
    .map((col, i) => tilesArr.map(row => row[i]))
    .map(r => r.reverse());
  return Promise.resolve({ tilesArr: resultTiles, addScore });
};

const clearTileState = tilesArr => {
  const resultTiles = tilesArr.map(rowArr =>
    rowArr.map(({ id, value, createTime }) => ({ id, value, createTime }))
  );
  // console.log("clearTileState", resultTiles);
  return Promise.resolve({ tilesArr: resultTiles });
};

const generateRandomTile = ({ tilesArr, addScore = 0 }) => {
  const noValueTiles = tilesArr.concatAll().filter(tileData => !tileData.value);
  const choosedTile =
    noValueTiles[Math.floor(Math.random() * noValueTiles.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  const resultTiles = produce(tilesArr, draft => {
    draft[choosedTile.y][choosedTile.x].value = value;
    draft[choosedTile.y][choosedTile.x].isNew = true;
    draft[choosedTile.y][choosedTile.x].createTime = new Date().getTime();
  });
  // console.log("generateRandomTile", resultTiles);
  return Promise.resolve({ tilesArr: resultTiles, addScore });
};

const arrangeTiles = ({ tilesArr }) => {
  const size = tilesArr.length;
  let addScore = 0;
  const resultTiles = tilesArr.map((rowArr, row) => {
    const tempArr = [];
    const filted = rowArr.filter(t => t.value > 0);
    while (filted.length > 0) {
      let targetTile = { ...filted.shift() };
      const nextTile = filted[0];
      if (nextTile && targetTile.value === nextTile.value) {
        addScore += targetTile.value;
        targetTile.value = targetTile.value * 2;
        targetTile.isMerge = true;
        filted.shift();
      }
      tempArr.push(targetTile);
    }
    const pad = Array.from(Array(size - tempArr.length)).map(() => ({
      id: randomId(),
      value: 0,
      createTime: new Date().getTime()
    }));
    return pad.concat(tempArr);
  });
  // console.log("arrangeTiles", resultTiles);
  return Promise.resolve({ tilesArr: resultTiles, addScore });
};

const rePositionTiles = ({ tilesArr, addScore = 0 }) => {
  const resultTiles = tilesArr.map((tileRowArr, row) =>
    tileRowArr.map((tileData, col) => ({ ...tileData, x: col, y: row }))
  );
  // console.log("rePositionTiles", resultTiles);
  return Promise.resolve({ tilesArr: resultTiles, addScore });
};

const useTiles = (size = 4) => {
  const [tiles, setTiles] = useState([]);
  const [key, setKey] = useState();
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
  const generalArr = Array.from(Array(size)).map((v, i) => i);

  useEventListener(
    "keydown", // event to listen to
    event => setKey(event.keyCode) // callback
  );

  useEffect(() => {
    initialTiles();
  }, []);

  const gameCondition = () => {
    const tileArr = tiles
      .concatAll()
      .filter(tileData => Boolean(tileData.value));
    const winTile = tileArr.find(tileData => tileData.value === 2048);
    if (winTile) {
      setGameStatus(GAME_STATUS.WIN);
      return;
    }
    if (tileArr.length === size * size) {
      let status = GAME_STATUS.LOSS;
      tileArr.forEach(tileData => {
        const { x, y, value } = tileData;
        const valueArra = tileArr
          .filter(
            t =>
              (t.x === x && t.y === y - 1) ||
              (t.x === x && t.y === y + 1) ||
              (t.x === x - 1 && t.y === y) ||
              (t.x === x + 1 && t.y === y)
          )
          .map(t => t.value);
        if (valueArra.includes(value)) {
          status = GAME_STATUS.PLAYING;
        }
      });
      setGameStatus(status);
    }
  };
  useEffect(gameCondition, [tiles]);

  const handleKeyDown = () => {
    switch (key) {
      case 37: {
        moveLeft();
        break;
      }
      case 38: {
        moveUp();
        break;
      }
      case 39: {
        moveRight();
        break;
      }
      case 40: {
        moveDown();
        break;
      }
      default:
    }
  };
  useEffect(handleKeyDown, [key]);

  const saveTile = ({ tilesArr, addScore = 0 }) => {
    setTiles(tilesArr);
    setKey(null);
    if (addScore) {
      setScore(score + addScore);
    }
  };

  const initialTiles = () => {
    const tilesArr = generalArr.map(row =>
      generalArr.map(col => ({
        y: row,
        x: col,
        id: randomId(),
        value: 0
      }))
    );
    generateRandomTile({ tilesArr })
      .then(generateRandomTile)
      .then(saveTile);
    setGameStatus(GAME_STATUS.PLAYING);
    setScore(0);
  };

  const moveRight = () => {
    clearTileState(tiles)
      .then(arrangeTiles)
      .then(rePositionTiles)
      .then(generateRandomTile)
      .then(saveTile);
  };

  const moveUp = () => {
    clearTileState(tiles)
      .then(rotateMatrix)
      .then(arrangeTiles)
      .then(rotateMatrix)
      .then(rotateMatrix)
      .then(rotateMatrix)
      .then(rePositionTiles)
      .then(generateRandomTile)
      .then(saveTile);
  };

  const moveLeft = () => {
    clearTileState(tiles)
      .then(rotateMatrix)
      .then(rotateMatrix)
      .then(arrangeTiles)
      .then(rotateMatrix)
      .then(rotateMatrix)
      .then(rePositionTiles)
      .then(generateRandomTile)
      .then(saveTile);
  };

  const moveDown = () => {
    clearTileState(tiles)
      .then(rotateMatrix)
      .then(rotateMatrix)
      .then(rotateMatrix)
      .then(arrangeTiles)
      .then(rotateMatrix)
      .then(rePositionTiles)
      .then(generateRandomTile)
      .then(saveTile);
  };

  return {
    tiles,
    initialTiles,
    gameStatus,
    score
  };
};

export default useTiles;
