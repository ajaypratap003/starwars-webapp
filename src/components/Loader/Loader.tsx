import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div<{ size?: number }>`
    width: ${({ size }) => size || 48}px;
    height: ${({ size }) => size || 48}px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #1976d2;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: auto;
    display: block;
`;

type LoaderProps = {
    size?: number;
    className?: string;
};

export const Loader: React.FC<LoaderProps> = ({ size, className }) => (
    <Spinner size={size} className={className} aria-label="Loading..." />
);
