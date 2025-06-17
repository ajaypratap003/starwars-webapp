import React from "react";
import styled from "styled-components";
import { Loader } from "../Loader/Loader";
import { useSwapiAll } from "../../hooks/useSwapi";

type Film = {
  title: string;
};

type FilmsProps = {
  filmUrls: string[];
};

export const Films: React.FC<FilmsProps> = ({ filmUrls }) => {
  const { data, isLoading } = useSwapiAll(filmUrls);

  return (
    <div>
      <h4>Films</h4>
      {(() => {
        switch (true) {
          case isLoading:
            return <Loader size={20} />;
          case !isLoading && data && data.length > 0:
            return (
              <div>
                <StyledUl>
                  {data?.map(({ title }: Film, index: number) => (
                    <li key={index}>{title}</li>
                  ))}
                </StyledUl>
              </div>
            );
          case !isLoading && (!data || data.length === 0):
            return <p className="p-4">No films available</p>;
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
