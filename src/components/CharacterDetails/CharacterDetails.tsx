import styled from "styled-components";
import { Films } from "./Films";
import { Starships } from "./Starships";
import { Planet } from "../Planet/Planet";

export type CharacterDetailsProps = {
  name: string;
  gender: string;
  homeworld: string;
  hairColor: string;
  eyeColor: string;
  films: string[];
  starships: string[];
  addToFavourites: () => void;
  isFavourite: boolean;
};

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  name,
  gender,
  hairColor,
  eyeColor,
  homeworld,
  starships,
  films,
  isFavourite,
  addToFavourites,
}) => {
  return (
    <CharacterDetailsWrapper>
      {!isFavourite && <StyledButton onClick={addToFavourites}>Add to Favourites</StyledButton>}
      <StyledCharacter>
        <p>
          <b>Name:</b> {name}
        </p>
        <p>
          <b>Hair Color:</b> {hairColor}
        </p>
        <p>
          <b>Eye Color:</b> {eyeColor}
        </p>
        <p>
          <b>Gender:</b> {gender}
        </p>
        <Planet apiUrl={homeworld} />
      </StyledCharacter>
      <StyledFilmsStarships>
        <Films filmUrls={films} />
        <Starships urls={starships} />
      </StyledFilmsStarships>
    </CharacterDetailsWrapper>
  );
};

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
