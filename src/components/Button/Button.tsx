import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.style';
import { SwitchButtonStyled } from './Button.style';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    //встроенный тип в React, который содержит все стандартные HTML атрибуты для элемента <button>
    children: React.ReactNode; //передаем любые элементы React
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'inherit' | 'primary' | 'secondary';
}

// Основной компонент Button
export function Button({ children, ...rest }: IButton) {
    return <ButtonStyled {...rest}>{children}</ButtonStyled>;
}

//интерфейс для обработчиков
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
    sx?: React.CSSProperties;
}

export const SwitchButton: React.FC<ISwitchButtonProps> = ({
    onClick,
    isTimer,
    children,
    ...rest
}) => (
    <SwitchButtonStyled onClick={onClick} {...rest}>
        {children || (isTimer ? 'Секундомер' : 'Таймер')}
    </SwitchButtonStyled>
);

Button.propTypes = {
    children: PropTypes.node,
};
