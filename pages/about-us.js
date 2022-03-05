import classnames from 'classnames';
import Head from 'next/head';
import { Banner } from '../components/app';
import { AboutCard } from '../components/app/about-card';
import { PEOPLE_DATA } from '../utility/constants';
import styles from '../styles/app/pages/about.module.scss';

export default function AboutUs() {
  return (
    <section className="about-us">
      <Head>
        <title>About | NBA-Ikeja</title>
      </Head>

      <Banner title="About Us" />

      <div className="section section--lg">
        <div className="container">
          <div className="pb-5">
            <p>
              The NBA IKEJA Branch has been in existence for several decades and
              still waxing strong.
            </p>

            <p>
              In tandem with the provisions of the law, the branch is led by an
              Executive Committee for which Election hold every 2(two) years.
            </p>

            <p>
              The NBA Ikeja Branch of the Nigerian Bar Association is
              undoubtedly the most vibrant, known and respected of all. As the
              people&apos;s Bar, it is the primus inter pares of the Bar.
            </p>

            <p>
              NBA, Ikeja Branch being the conscience of the Bar and the
              people&apos;s Bar, has for several decades upheld the principle of
              Rule of Law. It is the branch that leads in the fight for the
              masses.
            </p>

            <p>
              The Branch exemplifies what the first Nigerian Lawyer, Christopher
              Sapara Williams said, &quot;A Lawyer leads for the advancement of
              his society&quot;
            </p>
          </div>

          <div className="pb-5">
            <h5>PROGRAMMES &amp; EVENTS.</h5>
          </div>

          <div className="pb-5">
            <p>
              <strong>FAWHINMIISM</strong>{' '}
            </p>
            <p>
              In the year 2005, during the lifetime of the foremost Human Rights
              Activist, Chief Gani Fawehinmi, S.A.N, the NBA IKEJA under the
              Chairmanship of Dr. Adekunle Akanbi OJO, SAN birthed an Annual
              Lecture titled FAWEHINMIISM, in his honour. The Annual Lecture,
              FAWEHINMIISM still hold yearly even after the passing of Chief
              Gani Fawehinmi, S.A.N.
            </p>
          </div>

          <div className="pb-5">
            <p>
              <strong>ANNUAL LAW WEEK</strong>
            </p>
            <p>
              As it is the traditional within the Bar both local and
              international, on a yearly basis, the Branch holds a week-long
              event tagged &quot;LAW WEEK&quot;. The Law Week affords the
              opportunity to have interactive sessions with members and the
              general public. The Branch particularly use this medium to render
              support to the less privileged citizens of Nigera through free
              legal advice and representation. The law week is usually concluded
              with a Law Dinner.
            </p>
          </div>

          <div className="pb-5">
            <p>
              <strong>THE HUMAN RIGHTS COMMITTEE</strong>
            </p>
            <p>
              In consonance with our laws, the Human Right Committee is usually
              led by the Vice Chairman of the Branch. The essence of the
              Committee is to assist indigent members of the society who require
              legal advice and representation. This is a very important aspect
              of the Branch&apos;s activities that is very dear to the heart of
              the branch and the Bar in general.
            </p>
          </div>

          <div className="pb-5">
            <p>
              <strong>PUBLIC INTEREST MATTERS AND LITIGATION</strong>
            </p>
            <p>
              The branch has, as its core principle, the fight for the masses
              for which reason it takes up without fear or favour, issues
              resulting from Government policies affecting the general populace.
              Through this medium, the Branch serves as the watch dog in the
              protection of public interest generally. This is achieved through
              engagcement with Government Agencies and resort to litigation in
              deserving cases.
            </p>
          </div>
        </div>
      </div>

      <div className={classnames('section section--lg', styles.section__green)}>
        <div className="container">
          <h2 className="pb-5 text-center">The People</h2>

          <div className="row pt-4">
            {PEOPLE_DATA.map((item, i) => (
              <div key={i} className="col-md-4 mb-4">
                <AboutCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
