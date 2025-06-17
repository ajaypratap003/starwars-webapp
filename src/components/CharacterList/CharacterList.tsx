import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSwapi } from "../../hooks/useSwapi";
import { Loader } from "../Loader";
import { InputField } from "../InputField";
import { BASE_URL } from "../../constants/constants";
import { CharacterCard } from "../CharacterCard";
import { useSelector, useDispatch } from "react-redux";
import { selectedFilteredCharacters } from "../../store/selectors";
import { saveCharacters } from "../../store/starwarsSlice";
import type { StarWars } from "../../store/starwarsSlice";
import { getIdFromUrl } from "../../utils/utils";

type Character = {
  name: string;
  uid: string;
  url: string;
  gender: string;
  birth_year: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  homeworld: string;
};

const CharacterList: React.FC = () => {
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [urlPeople, setUrlPeople] = useState<string>(
    `${BASE_URL}/people/?page=1&${
      searchTerm && `name=${searchTerm}`
    }&limit=${limit}`
  );
  const dispatch = useDispatch();
  const filteredData = useSelector((state: StarWars) =>
    selectedFilteredCharacters(state, searchTerm)
  );

  // State to manage the current page for pagination
  const { data = [], error, isLoading } = useSwapi(urlPeople);

  // const filteredData = data?.results?.filter((char: Character) =>
  //   char?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );

  useEffect(() => {
    if (data?.results) {
      dispatch(saveCharacters(data?.results));
    }
  }, [data?.results]);

  // If data is still loading, show a loader
  if (isLoading && !data?.results) {
    return <Loader />;
  }

  // If there's an error, display it
  if (error) {
    return <p>Error fetching characters: {error}</p>;
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const nextPeoplePage = () => {
    setUrlPeople(data.next);
  };

  const previousPage = () => {
    setUrlPeople(data.previous);
  };

  return (
    <>
      <InputFieldWrapper
        placeholder="Search characters by name"
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <PaginationWrapper>
        <button onClick={previousPage} disabled={data?.previous ? false : true}>
          ⏪ Previous Page
        </button>
        <button onClick={nextPeoplePage} disabled={data?.next ? false : true}>
          Next Page⏩
        </button>
      </PaginationWrapper>
      {isLoading && <LoaderWrapper size={20} />}
      <CharacterCardWrapper>
        {filteredData?.map((people: Character) => {
          const uid = getIdFromUrl(people?.url) ?? "";
          return (
            <CharacterCard
              key={uid}
              name={people.name}
              gender={people.gender}
              birthYear={people.birth_year}
              height={people.height}
              hairColor={people.hair_color}
              skinColor={people.skin_color}
              eyeColor={people.eye_color}
              homeworld={people.homeworld}
              uid={uid}
            />
          );
        })}
      </CharacterCardWrapper>
    </>
  );
};

export default CharacterList;

const LoaderWrapper = styled(Loader)`
  margin-bottom: 10px;
`;

const CharacterCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 800px;
  min-height: 600px;
  color: white;
  cursor: pointer;
`;

const InputFieldWrapper = styled(InputField)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
