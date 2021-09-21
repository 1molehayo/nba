import styles from "../../styles/app/layouts/footer.module.scss";
import classnames from "classnames";

const AppFooter = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className={classnames("footer", styles.wrapper)}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4>Contact</h4>

            <div className={styles.contact__row}>
              <span className={styles.contact__icon}>
                <span className="icon-map" />
              </span>

              <span className={styles.contact__text}>
                Ikeja, Lagos, Nigeria
              </span>
            </div>

            <div className={styles.contact__row}>
              <span className={styles.contact__icon}>
                <span className="icon-phone" />
              </span>

              <a href="tel:+2349053419334" className={styles.contact__text}>
                +2349053419334
              </a>
            </div>

            <div className={styles.contact__row}>
              <span className={styles.contact__icon}>
                <span className="icon-email" />
              </span>

              <a
                href="mailto:info@nbaikeja.org"
                className={styles.contact__text}
              >
                info@nbaikeja.org
              </a>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <h4>Other Information</h4>

            <div className={styles.contact__row}>
              <a href="tel:+2349053419334" className={styles.contact__text}>
                Terms &amp; Conditions
              </a>
            </div>

            <div className={styles.contact__row}>
              <a href="tel:+2349053419334" className={styles.contact__text}>
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className={styles.social__wrapper}>
              <div>
                <h4>Social Media</h4>

                <div>
                  <a
                    href="https://linkedin.com"
                    className={styles.social__link}
                  >
                    <span className="icon-linkedin-circle" />
                  </a>

                  <a
                    href="https://twitter.com/NigBarAssoc"
                    className={styles.social__link}
                  >
                    <span className="icon-twitter-circle" />
                  </a>

                  <a
                    href="https://www.instagram.com/nigerianbar/"
                    className={styles.social__link}
                  >
                    <span className="icon-instagram-circle" />
                  </a>

                  <a
                    href="https://www.facebook.com/NigerianBarAssociationHQ/"
                    className={styles.social__link}
                  >
                    <span className="icon-facebook-circle" />
                  </a>
                </div>

                <p className={styles.copyright}>
                  © {getYear()} NBA Ikeja - All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
