import React, {
    useState,
    useEffect,
    useCallback,
    memo,
    useMemo,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { TimerWrapper, TimerDisplay } from './StyledTimer';
import { StartButton, PauseButton, StopButton } from '../Button';
import { Title } from '../Title/Title';

interface TimerProps {
    initialTime?: number;
}

export const Timer: React.FC<TimerProps> = memo(({ initialTime = 0 }) => {
    const [isRunning, setIsRunning] = useState(false); // Состояние отслеживающее запущен ли таймер
    const [time, setTime] = useState(initialTime); // Состояние для хранения времени
    const intervalId = useRef<NodeJS.Timeout | null>(null); // Используем useRef для хранения id интервала

    const startTimer = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            intervalId.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
    }, [isRunning]);

    const pauseTimer = useCallback(() => {
        if (isRunning && intervalId.current !== null) {
            clearInterval(intervalId.current); // Очищаем интервал
            setIsRunning(false); // Останавливаем таймер
        }
    }, [isRunning]);

    const resetTimer = useCallback(() => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
        }
        setTime(initialTime);
        setIsRunning(false);
    }, [initialTime]);

    useEffect(() => {
        return () => {
            if (intervalId.current !== null) {
                clearInterval(intervalId.current); // Очищаем интервал при размонтировании
            }
        };
    }, []);

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
                <PauseButton onClick={pauseTimer}>Пауза</PauseButton>
            ) : (
                <StartButton onClick={startTimer}>Старт</StartButton>
            )}
            <StopButton onClick={resetTimer}>Стоп</StopButton>
        </TimerWrapper>
    );
});

Timer.propTypes = {
    initialTime: PropTypes.number,
};
