import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TimeInput } from './TimeInput';
import { Slider } from './Slider';
import { Progress } from './Progress';
import { CountdownContainer } from './Style/StyledCountdown';
import { StartButton, PauseButton, StopButton } from '../Button';
import { Title } from '../Title/Title';
import { TimeDisplay } from './TimeDisplay';

export const Countdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    const playSound = useMemo(
        () => new Audio(`${process.env.PUBLIC_URL}/playSound.mp3`),
        []
    );

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;

        if (isActive && remainingTime > 0) {
            intervalId = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId!);
                        playSound.play();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isActive, playSound, remainingTime]);

    useEffect(() => {
        if (remainingTime === 0 && isActive) {
            setIsActive(false);
        }
    }, [remainingTime, isActive]);

    const startCountdown = () => {
        setIsActive(true);
        if (remainingTime === 0) {
            setRemainingTime(totalSeconds);
        }
    };

    const pauseCountdown = () => {
        setIsActive(false);
    };

    const stopCountdown = () => {
        setIsActive(false);
        setRemainingTime(0);
        setTotalSeconds(0);
    };

    const handleTotalSecondsChange = (newTotalSeconds: number) => {
        setTotalSeconds(newTotalSeconds);
        if (!isActive) {
            setRemainingTime(newTotalSeconds); // Обновляем оставшееся время, если таймер на паузе
        }
    };

    return (
        <CountdownContainer>
            <Title>Таймер обратного отсчета</Title>
            <TimeInput
                totalSeconds={totalSeconds}
                setTotalSeconds={handleTotalSecondsChange} // Передаем новую функцию
                isActive={isActive}
            />
            <Slider
                totalSeconds={totalSeconds}
                setTotalSeconds={handleTotalSecondsChange} // Передаем новую функцию
                isActive={isActive}
            />
            <Progress
                value={totalSeconds - remainingTime} // Прогресс 0, если таймер не активен
                max={totalSeconds}
            />
            <TimeDisplay remainingTime={remainingTime} />
            {!isActive ? (
                <StartButton onClick={startCountdown}>Старт</StartButton>
            ) : (
                <PauseButton onClick={pauseCountdown}>Пауза</PauseButton>
            )}
            <StopButton onClick={stopCountdown}>Стоп</StopButton>
        </CountdownContainer>
    );
};

Countdown.propTypes = {
    isActive: PropTypes.bool,
    totalSeconds: PropTypes.number,
    remainingTime: PropTypes.number,
};
