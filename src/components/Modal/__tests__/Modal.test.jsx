import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Modal} from "../index.js";

describe('Modal Component', () => {

    it('No debe mostrar el modal cuando isOpen es false', () => {
        const {container} = render(<Modal isOpen={false} onClose={vi.fn()} />);
        const modal = container.querySelector('.modal');
        expect(modal).toBeNull();
    });

    it('Debe mostrar el modal cuando isOpen es true', () => {
        const {container} = render(<Modal isOpen={true} onClose={vi.fn()} />);
        const modal = container.querySelector('.modal');
        expect(modal).toBeInTheDocument();
    });

    it('Manda llamar al función close cuando se da clic en el botón ', () => {
        const mockOnClose = vi.fn();
        render(<Modal isOpen={true} onClose={mockOnClose} />);
        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

});
