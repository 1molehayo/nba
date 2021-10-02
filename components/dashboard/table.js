import React from 'react';
import styles from '../../styles/dashboard/components/table.module.scss';

export const Table = ({ headers, children }) => {
  return (
    <div className={styles.wrapper}>
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
