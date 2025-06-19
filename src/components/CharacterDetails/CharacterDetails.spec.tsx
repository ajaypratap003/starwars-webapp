import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterDetails } from "./CharacterDetails";
import type { CharacterDetailsProps } from "./CharacterDetails";

// Mock child components
vi.mock("./Films", () => ({
  Films: ({ filmUrls }: { filmUrls: string[] }) => (
    <div data-testid="films">{filmUrls.join(",")}</div>
  ),
}));
vi.mock("./Starships", () => ({
  Starships: ({ urls }: { urls: string[] }) => (
    <div data-testid="starships">{urls.join(",")}</div>
  ),
}));
vi.mock("../Planet/Planet", () => ({
  Planet: ({ apiUrl }: { apiUrl: string }) => (
    <div data-testid="planet">{apiUrl}</div>
  ),
}));

const defaultProps: CharacterDetailsProps = {
  name: "Luke Skywalker",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  hairColor: "blond",
  eyeColor: "blue",
  films: ["film1", "film2"],
  starships: ["starship1"],
  addToFavourites: vi.fn(),
  isFavourite: false,
};

describe("CharacterDetails", () => {
  it("renders character details", () => {
    render(<CharacterDetails {...defaultProps} />);

    expect(screen.getByText((content, element) => {
      // Skip <b> tag, match parent text content
      return (
        element?.tagName.toLowerCase() !== "b" &&
        content.includes("Luke Skywalker")
      );
    })).toHaveTextContent("Luke Skywalker");
      expect(screen.getByText((content, element) => {
      // Skip <b> tag, match parent text content
      return (
        element?.tagName.toLowerCase() !== "b" &&
        content.includes("Luke Skywalker")
      );
    })).toHaveTextContent("Luke Skywalker");

      expect(screen.getByText((content, element) => {
      // Skip <b> tag, match parent text content
      return (
        element?.tagName.toLowerCase() !== "b" &&
        content.includes("blond")
      );
    })).toHaveTextContent("blond");

      expect(screen.getByText((content, element) => {
      // Skip <b> tag, match parent text content
      return (
        element?.tagName.toLowerCase() !== "b" &&
        content.includes("male")
      );
    })).toHaveTextContent("male");
  });

  it("renders Planet with correct apiUrl", () => {
    render(<CharacterDetails {...defaultProps} />);
    expect(screen.getByTestId("planet")).toHaveTextContent(
      defaultProps.homeworld
    );
  });

  it("renders Films and Starships with correct props", () => {
    render(<CharacterDetails {...defaultProps} />);
    expect(screen.getByTestId("films")).toHaveTextContent("film1,film2");
    expect(screen.getByTestId("starships")).toHaveTextContent("starship1");
  });

  it("shows Add to Favourites button when not favourite", () => {
    render(<CharacterDetails {...defaultProps} isFavourite={false} />);
    expect(
      screen.getByRole("button", { name: /Add to Favourites/i })
    ).toBeInTheDocument();
  });

  it("does not show Add to Favourites button when already favourite", () => {
    render(<CharacterDetails {...defaultProps} isFavourite={true} />);
    expect(
      screen.queryByRole("button", { name: /Add to Favourites/i })
    ).not.toBeInTheDocument();
  });

  it("calls addToFavourites when button is clicked", () => {
    const addToFavourites = vi.fn();
    render(
      <CharacterDetails
        {...defaultProps}
        isFavourite={false}
        addToFavourites={addToFavourites}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Add to Favourites/i }));
    expect(addToFavourites).toHaveBeenCalledTimes(1);
  });

  it("renders empty films and starships gracefully", () => {
    render(<CharacterDetails {...defaultProps} films={[]} starships={[]} />);
    expect(screen.getByTestId("films")).toHaveTextContent("");
    expect(screen.getByTestId("starships")).toHaveTextContent("");
  });
});
