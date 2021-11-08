import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { usePagination, DOTS } from '../../services/use-pagination';

const Pagination = (props) => {
  const {
    className,
    currentPage,
    onPageChange,
    pageSize,
    siblingCount = 1,
    totalCount
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination', { [className]: className })}>
      <li
        className={classnames('pagination__item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>

      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination__item dots" key={i}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={classnames('pagination__item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classnames('pagination__item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  pageSize: PropTypes.number,
  siblingCount: PropTypes.number,
  totalCount: PropTypes.number
};

export default Pagination;
