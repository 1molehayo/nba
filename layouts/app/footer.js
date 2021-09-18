import styles from "../../styles/app/layouts/footer.module.scss";
import classnames from "classnames";

const AppFooter = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={classnames("footer", styles.footer)}>
      <div className="container footer__container">
        <p className="footer__text copyright">
          © {getYear()} NBA Ikeja - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
