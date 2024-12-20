import React, { useState, useEffect, useMemo } from 'react';
import { TimeInput } from './TimeInput';
import Slider from './Slider';
import { Progress } from './Progress';
import { CountdownContainer } from './Style/Countdown.style';
import { StartButton, PauseButton, StopButton } from '../Button/Button';
import { Title } from '../Title/Title';
import { TimeDisplay } from './Style/TimeDisplay';

export const Countdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    const playSound = useMemo(
        () => new Audio(`${process.env.PUBLIC_URL}/playSound.mp3`),
        []
    );

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null; // Используем ReturnType

        if (isActive) {
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
    }, [isActive, playSound]);

    useEffect(() => {
        if (remainingTime === 0 && isActive) {
            setIsActive(false); // Остановка таймера, когда время заканчивается
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

    return (
        <CountdownContainer>
            <Title>Таймер обратного отсчета</Title>
            <TimeInput
                totalSeconds={totalSeconds}
                setTotalSeconds={setTotalSeconds}
                isActive={isActive}
            />
            <Slider
                totalSeconds={totalSeconds}
                setTotalSeconds={setTotalSeconds}
                isActive={isActive}
            />
            <Progress value={totalSeconds - remainingTime} max={totalSeconds} />
            <TimeDisplay>
                {Math.floor(remainingTime / 60)} :{' '}
                {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
            </TimeDisplay>
            {!isActive ? (
                <StartButton onClick={startCountdown}>Старт</StartButton>
            ) : (
                <PauseButton onClick={pauseCountdown}>Пауза</PauseButton>
            )}
            <StopButton onClick={stopCountdown}>Стоп</StopButton>
        </CountdownContainer>
    );
};
