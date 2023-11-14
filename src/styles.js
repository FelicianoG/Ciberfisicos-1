// eslint-disable-next-line import/no-named-as-default
import styled from "styled-components";
export const Main = styled.main`
  display: flex;
  width: 100%;
  font-size: 0.6vw;

  .main-title {
    width: 100%;
    position: absolute;
    top: 0;
    height: 3rem;
  }

  .side-menu {
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    background-color: #283333;
    left: 10;
    width: 6rem;
    bottom: 0;
    top: 0;
    overflow: hidden;
    box-shadow: 0.2rem 0px 1rem 0.3rem #00000055;
  }
  .extended {
    width: 30%;
  }

  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const SliderStyles = styled.div`
  width: 100%;
  margin: 1.2rem;
  input {
    background-color: green;
  }
  h2 {
    margin: 0;
    margin-bottom: 0.3rem;
  }
`;

export const ButtonStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.2rem;
  .load-state {
    border: none;
    min-height: 2rem;
    &:active {
      background-color: yellow;
    }
  }
  .save-state {
    background-color: green;
    border: none;
    max-height: 1rem;
    font-size: 0.6rem;
    &:active {
      background-color: red;
    }
  }
`;

export const ButtonGrid = styled.div`
  display: flex;
  margin: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const MqttClientStyles = styled.div`
  .modal {
    position: absolute;
    z-index: 3;
    background-color: #000811dd;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .send-btn {
    height: 2rem;
    min-width: 6rem;
  }
  .cross {
    position: absolute;
    z-index: 4;
    right: 0;
    top: 0;
    margin: 2rem;
    min-width: 3rem;
    min-height: 3rem;
    font-size: 1rem;
  }
  button {
    margin: 2rem;
  }
  h3 {
    margin: 0;
  }
`;
