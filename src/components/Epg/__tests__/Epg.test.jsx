import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import '@testing-library/jest-dom';
import Epg from "../Epg"; // Asegúrate de que la ruta sea correcta
import { useFetchData } from "../../../hooks/useFetchData.js";
import { getDateFormatted } from "../../../utils/formatter.js";

// Mock de useFetchData para simular datos de API
vi.mock("../../../hooks/useFetchData.js", () => ({
    useFetchData: vi.fn(),
}));

// Mock de getDateFormatted para evitar dependencias externas
vi.mock("../../../utils/formatter.js", () => ({
    getDateFormatted: vi.fn(() => ({
        now: "2024020300",
        tomorrow: "2024020400",
        today: "03/02",
    })),
    getTodayEpoch: vi.fn(() => ({
        dayStart: 1738564008091,
        now: 1738564008091,
        dayEnd: 1738564008091
    }))
}));

describe("Epg Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Renderiza correctamente la fecha actual", () => {
        useFetchData.mockReturnValue({ data: [], loading: false, error: null });
        render(<Epg />);

        expect(screen.getByText("03/02")).toBeInTheDocument();
    });

    it("Renderiza el componente Event sin evento seleccionado", () => {
        useFetchData.mockReturnValue({ data: [], loading: false, error: null });
        render(<Epg />);

        expect(screen.getByText("Seleccione un programa para ver su información")).toBeInTheDocument();
    });


    it("Muestra un mensaje de error si la API devuelve un error", () => {
        useFetchData.mockReturnValue({ data: [], loading: false, error: {message: "Error de comunicaciones"} });
        render(<Epg />);

        expect(screen.getByText("Error de comunicaciones")).toBeInTheDocument();
    });

});