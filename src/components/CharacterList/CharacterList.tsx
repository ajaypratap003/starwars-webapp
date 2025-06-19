import styled from "styled-components";
import { Loader } from "../Loader";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { CharacterCard } from "../CharacterCard";
import { getIdFromUrl } from "../../utils/utils";

export type Character = {
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

export type CharacterListProps = {
  data: any;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nextPeoplePage: (url: string) => void;
  previousPage: (url: string) => void;
  isLoading: boolean;
  nextPageUrl: string;
  previousPageUrl: string;
};

export const CharacterList: React.FC<CharacterListProps> = ({
  data,
  searchTerm,
  handleSearchChange,
  nextPeoplePage,
  previousPage,
  isLoading,
  nextPageUrl,
  previousPageUrl
}) => {
  return (
    <>
      <InputFieldWrapper
        placeholder="Search characters by name"
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <PaginationWrapper>
        <Button
          variant="secondary"
          size="small"
          onClick={() => previousPage(previousPageUrl)}
          disabled={previousPageUrl ? false : true}
        >
          ⏪ Previous Page
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => nextPeoplePage(nextPageUrl)}
          disabled={nextPageUrl ? false : true}
        >
          Next Page⏩
        </Button>
      </PaginationWrapper>
      {isLoading && <LoaderWrapper size={20} />}
      <CharacterCardWrapper>
        {data?.map((people: Character) => {
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
