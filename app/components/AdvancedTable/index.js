import { Flex, Text, Box, Select, chakra } from '@chakra-ui/react';
import React from 'react';
// import { useMediaQuery } from 'react-responsive'
import { usePagination, useSortBy, useTable } from 'react-table';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { PRI_BACKGROUND, TEXT_PURPLE } from 'constants/styles';
import styled from 'styled-components';
import {
  StyledTable,
  TableCell,
  TableHead,
  TableIconButton,
  TableRow,
} from './styles';

// Use declaration merging to extend types https://github.com/tannerlinsley/react-table/commit/7ab63858391ebb2ff621fa71411157df19d916ba
const CustomSelect = chakra(Select, {
  baseStyle: {
    // color: {PRI_BACKGROUND},
    bg: PRI_BACKGROUND,
    textAlign: 'center',
  },
});
const CustomOption = styled.option`
  color: black;
`;
const Table = ({
  columns,
  data,
  tableHeading,
  // pageSize,
  onRowClick,
  pageNumber,
  limit,
  isLast,
  total,
  setLimit,
  handlePageChange,
  // setPrevPage,
}) => {
  const tableColumns = React.useMemo(() => columns, [columns]);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    setPageSize,
    rows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data,
      pageIndex: pageNumber,
      pageSize: limit,
      canNextPage: !isLast,
      initialState: {
        pageIndex: pageNumber,
        pageSize: limit,
      },
    },
    useSortBy,
    usePagination,
  );
  function handleNextPage() {
    handlePageChange(pageIndex + 1);
  }
  function handlePrevPage() {
    handlePageChange(pageIndex - 1);
  }
  function handlePageSize(size) {
    setPageSize(size);
    setLimit(size);
  }
  return (
    <Box
      flexDirection="column"
      flex={1}
      maxWidth="100%"
      // width="100%"
      zIndex={1}
      position="relative"
    >
      {!!tableHeading && <Flex>{tableHeading}</Flex>}
      <StyledTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <Flex
              key={headerGroup.id}
              flex={1}
              flexDirection="row"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <TableCell
                  p={4}
                  key={column.id}
                  bg="gray.100"
                  {...column.getHeaderProps()}
                  justifyContent="space-between"
                  {...column.getSortByToggleProps()}
                >
                  <Text fontWeight="bold" color={TEXT_PURPLE}>
                    {column.render('Header')}
                  </Text>
                </TableCell>
              ))}
            </Flex>
          ))}
        </TableHead>
        <Flex flexDirection="column">
          {rows.map(
            (row, key) =>
              prepareRow(row) || (
                <TableRow
                  onClick={() => onRowClick && onRowClick(row)}
                  // eslint-disable-next-line react/no-array-index-key
                  key={key}
                  flexDirection="row"
                  {...row.getRowProps()}
                  data-testid="table-row"
                >
                  {row.cells.map(cell => (
                    <TableCell
                      key={cell.row.index}
                      justifyContent="flex-start"
                      p={4}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              ),
          )}
        </Flex>
      </StyledTable>
      <Flex justifyContent="space-between" flexDirection="row" mt={4}>
        <Flex flexDirection="row">
          <Text>Show rows per page</Text>
          <CustomSelect
            isSearchable
            placeholder={pageSize}
            onChange={val => handlePageSize(Number(val.target.value))}
          >
            {[5, 10, 20, 50].map(size => (
              // <option key={size} value={size}>
              //   Show {size}
              // </option>
              <CustomOption key={size} value={size}>
                Show {size}
              </CustomOption>
            ))}
          </CustomSelect>
        </Flex>
        <Flex justifyContent="center" alignItems="center" />
        <Flex flexDirection="row" alignItems="center">
          <Text mr={4}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {Math.ceil(total / limit)}
            </strong>{' '}
          </Text>
          <TableIconButton
            mr={-1}
            isDisabled={!canPreviousPage}
            onClick={() => handlePrevPage()}
            icon={<ChevronLeftIcon color="black" />}
          />
          <TableIconButton
            ml={-1}
            isDisabled={isLast}
            onClick={() => handleNextPage()}
            icon={<ChevronRightIcon color="black" />}
          />
          {/* <TableIconButton
            ml={2}
            onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon />}
          /> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Table;

Table.defaultProps = {
  pageSize: 10,
};

Table.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  tableHeading: PropTypes.any,
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func,
  pageNumber: PropTypes.number,
  limit: PropTypes.number,
  isLast: PropTypes.bool,
  total: PropTypes.number,
  setLimit: PropTypes.func,
  handlePageChange: PropTypes.func,
};
