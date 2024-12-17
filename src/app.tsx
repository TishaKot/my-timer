import React from 'react';
import { Timer } from './components/Timer/Timer';
import { Countdown } from './components/Countdown/Countdown';

export function App() {
    return (
        <div>
            <div>
                <Timer />
            </div>
            <div>
                <Countdown />
            </div>
        </div>
    );
}
