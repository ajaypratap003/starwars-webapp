import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Planet } from "../../components/Planet/Planet";

type CharacterCardProps = {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  homeworld: string;
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  gender,
  birthYear,
  height,
  hairColor,
  skinColor,
  eyeColor,
  homeworld,
}) => {

  return (
    <StyledCharacterCard>
      <h2>{name}</h2>
      <p>Gender: {gender}</p>
      <Planet apiUrl={homeworld} />
      <p>Birth Year: {birthYear}</p>
      <p>Height: {height}</p>
      <p>Hair Color: {hairColor}</p>
      <p>Skin Color: {skinColor}</p>
      <p>Eye Color: {eyeColor}</p>
    </StyledCharacterCard>
  );
};

const StyledCharacterCard = styled.div`
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.9);
  width: 250px;
  min-width: 250px;
  text-wrap: wrap;
  text-align: center;
  border: 3px solid lightblue;
  text-shadow: 1px 1px 1px blue;
  display: inline-block;
`;
