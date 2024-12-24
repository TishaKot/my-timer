import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TimeInput } from './TimeInput'; //компонент для ввода времени.
import { Slider } from './Slider'; //компонент для выбора времени с помощью ползунка
import { Progress } from './Progress'; //компонент для отображения прогресса
import { CountdownContainer } from './Style/Countdown.style'; //стилизованный контейнер для всего компонента
import { StartButton, PauseButton, StopButton } from '../Button/Button';
import { Title } from '../Title/Title';
import { TimeDisplay } from './TimeDisplay'; //стилизованный компонент для отображения оставшегося времени

export const Countdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0); //общее время в секундах функция для его обновления
    const [remainingTime, setRemainingTime] = useState(0); //оставшееся время и функция  для его обновления. Начальное значение — 0.

    const playSound = useMemo(
        () => new Audio(`${process.env.PUBLIC_URL}/playSound.mp3`),
        []
    );

    //Эффект для логики таймера
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

    //Эффект для остановки таймера
    useEffect(() => {
        if (remainingTime === 0 && isActive) {
            setIsActive(false); // Остановка таймера, когда время заканчивается
        }
    }, [remainingTime, isActive]);

    //функция активации таймера
    const startCountdown = () => {
        setIsActive(true);

        if (remainingTime === 0) {
            setRemainingTime(totalSeconds);
        }
    };

    //функция приостановки(пауза) таймера
    const pauseCountdown = () => {
        setIsActive(false);
    };

    //функция остановки таймера
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
