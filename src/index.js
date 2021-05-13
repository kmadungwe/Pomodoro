import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Customizer from './customizedTime';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 15px;
  max-width: 354px;
`;
const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  font-family: 'Julius Sans One', sans-serif;
  background-color: pink;
`;

ReactDOM.render(
  <React.StrictMode>
    <ContainerWrapper className='ContainerWrapper'>
      <Container className='Container'>
        <Customizer className='Customizer'>
          <App />
        </Customizer>
      </Container>
    </ContainerWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
