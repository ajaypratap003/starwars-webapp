import styled from "styled-components";
import { Loader } from "../Loader/Loader";
import { useSwapiAll } from "../../hooks/useSwapi";

type Starship = {
  name: string;
};

type StarshipsProps = {
 urls: string[];
};

export const Starships: React.FC<StarshipsProps> = ({ urls }) => {
  const { data, isLoading } = useSwapiAll(urls);

  return (
    <div>
      <h4>Starships</h4>
      {(() => {
        switch (true) {
          case isLoading:
            return <Loader size={20} />;
          case !isLoading && data?.length > 0:
            return (
              <StyledUl>
                {data?.map(({ name }: Starship, index: number) => (
                  <li key={index}>{name}</li>
                ))}
              </StyledUl>
            );
          case !isLoading && data?.length === 0:
            return <p className="p-4">No starships available</p>;
          default:
            return <></>;
        }
      })()}
    </div>
  );
};

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;
