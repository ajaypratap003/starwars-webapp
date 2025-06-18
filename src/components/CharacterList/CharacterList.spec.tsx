import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterList } from "./CharacterList";
import type { Character } from "./CharacterList";

vi.mock("../Loader", () => ({
  Loader: (props: any) => <div data-testid="loader" {...props} />,
}));
vi.mock("../InputField", () => ({
  InputField: (props: any) => <input data-testid="input-field" {...props} />,
}));
vi.mock("../Button", () => ({
  Button: (props: any) => <button {...props}>{props.children}</button>,
}));
vi.mock("../CharacterCard", () => ({
  CharacterCard: (props: any) => (
    <div data-testid="character-card">{props.name}</div>
  ),
}));
vi.mock("../../utils/utils", () => ({
  getIdFromUrl: (url: string) => url.split("/").filter(Boolean).pop(),
}));

const mockCharacters: Character[] = [
  {
    name: "Luke Skywalker",
    uid: "1",
    url: "https://swapi.dev/api/people/1/",
    gender: "male",
    birth_year: "19BBY",
    height: "172",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    homeworld: "Tatooine",
  },
  {
    name: "Leia Organa",
    uid: "2",
    url: "https://swapi.dev/api/people/2/",
    gender: "female",
    birth_year: "19BBY",
    height: "150",
    hair_color: "brown",
    skin_color: "light",
    eye_color: "brown",
    homeworld: "Alderaan",
  },
];

describe("CharacterList", () => {
  const defaultProps = {
    data: mockCharacters,
    searchTerm: "",
    handleSearchChange: vi.fn(),
    nextPeoplePage: vi.fn(),
    previousPage: vi.fn(),
    isLoading: false,
    nextPageUrl: "next-url",
    previousPageUrl: "prev-url",
  };

  it("renders input field with correct value", () => {
    render(<CharacterList {...defaultProps} searchTerm="Luke" />);
    const input = screen.getByTestId("input-field") as HTMLInputElement;
    expect(input.value).toBe("Luke");
  });

  it("calls handleSearchChange on input change", () => {
    render(<CharacterList {...defaultProps} />);
    const input = screen.getByTestId("input-field");
    fireEvent.change(input, { target: { value: "Leia" } });
    expect(defaultProps.handleSearchChange).toHaveBeenCalled();
  });

  it("renders loader when isLoading is true", () => {
    render(<CharacterList {...defaultProps} isLoading={true} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders character cards for each character", () => {
    render(<CharacterList {...defaultProps} />);
    const cards = screen.getAllByTestId("character-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Luke Skywalker");
    expect(cards[1]).toHaveTextContent("Leia Organa");
  });

  it("calls nextPeoplePage with nextPageUrl when next button is clicked", () => {
    render(<CharacterList {...defaultProps} />);
    const nextBtn = screen.getByText(/Next Page/);
    fireEvent.click(nextBtn);
    expect(defaultProps.nextPeoplePage).toHaveBeenCalledWith("next-url");
  });

  it("calls previousPage with previousPageUrl when previous button is clicked", () => {
    render(<CharacterList {...defaultProps} />);
    const prevBtn = screen.getByText(/Previous Page/);
    fireEvent.click(prevBtn);
    expect(defaultProps.previousPage).toHaveBeenCalledWith("prev-url");
  });

  it("disables previous button if previousPageUrl is empty", () => {
    render(<CharacterList {...defaultProps} previousPageUrl="" />);
    const prevBtn = screen.getByText(/Previous Page/) as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it("disables next button if nextPageUrl is empty", () => {
    render(<CharacterList {...defaultProps} nextPageUrl="" />);
    const nextBtn = screen.getByText(/Next Page/) as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });

  it("renders no character cards if data is empty", () => {
    render(<CharacterList {...defaultProps} data={[]} />);
    expect(screen.queryByTestId("character-card")).not.toBeInTheDocument();
  });
});
