import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Favourites } from "./Favourites";

// Mock CharacterCard and Button to avoid rendering their internals
vi.mock("../CharacterCard", () => ({
  CharacterCard: (props: any) => (
    <div data-testid="character-card" {...props}>
      {props.name}
      <button
        data-testid="delete-action"
        onClick={() => props.deleteAction(props.uid)}
      >
        Delete
      </button>
    </div>
  ),
}));
vi.mock("../Button", () => ({
  Button: (props: any) => (
    <button {...props} data-testid="remove-all-btn">
      {props.children}
    </button>
  ),
}));

describe("Favourites component", () => {
  const mockDeleteAll = vi.fn();
  const mockDeleteFavourite = vi.fn();

  const favourites = [
    {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      eye_color: "blue",
      gender: "male",
      hair_color: "blond",
      height: "172",
      skin_color: "fair",
      homeworld: "Tatooine",
      url: "https://swapi.dev/api/people/1/",
    },
    {
      name: "Leia Organa",
      birth_year: "19BBY",
      eye_color: "brown",
      gender: "female",
      hair_color: "brown",
      height: "150",
      skin_color: "light",
      homeworld: "Alderaan",
      url: "https://swapi.dev/api/people/5/",
    },
  ];

  it("renders header and Remove All button", () => {
    render(
      <Favourites
        favourites={favourites}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    expect(screen.getByText("Favourites Characters")).toBeInTheDocument();
    expect(screen.getByTestId("remove-all-btn")).toBeInTheDocument();
  });

  it("disables Remove All button when no favourites", () => {
    render(
      <Favourites
        favourites={[]}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    expect(screen.getByTestId("remove-all-btn")).toBeDisabled();
  });

  it("enables Remove All button when there are favourites", () => {
    render(
      <Favourites
        favourites={favourites}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    expect(screen.getByTestId("remove-all-btn")).not.toBeDisabled();
  });

  it("calls deleteAll when Remove All button is clicked", () => {
    render(
      <Favourites
        favourites={favourites}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    fireEvent.click(screen.getByTestId("remove-all-btn"));
    expect(mockDeleteAll).toHaveBeenCalled();
  });

  it("renders 'No record found' when favourites is empty", () => {
    render(
      <Favourites
        favourites={[]}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    expect(screen.getByText("No record found")).toBeInTheDocument();
  });

  it("renders CharacterCard for each favourite", () => {
    render(
      <Favourites
        favourites={favourites}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    const cards = screen.getAllByTestId("character-card");
    expect(cards).toHaveLength(favourites.length);
    expect(cards[0]).toHaveTextContent("Luke Skywalker");
    expect(cards[1]).toHaveTextContent("Leia Organa");
  });

  it("calls deleteFavourite with correct uid when delete action is triggered", () => {
    render(
      <Favourites
        favourites={favourites}
        deleteAll={mockDeleteAll}
        deleteFavourite={mockDeleteFavourite}
      />
    );
    const deleteButtons = screen.getAllByTestId("delete-action");
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteFavourite).toHaveBeenCalledWith("1");
    fireEvent.click(deleteButtons[1]);
    expect(mockDeleteFavourite).toHaveBeenCalledWith("5");
  });
});
