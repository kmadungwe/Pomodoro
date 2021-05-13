import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import Duration from 'luxon/src/duration';
import { breakContext, workContext, longBreakContext } from './customizedTime';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  font-family: 'Julius Sans One', sans-serif;
  padding: 0.25em 1em;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`;

const Container = styled.div`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  font-family: 'Julius Sans One', sans-serif;
`;

function App() {
  const [timerLength, setTimerLength] = useState(5);
  const [timerOn, setTimerOn] = useState(false);
  const [timerFinish, setTimerFinish] = useState(true);
  const [sessionType, setSessionType] = useState('Work');
  const [sessionNumber, setSessionNumber] = useState(0);

  //useContext for long break length
  const breakLength = useContext(breakContext);
  //useContext for break length
  const workLength = useContext(workContext);
  //useContext for worklength
  const longBreakLength = useContext(longBreakContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setTimerLength((timerLength) => {
          return timerLength - 1;
        });
      }
    }, 1000);
    if (timerOn) {
      setTimerFinish(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  useEffect(() => {
    if (timerLength === 0) {
      setTimerFinish(true);
      setTimerOn(false);
      setSessionType((pastType) => {
        if (pastType === 'Work') {
          return 'Break';
        }
        if (pastType === 'Break') {
          return 'Work';
        }
        if (pastType === 'LongBreak') {
          return 'Work';
        }
      });
    }
  }, [timerLength]);

  //useEffect3-5 [sesssionType, break/work/longbreak]
  useEffect(() => {
    const sessionMap = {
      Break: breakLength,
      Work: workLength,
      LongBreak: longBreakLength,
    };
    if (timerFinish) {
      setTimerLength(sessionMap[sessionType]);
    }
  }, [sessionType, timerFinish, breakLength, workLength, longBreakLength]);
  //useEffect6 sound [sessionType, timerDone]
  useEffect(() => {
    if (!timerFinish) {
      if (sessionNumber === 1) {
        setTimerLength(workLength);
        setSessionType('Work');
      }
      if (sessionNumber === 2) {
        setTimerLength(breakLength);
        setSessionType('Break');
      }
    }
    if (!timerOn) {
      setSessionNumber(sessionNumber + 1);
    }
  }, [sessionType, timerFinish]);

  useEffect(() => {
    if (sessionNumber > 5) {
      setSessionType('LongBreak');
      setSessionNumber(0 - 1);
    }
  }, [sessionNumber]);

  return (
    <ContainerWrapper>
      <Container>
        <p>{Duration.fromObject({ seconds: timerLength }).toFormat('mm:ss')}</p>
        <Button onClick={() => setTimerOn(!timerOn)}>
          {timerOn ? 'Pause' : 'Start Timer'}
        </Button>
        <p>{timerFinish ? 'Timer is completed' : 'Timer running'}</p>
        <Button primary>{sessionType}</Button>
        <p>Session Number: {sessionNumber}</p>
      </Container>
      <p>Long break length inside timerjs: {longBreakLength}.</p>
      <p>work length inside timerjs{workLength}.</p>
      <p>breaklength inside timerjs{breakLength}.</p>
    </ContainerWrapper>
  );
}

export default App;

//here is customizer
import React, { createContext, useState } from 'react';

function Customizer(props) {
  const [breakLength, setBreakLength] = useState(40);
  const [workLength, setWorkLength] = useState(50);
  const [longBreakLength, setLongBreakLength] = useState(30);

  return (
    <>
      <workContext.Provider value={workLength}>
        <breakContext.Provider value={breakLength}>
          <longBreakContext.Provider value={longBreakLength}>
            {props.children}
          </longBreakContext.Provider>
        </breakContext.Provider>
      </workContext.Provider>
      <p>{breakLength}</p>
      <button
        onClick={() => {
          setBreakLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          );
        }}
      >
        Decrease break length
      </button>
      <button
        onClick={() => {
          setBreakLength(breakLength + 1);
        }}
      >
        Increase Break Length
      </button>
      <p>{workLength}</p>
      <button
        onClick={() => {
          setWorkLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          );
        }}
      >
        Decrease work length
      </button>
      <button onClick={() => setWorkLength(workLength + 1)}>
        Increase work length
      </button>
      <p>{longBreakLength}</p>
      <button
        onClick={() => {
          setLongBreakLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          );
        }}
      >
        Decrease Long break length
      </button>
      <button onClick={() => setLongBreakLength(longBreakLength + 1)}>
        Increase Long Break Length
      </button>
    </>
  );
}

export const breakContext = createContext();
export const workContext = createContext();
export const longBreakContext = createContext();

export default Customizer;
