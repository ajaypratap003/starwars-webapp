import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CharacterList } from "./components/CharacterList/CharacterList";
import {CharacterDetails} from "./pages/CharacterDetails/CharacterDetails";
import "./App.css";
import { Nav } from "./components/Nav/Nav";
import Favourites from './pages/Favourites';

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
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
};

export default App;
