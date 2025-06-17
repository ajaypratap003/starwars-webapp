import React from "react";
import styled from "styled-components";

type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 400px;
    font-size: 0.95em;
  }
`;

const Th = styled.th`
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0.75em 1em;
  text-align: left;
  position: sticky;
  top: 0;
`;

const Td = styled.td`
  padding: 0.75em 1em;
  border-bottom: 1px solid #eee;
  background: #fff;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f8f8f8;
  }
`;

export const Table = <T extends object>({
  columns,
  data,
}: TableProps<T>): React.ReactElement => {

  return (
    <TableContainer>
      <StyledTable>
        {data.length === 0 && (
          <caption style={{ textAlign: "center", padding: "1em" }}>
            No data available
          </caption>
        )}
        {data?.length > 0 && (
          <>
            <thead>
              <tr>
                {columns.map((col) => (
                  <Th key={col.header}>{col.header}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <Tr key={i}>
                  {columns.map((col) => (
                    <Td key={String(col.accessor)}>
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : String(row[col.accessor] ?? "")}
                    </Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </>
        )}
      </StyledTable>
    </TableContainer>
  );
};
