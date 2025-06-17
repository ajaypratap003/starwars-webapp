import { useParams, useNavigate } from "react-router-dom";
import { Loader, CharacterDetails } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { saveFavourites, type StarWars } from "../store/starwarsSlice";
import { hasFavourite } from "../store/selectors";
import { useSwapi } from "../hooks/useSwapi";
import { BASE_URL } from "../constants/constants";

const CharacterDetailsPage = () => {
  const { id='' } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasCharacterFavourite = useSelector((state: StarWars) =>
    hasFavourite(state, id)
  );

  // If id is not provided, return an error message
  // This can happen if the URL is malformed or the character ID is missing
  if (!id) {
    return <p className="p-4">Character ID not found</p>;
  }

  const { data, isLoading } = useSwapi(`${BASE_URL}/people/${id}`);

  const addToFavourites = () => {
    dispatch(saveFavourites(data));
    navigate("/favourites");
  };

  if (isLoading && !data) return <Loader />;

  const { name, gender, hair_color, eye_color, films, starships, homeworld } =
    data ?? {
      name: "",
      gender: "",
      hair_color: "",
      eye_color: "",
      films: [],
      starships: [],
      homeworld: "",
    };

  return (
    <CharacterDetails
      name={name}
      gender={gender}
      hairColor={hair_color}
      eyeColor={eye_color}
      homeworld={homeworld}
      starships={starships}
      isFavourite={hasCharacterFavourite}
      films={films}
      addToFavourites={addToFavourites}
    />
  );
};

export default CharacterDetailsPage;
