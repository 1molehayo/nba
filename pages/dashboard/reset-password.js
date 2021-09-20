import { useFormik } from "formik";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/dashboard/pages/reset-password.module.scss";
import Logo from "../../assets/images/logo.png";
import { FormField } from "../../components/global/formfield";

export default function ResetPassword() {
  const handleRegister = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
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
        <title>Reset Password | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className={styles.container}>
          <div className={styles.form}>
            <form className="form form--inline" onSubmit={formik.handleSubmit}>
              <div className="form__logo">
                <Image
                  src={Logo}
                  alt="NBA Ikeja logo"
                  width={221}
                  height={55}
                />
              </div>

              <FormField
                id="email"
                type="email"
                label="Email"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />

              <button type="submit" className="button button--primary mt-4">
                Reset Password
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
                  <Link href="/">
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
