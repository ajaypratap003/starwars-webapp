import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getIdFromUrl } from "../utils/utils";

export type StarWars = {
  characters: any[];
  planet: string;
  films: any[];
  starShips: any[];
  favourites: any[];
};

const initialState: StarWars = {
  characters: [],
  planet: "",
  films: [],
  starShips: [],
  favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
};

// Helper function to save favourites to localStorage
function saveFavouritesToLocalStorage(state: StarWars) {
  localStorage.setItem("favourites", JSON.stringify(state.favourites));
}

const starWarsSlice = createSlice({
  name: "starwars",
  initialState,
  reducers: {
    saveCharacters: (state, action: PayloadAction<any[]>) => {
      state.characters = action.payload;
    },
    savePlanet: (state, action: PayloadAction<string>) => {
      state.planet = action.payload;
    },
    saveFavourites: (state, action: PayloadAction<any[]>) => {
      state.favourites.push(action.payload);
      saveFavouritesToLocalStorage(state);
    },
    deleteAllFavourites: (state) => {
      state.favourites.length = 0;
      saveFavouritesToLocalStorage(state);
    },
    deleteFavouriteByUID: (state, action: PayloadAction<string>) => {
      const uid = action.payload;
      state.favourites=state?.favourites?.filter((fav) => getIdFromUrl(fav?.url) !== uid);
      saveFavouritesToLocalStorage(state);
    },
  },
});

export const {
  saveCharacters,
  savePlanet,
  saveFavourites,
  deleteAllFavourites,
  deleteFavouriteByUID
} = starWarsSlice.actions;
export default starWarsSlice.reducer;
