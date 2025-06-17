import { createSelector } from "@reduxjs/toolkit";
import type { StarWars } from "./starwarsSlice";
import { getIdFromUrl } from "../utils/utils";

export const selectedPlanet = (state: StarWars) => state.planet;
export const selectedFavourites = (state: StarWars) => state.favourites;
export const selectedFilms = (state: StarWars) => state.films;
export const selectedStarShips = (state: StarWars) => state.starShips;

const filteredCharacters = (state: StarWars, payload: string) => {
  const query = payload;
  return state?.characters?.filter((char) =>
    char?.name?.toLowerCase().includes(query?.toLowerCase())
  );
};

const filterCharacterByUID = (state: StarWars, uid: string) => {
  return state?.characters?.find((char) => {
    const id = getIdFromUrl(char?.url);
    return id === uid;
  });
};

export const selectedCharacterByUID = createSelector(
  [filterCharacterByUID],
  (filterCharacterByUID) => filterCharacterByUID
);

export const selectedFilteredCharacters = createSelector(
  [filteredCharacters],
  (filteredCharacters) => filteredCharacters
);
