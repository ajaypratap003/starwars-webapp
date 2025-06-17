import React from "react";
import styled from "styled-components";
import { CharacterCard } from "../CharacterCard";
import { getIdFromUrl } from "../../utils/utils";

export type FavouritesProps = {
  favourites: any[];
  deleteAll: ()=>void;
  deleteFavourite: (uid: string)=> void;
};

export const Favourites: React.FC<FavouritesProps> = ({ favourites, deleteAll, deleteFavourite }) => {

  return (
    <div>
      <ButtonWrapper disabled={favourites?.length===0} onClick={deleteAll}>Remove All from Favourites</ButtonWrapper>
      <HeaderWrapper>Favourites Characters</HeaderWrapper>
      <FavouritesCardWrapper>
        {favourites?.length===0 && <EmptyMessageWrapper>No favourites found</EmptyMessageWrapper>};
        {favourites?.map((fav) => {
          const {
            name,
            birth_year,
            eye_color,
            gender,
            hair_color,
            height,
            skin_color,
            homeworld,
            url,
          } = fav;
          const uid = getIdFromUrl(url);
          return (
            <CharacterCard
              name={name}
              birthYear={birth_year}
              eyeColor={eye_color}
              gender={gender}
              hairColor={hair_color}
              height={height}
              homeworld={homeworld}
              skinColor={skin_color}
              uid={uid ?? ""}
              key={uid}
              enabledClick={false}
              enabledAction={true}
              deleteAction={deleteFavourite}
            />
          );
        })}
      </FavouritesCardWrapper>
    </div>
  );
};

const EmptyMessageWrapper= styled.div`
  font-size: 25px;
`

const ButtonWrapper = styled.button`
  float: right;
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

const HeaderWrapper = styled.h1`
  text-align: center;
  color: white;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const FavouritesCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 800px;
  min-height: 450px;
  color: white;
  cursor: pointer;
`;
