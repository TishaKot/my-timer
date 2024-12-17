import React from 'react';
import { ProgressBar, ProgressBarContainer } from './Style/Progress.style';

export interface ProgressProps {
    value: number;
    max: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, max }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0; // Избегаем NaN
    return (
        <ProgressBarContainer>
            <ProgressBar value={percentage}>
                {Math.round(percentage)}%
            </ProgressBar>
        </ProgressBarContainer>
    );
};
