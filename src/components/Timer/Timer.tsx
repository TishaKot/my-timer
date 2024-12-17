import React, { useState, useEffect, useCallback, memo } from 'react';
import { ButtonStyled } from './Button/Button.style';
import { TimerWrapper, TimerDisplay } from './Timer.style';

const Timer = memo(() => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startTimer = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 100);
            }, 100);
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

    const formatTime = useCallback((time: number) => {
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 100);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`;
    }, []);

    const getButtonText = () => {
        return isRunning ? 'Пауза' : 'Запустить';
    };

    return (
        <TimerWrapper>
            <h2>Секундомер</h2>
            <TimerDisplay>{formatTime(time)}</TimerDisplay>
            <ButtonStyled onClick={isRunning ? pauseTimer : startTimer}>
                {getButtonText()}
            </ButtonStyled>
            <ButtonStyled onClick={resetTimer}>Сбросить</ButtonStyled>
        </TimerWrapper>
    );
});

Timer.displayName = 'Timer'; // Устанавливаем имя компонента
export { Timer };
