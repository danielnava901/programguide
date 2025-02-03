import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from "vitest";
import EpgTable from "../../EpgTable/EpgTable.jsx";


global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
    observe: (node) => {
        // Simula que el último elemento se ha vuelto visible
        callback([{ isIntersecting: true }]);
    },
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe("EpgTable Component", () => {
    const mockOnSelectEvent = vi.fn();
    const mockOnScrollEnd = vi.fn();

    const mockData = [
        {
            id: 1,
            name: "Canal 1",
            image: "canal1.png",
            events: [
                { id: 101, name: "Evento 1", unix_begin: 1700000000, unix_end: 1700003600 },
                { id: 102, name: "Evento 2", unix_begin: 1700003600, unix_end: 1700007200 }
            ]
        },
        {
            id: 2,
            name: "Canal 2",
            image: "canal2.png",
            events: [
                { id: 201, name: "Evento 3", unix_begin: 1700000000, unix_end: 1700007200 }
            ]
        }
    ];

    it("¿Renderiza correctamente la tabla con datos?", () => {
        render(<EpgTable
            data={mockData}
            onSelectEvent={mockOnSelectEvent}
            onScrollEnd={mockOnScrollEnd}
            loading={false} />);


        expect(screen.getByText("Canal 1")).toBeInTheDocument();
        expect(screen.getByText("Canal 2")).toBeInTheDocument();
        expect(screen.getByText("Evento 1")).toBeInTheDocument();
        expect(screen.getByText("Evento 3")).toBeInTheDocument();
    });


    it("¿Llama a onSelectEvent cuando se hace clic en un evento?", () => {
        render(<EpgTable
            data={mockData}
            onSelectEvent={mockOnSelectEvent}
            onScrollEnd={mockOnScrollEnd}
            loading={false} />);

        const eventElement = screen.getByText("Evento 1");
        fireEvent.click(eventElement);

        expect(mockOnSelectEvent).toHaveBeenCalledWith(mockData[0].events[0]);
    });


    it("¿Ejecuta onScrollEnd cuando el último elemento se vuelve visible?", () => {
        render(<EpgTable
            data={mockData}
            onSelectEvent={mockOnSelectEvent}
            onScrollEnd={mockOnScrollEnd}
            loading={false} />);

        const lastEventElement = screen.getByText("Evento 3");
        fireEvent.scroll(lastEventElement);

        expect(mockOnScrollEnd).toHaveBeenCalled();
    });


    it("¿Aplica la clase 'selected' al evento seleccionado?", () => {
        render(<EpgTable
            data={mockData}
            onSelectEvent={mockOnSelectEvent}
            onScrollEnd={mockOnScrollEnd}
            loading={false} />);

        const eventElement = screen.getByText("Evento 2");
        fireEvent.click(eventElement);

        expect(eventElement.parentElement).toHaveClass("selected");
    });


    it("¿Muestra 'Cargando...' cuando loading es true?", () => {
        render(<EpgTable
            data={[]}
            onSelectEvent={mockOnSelectEvent}
            onScrollEnd={mockOnScrollEnd}
            loading={true} />);

        expect(screen.getByText("Cargando...")).toBeInTheDocument();
    });

    it("¿Muestra 'No hay datos' cuando data está vacío?", () => {
        render(<EpgTable
            data={[]}
            onSelectEvent={mockOnSelectEvent}
            onScrollEnd={mockOnScrollEnd} />);

        expect(screen.getByText("No hay datos para mostrar, intente más tarde")).toBeInTheDocument();
    });


});
