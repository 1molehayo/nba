import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import Hero from "../components/app/hero";
import { useAppContext } from "../contexts/appContext";
import styles from "../styles/app/pages/home.module.scss";
import { BlobImage } from "../components/global/blob-image";
import AboutImage from "../assets/images/home/about-image.png";

export default function Home() {
  const { isLargeTab } = useAppContext();

  return (
    <section className="home">
      <Head>
        <title>Home | NBA-Ikeja</title>
      </Head>

      <Hero />

      <section className={classnames(styles.about, "section section--lg")}>
        <div className="container">
          <div className="row justify-content-between">
            {!isLargeTab && (
              <div className="col-md-6">
                <div className={styles.about__image}>
                  <BlobImage image={AboutImage.src} />
                </div>
              </div>
            )}

            <div className="col-lg-5">
              <div className={styles.about__content}>
                <h2 className="mb-4">About Us</h2>
                <p className="color-black pb-5">
                  The NBA IKEJA Branch has been in existence for several decades
                  and still waxing stronger. In tandem with the provisions of
                  the law, the branch is led by an Executive Committee for which
                  Election hold every 2(two) years.
                </p>

                <Link href="/about-us" passHref>
                  <button className={"button button--primary"}>
                    Read more <span className="icon-right-arrow ml-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
