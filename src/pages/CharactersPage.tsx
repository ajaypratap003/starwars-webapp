import React, { useState, useEffect, useDeferredValue } from "react";
import { useSwapi } from "../hooks/useSwapi";
import { Loader, CharacterList } from "../components";
import { BASE_URL } from "../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { selectedFilteredCharacters } from "../store/selectors";
import { saveCharacters } from "../store/starwarsSlice";
import type { StarWars } from "../store/starwarsSlice";

const CharactersPage: React.FC = () => {
  const limit = 10;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const [urlPeople, setUrlPeople] = useState<string>(
    `${BASE_URL}/people/?page=1&${
      deferredSearchTerm && `name=${deferredSearchTerm}`
    }&limit=${limit}`
  );

  const filteredData = useSelector((state: StarWars) =>
    selectedFilteredCharacters(state, deferredSearchTerm)
  );

  // State to manage the current page for pagination
  const { data = [], error, isLoading } = useSwapi(urlPeople);

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
      <CharacterList
        data={filteredData}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        nextPageUrl={data?.next}
        previousPageUrl={data?.previous}
        isLoading={isLoading}
        nextPeoplePage={nextPeoplePage}
        previousPage={previousPage}
      />
    </>
  );
};

export default CharactersPage;
