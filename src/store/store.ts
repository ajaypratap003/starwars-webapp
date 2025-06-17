import { configureStore } from "@reduxjs/toolkit";
import starWarsRducer from "./starwarsSlice";

export const store = configureStore({
  reducer: starWarsRducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
