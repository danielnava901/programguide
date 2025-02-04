import { describe, it, expect, vi } from "vitest";
import { getDateFormatted, getTodayEpoch,
    getDateMinimal, getDurationFormat } from "../formatter.js";

describe("getDateFormatted", () => {
    it("debería regresar las fechas correctamente formateadas", () => {
        const resultado = getDateFormatted();
        expect(resultado).toHaveProperty("now");
        expect(resultado).toHaveProperty("tomorrow");
        expect(resultado).toHaveProperty("today");

        expect(resultado.today).toMatch(/^\d{2}\/\d{2}$/); // Formato DD/MM
        expect(resultado.now).toMatch(/^\d{8}000000$/); // Formato YYYYMMDD000000
    });
});

describe("getTodayEpoch", () => {
    it("debería regresar timestamps de época válidos", () => {
        const resultado = getTodayEpoch();
        const ahora = Math.floor(Date.now() / 1000);

        expect(resultado).toHaveProperty("dayStart");
        expect(resultado).toHaveProperty("now");
        expect(resultado).toHaveProperty("dayEnd");

        expect(resultado.dayStart).toBeLessThanOrEqual(resultado.now);
        expect(resultado.dayEnd).toBeGreaterThan(resultado.dayStart);
    });
});

describe("getDateMinimal", () => {
    it("debería regresar la hora en formato HH:mm hs", () => {
        const epoca = new Date().getTime(); // Un valor fijo
        const resultado = getDateMinimal(epoca);

        expect(resultado).toMatch(/^\d{2}:\d{2} hs$/);
    });
});

describe("getDurationFormat", () => {
    it("debería regresar la duración formateada", () => {
        expect(getDurationFormat(3660)).toBe("1hr 1min");
        expect(getDurationFormat(7200)).toBe("2hr 0min");
        expect(getDurationFormat(180)).toBe("0hr 3min");
    });
});
