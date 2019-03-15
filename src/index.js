import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import Board from "./Board";
import Score from "./Score";
import useTiles from "./TileHook";
import "animate.css";
import "concatAll";

const GlobalStyle = createGlobalStyle`
  body {
    background : #faf8ef;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  }
`;

function App() {
  const { tiles, initialTiles, gameStatus, score } = useTiles();

  return (
    <div className="App">
      <GlobalStyle />
      <Score gameStatus={gameStatus} score={score} />
      <Board size={4} tiles={tiles} />
      <button onClick={initialTiles}>Restart</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
