import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
    it('renders with default props', () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole('button', { name: /click me/i });
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveStyle('background: #1976d2');
        expect(btn).toHaveStyle('color: #fff');
        expect(btn).toHaveStyle('padding: 0.5rem 1.25rem');
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const btn = screen.getByRole('button', { name: /secondary/i });
        expect(btn).toHaveStyle('background: #fff');
        expect(btn).toHaveStyle('color: #1976d2');
        expect(btn).toHaveStyle('border: 1px solid #1976d2');
    });

    it('renders with danger variant', () => {
        render(<Button variant="danger">Danger</Button>);
        const btn = screen.getByRole('button', { name: /danger/i });
        expect(btn).toHaveStyle('background: #d32f2f');
        expect(btn).toHaveStyle('color: #fff');
    });

    it('renders with small size', () => {
        render(<Button size="small">Small</Button>);
        const btn = screen.getByRole('button', { name: /small/i });
        expect(btn).toHaveStyle('padding: 0.25rem 0.75rem');
        expect(btn).toHaveStyle('font-size: 0.875rem');
    });

    it('renders with large size', () => {
        render(<Button size="large">Large</Button>);
        const btn = screen.getByRole('button', { name: /large/i });
        expect(btn).toHaveStyle('padding: 0.75rem 2rem');
        expect(btn).toHaveStyle('font-size: 1.125rem');
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        const btn = screen.getByRole('button', { name: /click/i });
        fireEvent.click(btn);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is set', () => {
        render(<Button disabled>Disabled</Button>);
        const btn = screen.getByRole('button', { name: /disabled/i });
        expect(btn).toBeDisabled();
        expect(btn).toHaveStyle('opacity: 0.6');
        expect(btn).toHaveStyle('cursor: not-allowed');
    });

    it('passes additional props to the button', () => {
        render(<Button type="submit" data-testid="my-btn">Submit</Button>);
        const btn = screen.getByTestId('my-btn');
        expect(btn).toHaveAttribute('type', 'submit');
    });
});