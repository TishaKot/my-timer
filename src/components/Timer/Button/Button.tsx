import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.style';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'inherit' | 'primary' | 'secondary';
}

export function Button({ children, ...rest }: IButton) {
    return <ButtonStyled>{children}</ButtonStyled>;
}

Button.propTypes = {
    children: PropTypes.node,
};
