import styles from '../../styles/dashboard/layouts/footer.module.scss';
import classnames from 'classnames';

const DashboardFooter = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={classnames('footer', styles.wrapper)}>
      <p className={styles.copyright}>
        © {getYear()} NBA Ikeja - All rights reserved.
      </p>
    </footer>
  );
};

export default DashboardFooter;
