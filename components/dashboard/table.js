import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../styles/dashboard/components/table.module.scss';

export const Table = ({ headers, children, className }) => {
  return (
    <div className={classnames(styles.wrapper, className)}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, j) => (
              <th key={j}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  headers: PropTypes.array
};
