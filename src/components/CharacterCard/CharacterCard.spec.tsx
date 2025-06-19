import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import type {CharacterCardProps} from './CharacterCard';

// Mock Planet component
vi.mock("../../components/Planet/Planet", () => ({
    Planet: ({ apiUrl }: { apiUrl: string }) => <div data-testid="planet">{apiUrl}</div>,
}));

const defaultProps: CharacterCardProps = {
    name: "Luke Skywalker",
    gender: "male",
    birthYear: "19BBY",
    height: "172",
    hairColor: "blond",
    skinColor: "fair",
    eyeColor: "blue",
    homeworld: "https://swapi.dev/api/planets/1/",
    uid: "1",
};

const renderComponent = (props?: Partial<CharacterCardProps>) =>
    render(
        <MemoryRouter>
            <CharacterCard {...defaultProps} {...props} />
        </MemoryRouter>
    );

describe("CharacterCard", () => {
    it("renders all character details", () => {
        renderComponent();
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText(/Gender:/)).toHaveTextContent("Gender: male");
        expect(screen.getByText(/Birth Year:/)).toHaveTextContent("Birth Year: 19BBY");
        expect(screen.getByText(/Height:/)).toHaveTextContent("Height: 172");
        expect(screen.getByText(/Hair Color:/)).toHaveTextContent("Hair Color: blond");
        expect(screen.getByText(/Skin Color:/)).toHaveTextContent("Skin Color: fair");
        expect(screen.getByText(/Eye Color:/)).toHaveTextContent("Eye Color: blue");
        expect(screen.getByTestId("planet")).toHaveTextContent(defaultProps.homeworld);
    });
});