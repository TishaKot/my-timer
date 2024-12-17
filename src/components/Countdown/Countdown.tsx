import React, { useState, useEffect } from 'react';
import { TimeInput } from './TimeInput';
import Slider from './Slider';
import { Progress } from './Progress';
import { CountdownContainer } from './Style/Countdown.style';
import { Button } from './Style/Button.style';
// import { ButtonStyled } from '../Timer/Button/Button.style';
import soundFile from '/Users/macbookair/my-timer/src/assets/audio/zvukovoy-signal-vyihoda-iz-sotssetey.mp3';

// export const Countdown = () => {
//     const [isActive, setIsActive] = useState(false);
//     const [totalSeconds, setTotalSeconds] = useState(0);
//     const [remainingTime, setRemainingTime] = useState(0);
//     const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Используем ReturnType

//     const playSound = () => {
//         const audio = new Audio(soundFile);
//         audio.play();
//     };

//     useEffect(() => {
//         if (isActive && remainingTime > 0) {
//             const id = setInterval(() => {
//                 setRemainingTime(prev => {
//                     if (prev <= 1) {
//                         clearInterval(id);
//                         playSound();
//                         return 0;
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//             setIntervalId(id); // Устанавливаем id
//         } else if (intervalId) {
//             clearInterval(intervalId);
//         }

//         return () => {
//             if (intervalId) {
//                 clearInterval(intervalId);
//             }
//         };
//     }, [isActive, remainingTime, intervalId]); // Добавьте intervalId в зависимости

//     const startCountdown = () => {
//         setIsActive(true);
//         setRemainingTime(totalSeconds); // Устанавливаем оставшееся время при старте
//     };

//     const pauseCountdown = () => {
//         setIsActive(false);
//     };

//     const stopCountdown = () => {
//         setIsActive(false);
//         setRemainingTime(0);
//         setTotalSeconds(0);
//     };

//     return (
//         <CountdownContainer>
//             <h2>Countdown</h2>
//             <TimeInput
//                 totalSeconds={totalSeconds}
//                 setTotalSeconds={setTotalSeconds}
//                 isActive={isActive}
//             />
//             <Slider
//                 totalSeconds={totalSeconds}
//                 setTotalSeconds={setTotalSeconds}
//                 isActive={isActive}
//             />
//             <Progress value={totalSeconds - remainingTime} max={totalSeconds} />
//             <p>
//                 Time: {Math.floor(remainingTime / 60)} :{' '}
//                 {remainingTime % 60 < 10
//                     ? `0${remainingTime % 60}`
//                     : remainingTime % 60}
//             </p>
//             {!isActive ? (
//                 <Button onClick={startCountdown}>Старт</Button>
//             ) : (
//                 <Button onClick={pauseCountdown}>Пауза</Button>
//             )}
//             <Button onClick={stopCountdown}>Стоп</Button>
//         </CountdownContainer>
//     );
// };

export const Countdown = () => {
    const [isActive, setIsActive] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);

    const playSound = () => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null; // Используем ReturnType

        if (isActive) {
            intervalId = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalId!);
                        playSound();
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
    }, [isActive]);

    useEffect(() => {
        if (remainingTime === 0 && isActive) {
            setIsActive(false); // Остановка таймера, когда время заканчивается
        }
    }, [remainingTime, isActive]);

    const startCountdown = () => {
        setIsActive(true);
        setRemainingTime(totalSeconds); // Устанавливаем оставшееся время при старте
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
            <h2>Countdown</h2>
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
            <p>
                Time: {Math.floor(remainingTime / 60)} :{' '}
                {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
            </p>
            {!isActive ? (
                <Button onClick={startCountdown}>Старт</Button>
            ) : (
                <Button onClick={pauseCountdown}>Пауза</Button>
            )}
            <Button onClick={stopCountdown}>Стоп</Button>
        </CountdownContainer>
    );
};
