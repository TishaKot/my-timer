import React, { useState } from 'react';
import { Timer } from './components/Timer/Timer';
import { Countdown } from './components/Countdown/Countdown';
import { SwitchButton } from './components/Button/Button';
import { Box } from '@mui/material';

export function App() {
    const [isTimer, setIsTimer] = useState(true);

    const toggleComponent = () => {
        setIsTimer(prev => !prev); // Переключаем состояние
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            minHeight='100vh'
        >
            <SwitchButton onClick={toggleComponent} isTimer={isTimer}>
                {isTimer ? 'Таймер' : 'Секундомер'}
            </SwitchButton>
            {isTimer ? <Timer /> : <Countdown />}
        </Box>
    );
}
