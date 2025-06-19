import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
    it('renders without crashing', () => {
        render(<InputField />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with a label when label prop is provided', () => {
        render(<InputField label="Username" id="username" />);
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('does not render a label when label prop is not provided', () => {
        render(<InputField id="no-label" />);
        expect(screen.queryByLabelText(/.+/)).toBeNull();
    });

    it('passes props to the input element', () => {
        render(<InputField id="test-input" placeholder="Type here" />);
        const input = screen.getByPlaceholderText('Type here');
        expect(input).toHaveAttribute('id', 'test-input');
    });

    it('calls onChange handler when input value changes', () => {
        const handleChange = vi.fn();
        render(<InputField onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'hello' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders input with the correct value', () => {
        render(<InputField value="starwars" readOnly />);
        const input = screen.getByDisplayValue('starwars');
        expect(input).toBeInTheDocument();
    });

    it('renders input as disabled when disabled prop is true', () => {
        render(<InputField disabled />);
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
    });
});