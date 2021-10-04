import styles from '../../styles/dashboard/layouts/footer.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DashboardFooter = ({ isFixed }) => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer
      className={classnames('footer', styles.wrapper, {
        [styles.wrapper__fixed]: isFixed
      })}
    >
      <p className={styles.copyright}>
        © {getYear()} NBA Ikeja - All rights reserved.
      </p>
    </footer>
  );
};

DashboardFooter.propTypes = {
  isFixed: PropTypes.bool
};

export default DashboardFooter;
