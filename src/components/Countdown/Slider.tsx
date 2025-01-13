import React from 'react';
import PropTypes from 'prop-types';
import { SliderContainer, SliderInput } from './Style/StyledSlider';

export interface SliderProps {
    totalSeconds: number;
    setTotalSeconds: (seconds: number) => void;
    isActive: boolean;
}

export const Slider: React.FC<SliderProps> = ({
    totalSeconds,
    setTotalSeconds,
    isActive,
}) => {
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minutes = Math.floor(Number(event.target.value));
        setTotalSeconds(minutes * 60);
    };

    return (
        <SliderContainer>
            <SliderInput
                type='range' // элемент слайдера
                min={0}
                max={60}
                step={0.25}
                value={Math.floor(totalSeconds / 60)}
                onChange={handleSliderChange} //обработчик изменений для слайдера
                disabled={isActive}
            />
        </SliderContainer>
    );
};

Slider.propTypes = {
    totalSeconds: PropTypes.number.isRequired,
    setTotalSeconds: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
};
