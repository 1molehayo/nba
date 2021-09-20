import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import styles from "../../styles/dashboard/pages/register.module.scss";
import Logo from "../../assets/images/logo.png";
import { FormField } from "../../components/global/formfield";

export default function Register() {
  const handleRegister = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      bio: "",
      courtNumber: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
      handleRegister(values);
    },
  });

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Login | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className={styles.container}>
          <div className="form__logo">
            <Image src={Logo} alt="NBA Ikeja logo" width={221} height={55} />
          </div>

          <div className={styles.form}>
            <form className="form form--inline" onSubmit={formik.handleSubmit}>
              <FormField
                type="email"
                label="Email address"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />

              <FormField
                type="tel"
                label="Phone number"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
              />

              <FormField
                type="textarea"
                label="Address"
                rows={10}
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.errors.address}
              />

              <FormField
                type="text"
                label="Supreme court number"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.courtNumber}
                error={formik.errors.courtNumber}
              />

              <FormField
                type="textarea"
                label="Bio"
                rows={10}
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.bio}
                error={formik.errors.bio}
              />

              <FormField
                type="password"
                label="Password"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />

              <button type="submit" className="button button--primary mt-4">
                Register
              </button>

              <div className="pt-4 extra-info">
                <p className="font-size-small">
                  Already have an account?{" "}
                  <Link href="/dashboard/login">
                    <a className="form__link">Login</a>
                  </Link>
                </p>
                <p className="font-size-small mb-0">
                  <span className="icon-left-arrow mr-2" />
                  <Link href="/dashboard/reset-password">
                    <a className="form__link">Back to the website</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {
      hasNav: false,
      hasSidebar: false,
    }, // will be passed to the page component as props
  };
}
