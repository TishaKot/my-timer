import React from 'react';
import { SliderContainer, SliderInput } from './Style/Slider.style';

export interface SliderProps {
    totalSeconds: number;
    setTotalSeconds: (seconds: number) => void;
    isActive: boolean;
}

const Slider: React.FC<SliderProps> = ({
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
                type='range'
                min={0}
                max={60}
                step={0.25}
                value={Math.floor(totalSeconds / 60)}
                onChange={handleSliderChange}
                disabled={isActive}
            />
        </SliderContainer>
    );
};

export default Slider;
