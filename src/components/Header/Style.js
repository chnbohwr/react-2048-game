import styled from "styled-components";

export const Container = styled.div`
  width: 450px;
  height: 70px;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const ScoreContainer = styled.div`
  background-color: #cebfb4;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const ScoreTitle = styled.div`
  color: #eee4da;
`;

export const ScoreContent = styled.div`
  font-size: 30px;
  color: white;
`;

export const GameStatusContainer = styled(ScoreContainer)``;

export const GameStatusTitle = styled(ScoreTitle)``;

export const GameStatusContent = styled(ScoreContent)``;

export const RestartBtn = styled(ScoreContainer)`
  background: #8f7a66;
  color: white;
  cursor: pointer;
  font-size: 30px;
`;
