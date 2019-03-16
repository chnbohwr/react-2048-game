import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import useTiles from "./hooks/TileHook";
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
      <Board tiles={tiles} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
