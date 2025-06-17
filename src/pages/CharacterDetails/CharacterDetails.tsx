import {useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../../components/Loader";
import { Films } from "./Films";
import { Starships } from "./Starships";
import { Planet } from "../../components/Planet/Planet";
import { useSelector, useDispatch } from "react-redux";
import { selectedCharacterByUID } from "../../store/selectors";
import { saveFavourites } from "../../store/starwarsSlice";
import type { StarWars } from "../../store/starwarsSlice";

type Character = {
  name: string;
  url: string;
  gender: string;
  height: string;
  homeworld: string;
  hair_color: string;
  eye_color: string;
};

const CharacterDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate= useNavigate();

  // If id is not provided, return an error message
  // This can happen if the URL is malformed or the character ID is missing
  if (!id) {
    return <p className="p-4">Character ID not found</p>;
  }

  const data = useSelector((state: StarWars) =>
    selectedCharacterByUID(state, id)
  );

  const addToFavourites = () => {
    dispatch(saveFavourites(data));
    navigate('/favourites');
  };

  if (!data) return <Loader />;

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
        <Films filmUrls={data?.films} />
        <Starships urls={data?.starships} />
      </StyledFilmsStarships>
    </CharacterDetailsWrapper>
  );
};

export default CharacterDetails;

const CharacterDetailsWrapper = styled.div`
  padding: 40px;
  max-width: 800px;
  width: 600px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.41);
  border-radius: 10px;
  font-family: Arial, sans-serif;
  color: white;
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
