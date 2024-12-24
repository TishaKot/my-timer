import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar, ProgressBarContainer } from './Style/Progress.style';

export interface ProgressProps {
    value: number; //текущее значение прогресса
    max: number; //максимальное значение прогресса
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

Progress.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};
