import React from 'react';
import { TimeDisplayContainer } from './Style/TimeDisplay.style';

interface TimeDisplayProps {
    remainingTime: number;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ remainingTime }) => {
    return (
        <TimeDisplayContainer>
            {Math.floor(remainingTime / 60)} :{' '}
            {remainingTime % 60 < 10
                ? `0${remainingTime % 60}`
                : remainingTime % 60}
        </TimeDisplayContainer>
    );
};
