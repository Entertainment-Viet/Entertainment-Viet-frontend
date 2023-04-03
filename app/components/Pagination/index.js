import React from 'react';
import PropTypes from 'prop-types';
import { usePagination, DOTS } from './actions';
import { Container, Item, Arrow } from './styles';

const Pagination = props => {
  const { total, page, limit, onPageChange, siblingCount = 1, last } = props;

  const paginationRange = usePagination({
    page,
    total,
    siblingCount,
    limit,
    last,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange) {
    return null;
  }

  // if (page === 0 || paginationRange.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Container style={{ marginTop: '20px' }}>
      <Item
        key="pagination-item-arrow-left"
        className={page === 1 ? 'disabled' : ''}
        onClick={onPrevious}
      >
        <Arrow className="arrow left" />
      </Item>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Item key={`pagination-item-dots-${index}`} className="dots">
              &#8230;
            </Item>
          );
        }
        return (
          <Item
            key={`pagination-item-${pageNumber}`}
            className={pageNumber === page ? 'selected' : ''}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Item>
        );
      })}
      <Item
        key="pagination-item-arrow-right"
        className={page === lastPage ? 'disabled' : ''}
        onClick={onNext}
      >
        <Arrow className="arrow right" />
      </Item>
    </Container>
  );
};
Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  limit: PropTypes.number,
  onPageChange: PropTypes.func,
  siblingCount: PropTypes.number,
  last: PropTypes.bool,
};

export default Pagination;
