import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
    0% {
        background-position: -400px 0;
    }
    100% {
        background-position: 400px 0;
    }
`;

const SkeletonWrapper = styled.div<{
    width?: string;
    height?: string;
    circle?: boolean;
}>`
    display: inline-block;
    background: #e2e2e2;
    border-radius: ${({ circle }) => (circle ? "50%" : "4px")};
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "1em"};
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(
            90deg,
            #e2e2e2 0%,
            #f5f5f5 50%,
            #e2e2e2 100%
        );
        background-size: 400px 100%;
        animation: ${shimmer} 1.2s infinite linear;
    }
`;

type SkeletonProps = {
    width?: string;
    height?: string;
    circle?: boolean;
    style?: React.CSSProperties;
    className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height,
    circle = false,
    style,
    className,
}) => (
    <SkeletonWrapper
        width={width}
        height={height}
        circle={circle}
        style={style}
        className={className}
        aria-busy="true"
        aria-label="Loading"
    />
);