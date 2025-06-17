import React from "react";
import styled from "styled-components";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#1976d2" : "white")};
  color: ${({ active }) => (active ? "white" : "#1976d2")};
  border: 1px solid #1976d2;
  border-radius: 4px;
  margin: 0 0.25rem;
  padding: 0.5rem 0.75rem;
  min-width: 2.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 0.4rem 0.5rem;
    font-size: 0.9rem;
    min-width: 2rem;
  }
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <PaginationContainer aria-label="Pagination Navigation">
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        &lt;
      </PageButton>
      <PageButton disabled={true} aria-label="Current Page">
        {currentPage}
      </PageButton>

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};
