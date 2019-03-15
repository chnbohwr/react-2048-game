import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import Board from "./Board";
import Header from "./Header";
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
      <Header
        gameStatus={gameStatus}
        score={score}
        initialTiles={initialTiles}
      />
      <Board size={4} tiles={tiles} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
