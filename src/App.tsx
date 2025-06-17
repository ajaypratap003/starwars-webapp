import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav, Loader } from "./components";

const CharactersPage = lazy(
  () => import("./pages/CharactersPage")
);
const CharacterDetailsPage = lazy(
  () => import("./pages/CharacterDetailsPage")
);
const Favourites = lazy(
  () => import("./pages/FavouritesPage")
);

const App = () => {
  return (
    <Router>
      <Nav
        logo="StarWars"
        items={[
          { label: "Characters", href: "/" },
          { label: "Favourites", href: "/favourites" },
        ]}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetailsPage />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
