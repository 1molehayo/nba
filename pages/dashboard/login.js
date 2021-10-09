import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import styles from '../../styles/dashboard/pages/login.module.scss';
import BgImage from '../../assets/images/login-bg.png';
import Logo from '../../assets/images/logo.png';
import { FormField } from '../../components/global/formfield';
import axios from '../../services/axios';
import handleApiError from '../../services/handleApiError';
import { useAppContext } from '../../contexts/appContext';
import { isObjectEmpty } from '../../utility';
import { LoginSchema } from '../../utility/validations';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const userData = {
        identifier: values.email,
        password: values.values
      };

      const config = {
        headers: {
          Accept: 'application/json'
        }
      };

      try {
        await axios.post('/auth/local', userData, config);
        const { data } = await axios.get('/profiles/me');
        setUser(data);
        router.push('/dashboard');
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
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
                {!isObjectEmpty(error) && (
                  <p className="color-red">{error.message}</p>
                )}

                <FormField
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="bg-white"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
                />

                <FormField
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="bg-white"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="button button--primary mt-4"
                >
                  {loading ? 'Loading...' : 'Login'}{' '}
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

export async function getStaticProps() {
  return {
    props: {
      hasNav: false,
      hasSidebar: false
    } // will be passed to the page component as props
  };
}
