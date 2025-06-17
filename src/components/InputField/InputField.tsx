import React from 'react';
import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #222;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 6px;
    background-color: #fff;
    font-size: 1rem;
    transition: border-color 0.2s;
    outline: none;
    width: 100%;

    &:focus {
        border-color: #0077ff;
    }

    @media (max-width: 600px) {
        font-size: 0.95rem;
        padding: 0.6rem 0.8rem;
    }
`;

export const InputField: React.FC<InputFieldProps> = ({ label, id, ...props }) => (
    <Wrapper>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input id={id} {...props} />
    </Wrapper>
);
