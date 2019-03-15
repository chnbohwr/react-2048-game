import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 450px;
  height: 100px;
  display: flex;
`;

const ScoreContainer = styled.div`
  background-color: #cebfb4;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const ScoreTitle = styled.div`
  color: #eee4da;
`;

const ScoreContent = styled.div``;

const Score = ({ gameStatus, score }) => {
  return (
    <Container>
      <ScoreContainer>
        <ScoreTitle>Score</ScoreTitle>
        <ScoreContent>{score}</ScoreContent>
      </ScoreContainer>
    </Container>
  );
};

export default React.memo(Score);
