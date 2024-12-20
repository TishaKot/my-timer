import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.style';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'inherit' | 'primary' | 'secondary';
}

// Основной компонент Button
export function Button({ children, ...rest }: IButton) {
    return <ButtonStyled {...rest}>{children}</ButtonStyled>;
}

interface IButtonWithClick {
    onClick: () => void;
    children: React.ReactNode;
}

export const StartButton: React.FC<IButtonWithClick> = ({
    onClick,
    children,
}) => <Button onClick={onClick}>{children || 'Старт'}</Button>;

export const PauseButton: React.FC<IButtonWithClick> = ({
    onClick,
    children,
}) => <Button onClick={onClick}>{children || 'Пауза'}</Button>;

export const StopButton: React.FC<IButtonWithClick> = ({
    onClick,
    children,
}) => <Button onClick={onClick}>{children || 'Стоп'}</Button>;

interface ISwitchButtonProps extends IButtonWithClick {
    isTimer: boolean;
}

export const SwitchButton: React.FC<ISwitchButtonProps> = ({
    onClick,
    isTimer,
    children,
}) => (
    <Button onClick={onClick}>
        {children ||
            (isTimer
                ? 'Переключиться на секундомер'
                : 'Переключиться на таймер')}
    </Button>
);

Button.propTypes = {
    children: PropTypes.node,
};
