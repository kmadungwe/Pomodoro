import React, { useEffect, useState } from 'react';
import Duration from 'luxon/src/duration';

function App() {
  const [timerLength, setTimerLength] = useState(5);
  const [timerOn, setTimerOn] = useState(false);
  const [timerFinish, setTimerFinish] = useState(true);
  const [sessionType, setSessionType] = useState('Work');
  const [sessionNumber, setSessionNumber] = useState(0);

  //useContext for long break length
  //useContext for break length
  //useContext for worklength

  //useEffect1 [timerOn]
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

  //useEffect2 [timerLength]
  useEffect(() => {
    if (timerLength === 0) {
      setTimerFinish(true);
      setTimerOn(false);
      setSessionType((pastType) => {
        if (pastType === 'Work') {
          setSessionType('Break');
        }
        if (pastType === 'Break') {
          setSessionType('Work');
        }
        if (pastType === 'LongBreak') {
          setSessionType('Work');
        }
      });
    }
  }, [timerLength]);

  //useEffect3-5 [sesssionType, break/work/longbreak]
  useEffect(() => {
    if (timerFinish === true) {
      if (sessionType === 'Break') {
        setTimerLength(5);
      }
      if (sessionType === 'Work') {
        setTimerLength(3);
      }
      if (sessionType === 'LongBreak') {
        setTimerLength(15);
      }
    }
  }, [sessionType]);
  //useEffect6 sound [sessionType, timerDone]
  useEffect(() => {
    if (!timerFinish) {
      if (sessionNumber === 1) {
        setTimerLength(3);
        setSessionType('Work');
      }
      if (sessionNumber === 2) {
        setTimerLength(5);
        setSessionType('Break');
      }
    }
    if (!timerOn) {
      setSessionNumber(sessionNumber + 1);
    }
  }, [sessionType, timerFinish]);

  //useEffect 7 [sessionNumber]
  useEffect(() => {
    if (sessionNumber > 5) {
      setSessionType('LongBreak');
      setSessionNumber(0 - 1);
    }
  }, [sessionNumber]);

  return (
    <>
      <p>
        Duration:
        {Duration.fromObject({ seconds: timerLength }).toFormat('mm:ss')}
      </p>
      <button onClick={() => setTimerOn(!timerOn)}>
        {timerOn ? 'Pause' : 'Run'}
      </button>
      {/* {console.log(sessionType)} */}
      <p>{timerFinish ? 'Timer is completed' : 'Timer running'}</p>
      <p>SessionType:{sessionType}</p>
      <p>Session Number: {sessionNumber}</p>
    </>
  );
}

export default App;
