import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { Films } from "./Films";
import { Starships } from "./Starships";
import { useSwapi } from "../../hooks/useSwapi";
import { Planet } from "../../components/Planet/Planet";
import { BASE_URL } from "../../constants/constants";

type Character = {
  name: string;
  url: string;
  gender: string;
  height: string;
  homeworld: string;
  hair_color: string;
  eye_color: string;
};

export const CharacterDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useSwapi( `${BASE_URL}/people/${id}`);

  // If id is not provided, return an error message
  // This can happen if the URL is malformed or the character ID is missing
  if (!id) {
    return <p className="p-4">Character ID not found</p>;
  }

  const addToFavourites = () => {
    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    if (!favs.some((f: Character) => f.name === data.name)) {
      localStorage.setItem(
        "favourites",
        JSON.stringify([...favs, data])
      );
      alert("Added to favourites");
    }
  };

  if (isLoading && !data) return <Loader />;

  return (
    <CharacterDetailsWrapper>
      <StyledButton onClick={addToFavourites}>Add to Favourites</StyledButton>
      <StyledCharacter>
        <p>
          <b>Name:</b> {data?.name}
        </p>
        <p>
          <b>Hair Color:</b> {data?.hair_color}
        </p>
        <p>
          <b>Eye Color:</b> {data?.eye_color}
        </p>
        <p>
          <b>Gender:</b> {data?.gender}
        </p>
        <Planet apiUrl={data?.homeworld} />
      </StyledCharacter>
      <StyledFilmsStarships>
        <Films filmUrls={data?.films}/>
        <Starships urls={data?.starships}/>
      </StyledFilmsStarships>
    </CharacterDetailsWrapper>
  );
};

const CharacterDetailsWrapper = styled.div`
  padding: 40px;
  max-width: 800px;
  width: 600px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
`;

const StyledCharacter = styled.div`
  padding-top: 20px;
  margin-top: 30px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
  }
`;

const StyledFilmsStarships = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: space-between;
`;
