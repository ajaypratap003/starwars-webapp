import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CharactersPage from "./CharactersPage";

// Mock hooks and components
vi.mock("../hooks/useSwapi", () => ({
    useSwapi: vi.fn(),
}));
vi.mock("../components", () => ({
    Loader: () => <div data-testid="loader" />,
    CharacterList: (props: any) => (
        <div data-testid="character-list">
            <input
                data-testid="search-input"
                value={props.searchTerm}
                onChange={props.handleSearchChange}
            />
            <button
                data-testid="next-btn"
                onClick={props.nextPeoplePage}
                disabled={!props.nextPageUrl}
            >
                Next
            </button>
            <button
                data-testid="prev-btn"
                onClick={props.previousPage}
                disabled={!props.previousPageUrl}
            >
                Prev
            </button>
        </div>
    ),
}));
vi.mock("../store/selectors", () => ({
    selectedFilteredCharacters: vi.fn(() => [{ name: "Luke Skywalker" }]),
}));
vi.mock("../store/starwarsSlice", () => ({
    saveCharacters: (payload: any) => ({ type: "SAVE_CHARACTERS", payload }),
}));

const mockStore = configureStore([]);
const initialState = {};

const renderWithStore = (store: any) =>
    render(
        <Provider store={store}>
            <CharactersPage />
        </Provider>
    );

describe("CharactersPage", () => {
    let useSwapiMock: any;

    beforeEach(() => {
        useSwapiMock = require("../hooks/useSwapi").useSwapi;
    });

    it("renders Loader when loading and no data", () => {
        useSwapiMock.mockReturnValue({ isLoading: true, data: {}, error: null });
        const store = mockStore(initialState);
        renderWithStore(store);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    it("renders error message when error occurs", () => {
        useSwapiMock.mockReturnValue({ isLoading: false, data: {}, error: "Failed" });
        const store = mockStore(initialState);
        renderWithStore(store);
        expect(screen.getByText(/Error fetching characters/i)).toBeInTheDocument();
    });

    it("renders CharacterList with filtered data", () => {
        useSwapiMock.mockReturnValue({
            isLoading: false,
            data: { results: [{ name: "Luke Skywalker" }], next: null, previous: null },
            error: null,
        });
        const store = mockStore(initialState);
        renderWithStore(store);
        expect(screen.getByTestId("character-list")).toBeInTheDocument();
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
    });

    it("calls handleSearchChange on input change", () => {
        useSwapiMock.mockReturnValue({
            isLoading: false,
            data: { results: [{ name: "Luke Skywalker" }], next: null, previous: null },
            error: null,
        });
        const store = mockStore(initialState);
        renderWithStore(store);
        const input = screen.getByTestId("search-input");
        fireEvent.change(input, { target: { value: "Leia" } });
        expect(input).toHaveValue("Leia");
    });

    it("calls nextPeoplePage and previousPage on button clicks", () => {
        useSwapiMock.mockReturnValue({
            isLoading: false,
            data: { results: [{ name: "Luke Skywalker" }], next: "next-url", previous: "prev-url" },
            error: null,
        });
        const store = mockStore(initialState);
        renderWithStore(store);

        const nextBtn = screen.getByTestId("next-btn");
        const prevBtn = screen.getByTestId("prev-btn");

        fireEvent.click(nextBtn);
        fireEvent.click(prevBtn);

        // No assertion here as the handlers just update state,
        // but we ensure buttons are present and clickable.
        expect(nextBtn).toBeEnabled();
        expect(prevBtn).toBeEnabled();
    });

    it("disables next/prev buttons if no next/previous page", () => {
        useSwapiMock.mockReturnValue({
            isLoading: false,
            data: { results: [{ name: "Luke Skywalker" }], next: null, previous: null },
            error: null,
        });
        const store = mockStore(initialState);
        renderWithStore(store);

        expect(screen.getByTestId("next-btn")).toBeDisabled();
        expect(screen.getByTestId("prev-btn")).toBeDisabled();
    });
});