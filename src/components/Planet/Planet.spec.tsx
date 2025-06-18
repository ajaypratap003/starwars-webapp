import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Planet } from "./Planet";

// Mock the Skeleton component
vi.mock("..", () => ({
    Skeleton: ({ width }: { width: string }) => <div data-testid="skeleton" style={{ width }} />,
}));

describe("Planet component", () => {
    const mockApiUrl = "https://swapi.dev/api/planets/1/";

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders 'No API URL provided.' if apiUrl is not given", () => {
        render(<Planet apiUrl={""} />);
        expect(screen.getByText("No API URL provided.")).toBeInTheDocument();
    });

    it("shows Skeleton while loading", async () => {
        (global.fetch as any) = vi.fn(() =>
            new Promise(() => {}) // never resolves
        );
        render(<Planet apiUrl={mockApiUrl} />);
        expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    });

    it("renders planet name after fetch", async () => {
        (global.fetch as any) = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ name: "Tatooine" }),
            })
        );
        render(<Planet apiUrl={mockApiUrl} />);
        await waitFor(() => expect(screen.getByText(/Home Planet:/)).toBeInTheDocument());
        expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });

    it("renders 'Unknown' if planet name is missing", async () => {
        (global.fetch as any) = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        );
        render(<Planet apiUrl={mockApiUrl} />);
        await waitFor(() => expect(screen.getByText(/Home Planet:/)).toBeInTheDocument());
        expect(screen.getByText("Unknown")).toBeInTheDocument();
    });

    it("handles fetch error gracefully", async () => {
        (global.fetch as any) = vi.fn(() => Promise.reject(new Error("Network error")));
        render(<Planet apiUrl={mockApiUrl} />);
        await waitFor(() => expect(screen.getByText(/Home Planet:/)).toBeInTheDocument());
        expect(screen.getByText("Unknown")).toBeInTheDocument();
    });
});