import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { Countdown } from './components/Countdown';
import { Button } from './components/Button';
import { Box } from '@mui/material';

export function App() {
    const [isTimer, setIsTimer] = useState(true);

    const toggleComponent = () => {
        setIsTimer(prev => !prev);
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            minHeight='100vh'
        >
            <Button onClick={toggleComponent}>
                {isTimer ? 'Таймер' : 'Секундомер'}
            </Button>
            {isTimer ? <Timer /> : <Countdown />}
        </Box>
    );
}
