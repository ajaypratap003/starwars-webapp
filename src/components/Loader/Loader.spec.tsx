import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from './Loader';

describe('Loader', () => {
    it('renders without crashing', () => {
        const { getByLabelText } = render(<Loader />);
        const spinner = getByLabelText('Loading...');
        expect(spinner).toBeInTheDocument();
    });

    it('applies the default size when no size prop is provided', () => {
        const { getByLabelText } = render(<Loader />);
        const spinner = getByLabelText('Loading...');
        expect(spinner).toHaveStyle('width: 48px');
        expect(spinner).toHaveStyle('height: 48px');
    });

    it('applies the given size prop', () => {
        const { getByLabelText } = render(<Loader size={64} />);
        const spinner = getByLabelText('Loading...');
        expect(spinner).toHaveStyle('width: 64px');
        expect(spinner).toHaveStyle('height: 64px');
    });

    it('applies the given className', () => {
        const { getByLabelText } = render(<Loader className="custom-class" />);
        const spinner = getByLabelText('Loading...');
        expect(spinner).toHaveClass('custom-class');
    });

    it('has the correct aria-label for accessibility', () => {
        const { getByLabelText } = render(<Loader />);
        const spinner = getByLabelText('Loading...');
        expect(spinner).toBeTruthy();
    });
});