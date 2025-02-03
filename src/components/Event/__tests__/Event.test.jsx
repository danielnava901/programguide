import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Event from '../Event'; // Asegúrate de que la ruta es correcta
import { vi } from 'vitest';
import { getDateMinimal, getDurationFormat} from "../../../utils/formatter.js";

vi.mock('../../../utils/formatter.js', () => ({
    getDateMinimal: vi.fn((unix) => `MockedDate(${unix})`),
    getDurationFormat: vi.fn((duration) => `MockedDuration(${duration})`),
}));

describe('Event Component', () => {

    it('Muestra el mensaje "No hay información" si no se proporciona un evento', () => {
        render(<Event event={null} />);

        expect(screen.getByText('No hay información')).toBeInTheDocument();
    });

    it('Renderiza correctamente los detalles del evento', () => {
        const mockEvent = {
            name: 'Evento de prueba',
            unix_begin: 1710000000,
            unix_end: 1710003600,
            parental_rating: 'PG-13',
            description: 'Descripción de prueba',
            ext_eventimage_name: 'https://example.com/image.jpg',
        };

        render(<Event event={mockEvent} />);

        expect(screen.getByText('Evento de prueba')).toBeInTheDocument();

        expect(getDateMinimal).toHaveBeenCalledTimes(2);
        expect(getDateMinimal).toHaveBeenCalledWith(mockEvent.unix_begin);
        expect(getDateMinimal).toHaveBeenCalledWith(mockEvent.unix_end);

        expect(getDurationFormat).toHaveBeenCalledTimes(1);
        expect(getDurationFormat).toHaveBeenCalledWith(mockEvent.unix_end - mockEvent.unix_begin);

        expect(screen.getByText('PG-13')).toBeInTheDocument();

        expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    });

    it('Renderiza la imagen del evento correctamente', () => {
        const mockEvent = {
            name: 'Evento con imagen',
            unix_begin: 1710000000,
            unix_end: 1710003600,
            parental_rating: 'PG',
            description: 'Descripción de evento con imagen',
            ext_eventimage_name: 'https://example.com/image.jpg',
        };

        const { container } = render(<Event event={mockEvent} />);

        const imageContainer = container.querySelector('.event-image');
        expect(imageContainer).toHaveStyle(`background-image: url(https://example.com/image.jpg)`);
    });

});
