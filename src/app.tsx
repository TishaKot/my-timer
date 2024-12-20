import React, { useState } from 'react';
import { Timer } from './components/Timer/Timer';
import { Countdown } from './components/Countdown/Countdown';
import { SwitchButton } from './components/Button/Button';

export function App() {
    const [isTimer, setIsTimer] = useState(true);

    const toggleComponent = () => {
        setIsTimer(prev => !prev); // Переключаем состояние
    };

    return (
        <div>
            <SwitchButton onClick={toggleComponent} isTimer={isTimer}>
                {isTimer
                    ? 'Переключиться на таймер'
                    : 'Переключиться на секундомер'}
            </SwitchButton>
            {isTimer ? <Timer /> : <Countdown />}
        </div>
    );
}
