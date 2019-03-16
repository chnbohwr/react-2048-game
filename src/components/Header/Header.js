import React from "react";
import * as Style from "./Style";

const Header = ({ gameStatus, score, initialTiles }) => {
  return (
    <Style.Container>
      <Style.ScoreContainer>
        <Style.ScoreTitle>Score</Style.ScoreTitle>
        <Style.ScoreContent>{score}</Style.ScoreContent>
      </Style.ScoreContainer>
      <Style.GameStatusContainer>
        <Style.GameStatusTitle>Game Status</Style.GameStatusTitle>
        <Style.GameStatusContent>{gameStatus}</Style.GameStatusContent>
      </Style.GameStatusContainer>
      <Style.RestartBtn onClick={initialTiles}>New Game</Style.RestartBtn>
    </Style.Container>
  );
};

export default React.memo(Header);
