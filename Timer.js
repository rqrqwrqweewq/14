import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0); // Состояние для времени в секундах
  const [isRunning, setIsRunning] = useState(false); // Состояние для отслеживания, запущен ли секундомер
  const [intervalId, setIntervalId] = useState(null); // Состояние для хранения ID интервала

  useEffect(() => {
    if (isRunning) {
      // Если секундомер работает, запускаем setInterval
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      // Если секундомер остановлен, очищаем интервал
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning); // Переключаем состояние секундомера
  };

  const handleReset = () => {
    setTime(0); // Сброс времени
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.time}>{formatTime(time)}</div>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={handleStartStop}>
          {isRunning ? "Стоп" : "Старт"}
        </button>
        {time !== 0 && !isRunning && (
          <button style={styles.button} onClick={handleReset}>
            Сброс
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  time: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    fontSize: "1.5rem",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default Timer;
