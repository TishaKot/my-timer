import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar, ProgressBarContainer } from './Style/StyledProgress';

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

Progress.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
};
