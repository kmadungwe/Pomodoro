import React, { createContext, useState } from 'react';
import styled, { css } from 'styled-components';
import Duration from 'luxon/src/duration';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  font-family: 'Julius Sans One', sans-serif;
  padding: 0.25em 1em;
  cursor: pointer;
  font-size: 0.6rem;

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

const Para = styled.p`
  margin: 0;
`;
const UpDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

const Container = styled.div`
  border-radius: 3px;
  color: palevioletred;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 15px;
  gap: 4px;
`;

const ButtonWrapper = styled.div``;
//   display: flex;
//   gap: 5px;

function Customizer(props) {
  const [breakLength, setBreakLength] = useState(300);
  const [workLength, setWorkLength] = useState(1500);
  const [longBreakLength, setLongBreakLength] = useState(900);

  return (
    <>
      <workContext.Provider value={workLength}>
        <breakContext.Provider value={breakLength}>
          <longBreakContext.Provider value={longBreakLength}>
            {props.children}
          </longBreakContext.Provider>
        </breakContext.Provider>
      </workContext.Provider>
      <Container className='container'>
        <UpDownWrapper className='UpDownWrapper'>
          <Para className='Para'>
            {Duration.fromObject({ seconds: breakLength }).toFormat('mm:ss')}
          </Para>
          <ButtonWrapper className='ButtonWrapper'>
            <Button
              className='Button'
              onClick={() => {
                setBreakLength((prevLength) =>
                  prevLength === 0 ? 0 : prevLength - 60
                );
              }}
            >
              Decrease break length
            </Button>
            <Button
              onClick={() => {
                setBreakLength(breakLength + 60);
              }}
            >
              Increase Break Length
            </Button>
          </ButtonWrapper>
        </UpDownWrapper>
        <UpDownWrapper>
          <Para>
            {Duration.fromObject({ seconds: workLength }).toFormat('mm:ss')}
          </Para>
          <ButtonWrapper>
            <Button
              onClick={() => {
                setWorkLength((prevLength) =>
                  prevLength === 0 ? 0 : prevLength - 60
                );
              }}
            >
              Decrease work length
            </Button>
            <Button onClick={() => setWorkLength(workLength + 60)}>
              Increase work length
            </Button>
          </ButtonWrapper>
        </UpDownWrapper>
        <UpDownWrapper>
          <Para>
            {Duration.fromObject({ seconds: longBreakLength }).toFormat(
              'mm:ss'
            )}
          </Para>
          <ButtonWrapper>
            <Button
              onClick={() => {
                setLongBreakLength((prevLength) =>
                  prevLength === 0 ? 0 : prevLength - 60
                );
              }}
            >
              Decrease Long break length
            </Button>
            <Button onClick={() => setLongBreakLength(longBreakLength + 60)}>
              Increase Long Break Length
            </Button>
          </ButtonWrapper>
        </UpDownWrapper>
      </Container>
    </>
  );
}

export const breakContext = createContext();
export const workContext = createContext();
export const longBreakContext = createContext();

export default Customizer;
