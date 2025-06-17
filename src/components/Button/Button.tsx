import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
};

const variantStyles = {
    primary: css`
        background: #1976d2;
        color: #fff;
        border: none;
        &:hover {
            background: #1565c0;
        }
    `,
    secondary: css`
        background: #fff;
        color: #1976d2;
        border: 1px solid #1976d2;
        &:hover {
            background: #e3f2fd;
        }
    `,
    danger: css`
        background: #d32f2f;
        color: #fff;
        border: none;
        &:hover {
            background: #b71c1c;
        }
    `,
};

const sizeStyles = {
    small: css`
        padding: 0.25rem 0.75rem;
        font-size: 0.875rem;
    `,
    medium: css`
        padding: 0.5rem 1.25rem;
        font-size: 1rem;
    `,
    large: css`
        padding: 0.75rem 2rem;
        font-size: 1.125rem;
    `,
};

const StyledButton = styled.button<ButtonProps>`
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    ${(props) => variantStyles[props.variant || 'primary']}
    ${(props) => sizeStyles[props.size || 'medium']}
    width: 100%;
    max-width: 100%;

    @media (min-width: 480px) {
        width: auto;
        min-width: 120px;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    ...rest
}) => (
    <StyledButton variant={variant} size={size} {...rest}>
        {children}
    </StyledButton>
);