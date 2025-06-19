import styled from "styled-components";
import { useState } from "react";

const NavBar = styled.nav`
  width: 100%;
  background: #222;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  color: #ffe81f;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

interface NavLinksProps {
  open: boolean;
}

const NavLinks = styled.ul<NavLinksProps>`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    background: #222;
    position: absolute;
    top: 60px;
    left: 0;
    display: ${(props) => (props.open ? "flex" : "none")};
  }
`;

const NavLink = styled.li`
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s;

    &:hover {
      color: #ffe81f;
    }
  }
`;

const Hamburger = styled.button<{ open: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  z-index: 2;

  span {
    display: block;
    width: 25px;
    height: 3px;
    background: #ffe81f;
    border-radius: 2px;
    transition: 0.3s;
  }

  @media (max-width: 600px) {
    display: flex;
  }
`;

type NavItem = {
  label: string;
  href: string;
};

type NavProps = {
  logo?: React.ReactNode;
  items: NavItem[];
};

export const Nav: React.FC<NavProps> = ({ logo = "StarWars", items }) => {
  const [open, setOpen] = useState(false);

  return (
    <NavBar>
      <Logo>{logo}</Logo>
      <Hamburger
        open={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </Hamburger>
      <NavLinks open={open}>
        {items.map((item) => (
          <NavLink key={item.href}>
            <a href={item.href}>{item.label}</a>
          </NavLink>
        ))}
      </NavLinks>
    </NavBar>
  );
};
