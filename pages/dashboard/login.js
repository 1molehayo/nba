import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import { FormField } from '../../components/global/formfield';
import { notify } from '../../utility';
import { LoginSchema } from '../../utility/validations';
import { useDispatchCurrentUser } from '../../contexts/current-user';
import styles from '../../styles/dashboard/pages/login.module.scss';
import BgImage from '../../assets/images/login-bg.png';
import Logo from '../../assets/images/logo.png';
import { LOGIN_COMPLETED } from '../../utility/constants';
import isAuth from '../../services/is-auth';
import { LOGIN_FORM_MODEL } from '../../utility/models';

function Login() {
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatchCurrentUser();

  const formik = useFormik({
    initialValues: LOGIN_FORM_MODEL,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoggingIn(true);

      const userData = {
        identifier: values.email,
        password: values.password
      };

      try {
        await axios.post('/auth/local', userData);
        const { data } = await axios.get('/profiles/me');

        notify({
          type: 'success',
          message: 'Logged in successfully'
        });

        setTimeout(() => {
          dispatch({ type: LOGIN_COMPLETED, user: data });
        }, 1200);
      } catch (err) {
        const errorObj = handleApiError(err);

        if (errorObj.statusCode === 400) {
          errorObj.message = 'wrong email address and password combination!';
        }

        notify({
          type: 'error',
          message: errorObj.message
        });
      } finally {
        setLoggingIn(false);
      }
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Login | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className={styles.container}>
          <div className="form__logo">
            <Image
              src={Logo}
              alt="NBA Ikeja logo"
              width={221}
              height={55}
              placeholder="blur"
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.image}>
              <Image
                src={BgImage}
                alt="login background"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className={styles.image__border}
              />
            </div>

            <div className={styles.form}>
              <form className="form" onSubmit={handleLogin}>
                <FormField
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="bg-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                />

                <FormField
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="bg-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                />

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="button button--primary mt-4"
                >
                  {loggingIn ? 'Loading...' : 'Login'}{' '}
                  <span className="icon-login ml-5" />
                </button>
              </form>

              <div className="pt-4">
                <p className="font-size-small">
                  Don&apos;t have an account?{' '}
                  <Link href="/dashboard/register">
                    <a className="form__link">Sign up</a>
                  </Link>
                </p>
                <p className="font-size-small">
                  Forgot Password?{' '}
                  <Link href="/dashboard/reset-password">
                    <a className="form__link">Click here</a>
                  </Link>
                </p>
                <p className="font-size-small mb-0">
                  <span className="icon-left-arrow mr-2" />
                  <Link href="/">
                    <a className="form__link">Back to the website</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default isAuth(Login);

export async function getStaticProps() {
  return {
    props: {
      hasNav: false,
      hasSidebar: false
    } // will be passed to the page component as props
  };
}
