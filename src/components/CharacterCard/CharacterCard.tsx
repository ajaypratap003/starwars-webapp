import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Planet } from "../../components/Planet/Planet";

export type CharacterCardProps = {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  homeworld: string;
  uid: string;
  enabledClick?: boolean;
  enabledAction?: boolean;
  deleteAction?: (uid: string)=> void;
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
  uid,
  enabledClick = true,
  enabledAction = false,
  deleteAction
}) => {
  const navigate = useNavigate();

  const handleNavigate = (uid: string) => {
    if (uid) {
      navigate(`character/${uid}`);
    }
  };

  return (
    <StyledCharacterCard onClick={() => enabledClick && handleNavigate(uid)}>
      {enabledAction && <ButtonWrapper datatest-id={`delete-button-${uid}`} onClick={(e) => { e.stopPropagation(); deleteAction && deleteAction(uid); }} />}
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

const RemoveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <circle cx="10" cy="10" r="10" fill="#e74c3c" />
    <line
      x1="6"
      y1="6"
      x2="14"
      y2="14"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="6"
      x2="6"
      y2="14"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ButtonWrapper = styled(RemoveIcon)`
  float: right;
  margin-top: 4px;
  margin-right: 10px;
`;

const StyledCharacterCard = styled.div`
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.41);
  width: 250px;
  min-width: 250px;
  text-wrap: wrap;
  text-align: center;
  border: 1px solid lightblue;
  text-shadow: 1px 1px 1px blue;
  display: inline-block;
`;
