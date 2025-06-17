import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav, Loader } from "./components";

const CharacterList = lazy(
  () => import("./components/CharacterList/CharacterList")
);
const CharacterDetails = lazy(
  () => import("./pages/CharacterDetails/CharacterDetails")
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
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
