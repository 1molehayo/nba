import { useFormik } from 'formik';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/dashboard/pages/reset-password.module.scss';
import Logo from '../../assets/images/logo.png';
import { FormField } from '../../components/global/formfield';
import { ForgotPasswordSchema } from '../../utility/validations';
import isAuth from '../../services/is-auth';
import axios from '../../services/axios';
import { capitalizeFirstLetter, isObjectEmpty, notify } from '../../utility';
import handleApiError from '../../services/handle-api-error';

function ForgotPassword() {
  const [error, setError] = useState();
  const [reseting, setReseting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('/auth/forgot-password', values);
        notify({
          type: 'success',
          message: 'A link has been sent to your email!'
        });

        router.push('/dashboard/login');
      } catch (err) {
        const errorObj = handleApiError(err);

        if (errorObj.statusCode === 400) {
          errorObj.message = 'There was a problem reseting your password!';
        }

        setReseting(false);
        setError(errorObj);
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Reset Password | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className={styles.container}>
          <div className={styles.form}>
            <form className="form form--inline" onSubmit={handleSubmit}>
              {!isObjectEmpty(error) && (
                <p className="font-size-small color-red">
                  {capitalizeFirstLetter(error.message)}
                </p>
              )}

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
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
              />

              <button
                type="submit"
                disabled={reseting}
                className="button button--primary mt-4"
              >
                {reseting ? 'Loading...' : 'Reset Password'}
              </button>

              <div className="pt-4 extra-info">
                <p className="font-size-small">
                  Already have an account?{' '}
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

export default isAuth(ForgotPassword);

export async function getStaticProps() {
  return {
    props: {
      hasNav: false,
      hasSidebar: false
    } // will be passed to the page component as props
  };
}
