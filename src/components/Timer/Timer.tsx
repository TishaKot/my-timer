import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { TimerWrapper, TimerDisplay } from './Timer.style';
import { StartButton, PauseButton, StopButton } from '../Button/Button';
import { Title } from '../Title/Title';

const Timer = memo(() => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startTimer = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
            setIntervalId(id);
        }
    }, [isRunning]);

    const pauseTimer = useCallback(() => {
        if (isRunning && intervalId !== null) {
            clearInterval(intervalId);
            setIsRunning(false);
        }
    }, [isRunning, intervalId]);

    const resetTimer = useCallback(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        setTime(0);
        setIsRunning(false);
    }, [intervalId]);

    useEffect(() => {
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const formatTime = useMemo(() => {
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 100);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }, [time]);

    return (
        <TimerWrapper>
            <Title>Секундомер</Title>
            <TimerDisplay>{formatTime}</TimerDisplay>
            {isRunning ? (
                <PauseButton onClick={pauseTimer}>Пауза</PauseButton> // Передаем children
            ) : (
                <StartButton onClick={startTimer}>Старт</StartButton> // Передаем children
            )}
            <StopButton onClick={resetTimer}>Стоп</StopButton>
        </TimerWrapper>
    );
});

Timer.displayName = 'Timer'; // Устанавливаем имя компонента
export { Timer };
