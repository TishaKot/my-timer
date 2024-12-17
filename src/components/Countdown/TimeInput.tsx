import React from 'react';
import { InputContainer, Input } from './Style/TimeInput.style';

export interface TimeInputProps {
    totalSeconds: number;
    setTotalSeconds: (seconds: number) => void;
    isActive: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
    totalSeconds,
    setTotalSeconds,
    isActive,
}) => {
    const handleMinutesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const minutes = Math.min(720, Math.max(0, Number(event.target.value)));
        setTotalSeconds(minutes * 60 + (totalSeconds % 60));
    };

    const handleSecondsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const seconds = Math.min(59, Math.max(0, Number(event.target.value)));
        setTotalSeconds(Math.floor(totalSeconds / 60) * 60 + seconds);
    };

    return (
        <InputContainer>
            <Input
                type='number'
                value={Math.floor(totalSeconds / 60)}
                onChange={handleMinutesChange}
                disabled={isActive}
                placeholder='Minutes'
            />
            <Input
                type='number'
                value={totalSeconds % 60}
                onChange={handleSecondsChange}
                disabled={isActive}
                placeholder='Seconds'
            />
        </InputContainer>
    );
};
