import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TimerWrapper, TimerDisplay } from './Timer.style';
import { StartButton, PauseButton, StopButton } from '../Button/Button';
import { Title } from '../Title/Title';

interface TimerProps {
    initialTime?: number; // Опциональный пропс
}

const Timer: React.FC<TimerProps> = memo(({ initialTime = 0 }) => {
    const [isRunning, setIsRunning] = useState(false); // Состояние отслеживающее запущен ли таймер
    const [time, setTime] = useState(initialTime); // Состояние для хранения времени
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); //id интервала с указанием типа

    const startTimer = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 10); //запускаем интервал, каждые 10 миллисек прибавляем 10 миллисек
            }, 10);
            setIntervalId(id); // сохраняем id
        }
    }, [isRunning]); //указываем зависимость при которой ф-я будет пересоздана

    const pauseTimer = useCallback(() => {
        if (isRunning && intervalId !== null) {
            clearInterval(intervalId); //очищаем интервал
            setIsRunning(false); //останавливаем таймер
        }
    }, [isRunning, intervalId]);

    const resetTimer = useCallback(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        setTime(initialTime);
        setIsRunning(false);
    }, [intervalId, initialTime]);

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

Timer.propTypes = {
    initialTime: PropTypes.number, // Начальное время в миллисекундах, опционально
};

export { Timer };
