import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import '@testing-library/jest-dom';
import { FullMenu } from "../FullMenu.jsx";

// Mock para `fetch`
global.fetch = vi.fn();

describe("FullMenu Component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });


    it("Hace una petición a /README.md cuando option es 'readme'", async () => {
        fetch.mockResolvedValue({
            text: vi.fn().mockResolvedValue("# Título del README"),
        });

        render(<FullMenu option="readme" />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith("/README.md");
        });
    });

    it("Muestra el contenido del README después de cargarlo", async () => {
        fetch.mockResolvedValue({
            text: vi.fn().mockResolvedValue("# Bienvenido al README"),
        });

        render(<FullMenu option="readme" />);

        await waitFor(() => {
            expect(screen.getByText("Bienvenido al README")).toBeInTheDocument();
        });
    });

    it("Maneja errores al cargar el README", async () => {
        // Simula un error en el fetch
        fetch.mockRejectedValue(new Error("Error de carga"));

        render(<FullMenu option="readme" />);

        // Espera a que fetch sea llamado y el error sea manejado
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith("/README.md");
        });

        // Como el error solo se imprime en `console.error`, verificamos que no haya contenido
        expect(screen.getByText("Error de carga")).toBeInTheDocument();
    });

});
