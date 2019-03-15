import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 450px;
  height: 70px;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const ScoreContainer = styled.div`
  background-color: #cebfb4;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ScoreTitle = styled.div`
  color: #eee4da;
`;

const ScoreContent = styled.div`
  font-size: 30px;
  color: white;
`;

const GameStatusContainer = styled(ScoreContainer)``;

const GameStatusTitle = styled(ScoreTitle)``;

const GameStatusContent = styled(ScoreContent)``;

const RestartBtn = styled(ScoreContainer)`
  background: #8f7a66;
  color: white;
  cursor: pointer;
  font-size: 30px;
`;

const Header = ({ gameStatus, score, initialTiles }) => {
  return (
    <Container>
      <ScoreContainer>
        <ScoreTitle>Score</ScoreTitle>
        <ScoreContent>{score}</ScoreContent>
      </ScoreContainer>
      <GameStatusContainer>
        <GameStatusTitle>Game Status</GameStatusTitle>
        <GameStatusContent>{gameStatus}</GameStatusContent>
      </GameStatusContainer>
      <RestartBtn onClick={initialTiles}>New Game</RestartBtn>
    </Container>
  );
};

export default React.memo(Header);
