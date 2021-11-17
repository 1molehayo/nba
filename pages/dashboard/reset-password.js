import { useFormik } from 'formik';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { LOGIN_COMPLETED, LOGOUT_COMPLETED } from '../../utility/constants';
import { useDispatchCurrentUser } from '../../contexts/current-user';
import styles from '../../styles/dashboard/pages/reset-password.module.scss';
import Logo from '../../assets/images/logo.png';
import { FormField } from '../../components/global/formfield';
import { ResetPasswordSchema } from '../../utility/validations';
import isAuth from '../../services/is-auth';
import axios from '../../services/axios';
import handleApiError from '../../services/handle-api-error';
import { capitalizeFirstLetter, isObjectEmpty, notify } from '../../utility';
import { RESET_PASSWORD_FORM_MODEL } from '../../utility/models';

function ResetPassword({ code }) {
  const [error, setError] = useState();
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatchCurrentUser();

  const formik = useFormik({
    initialValues: { ...RESET_PASSWORD_FORM_MODEL, code },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setUpdating(true);

      try {
        await axios.post('/auth/reset-password', values);
        const { data } = await axios.get('/profiles/me');

        if (!data.active) {
          notify({
            type: 'error',
            message:
              'Your account has been deactivated, please reach out to the administrator'
          });

          dispatch({ type: LOGOUT_COMPLETED });
          return;
        }

        notify({
          type: 'success',
          message: 'Your password has been reset successfully'
        });

        setTimeout(() => {
          dispatch({ type: LOGIN_COMPLETED, user: data });
        }, 1200);
      } catch (err) {
        const errorObj = handleApiError(err);

        if (errorObj.statusCode === 400) {
          errorObj.message = 'There was a problem reseting your password!';
        }

        setError(errorObj);
      } finally {
        setUpdating(false);
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
                <div>
                  <Image
                    src={Logo}
                    alt="NBA Ikeja logo"
                    width={221}
                    height={55}
                  />
                </div>

                <h6 className="mt-5 text-none">Reset password</h6>
              </div>

              <FormField
                id="code"
                type="text"
                label="Verification Code"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                error={formik.errors.code}
                disabled
                touched={formik.touched.code}
              />

              <FormField
                id="password"
                type="password"
                label="New Password"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.errors.password}
                touched={formik.touched.password}
                isRequired
              />

              <FormField
                id="passwordConfirmation"
                type="password"
                label="Confirm Password"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                error={formik.errors.passwordConfirmation}
                touched={formik.touched.passwordConfirmation}
                isRequired
              />

              <button
                type="submit"
                disabled={updating}
                className="button button--primary mt-4"
              >
                {updating ? 'Loading...' : 'Update Password'}
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

ResetPassword.propTypes = {
  code: PropTypes.string
};

export default isAuth(ResetPassword);

export async function getServerSideProps({ query }) {
  const { code } = query;

  return {
    props: {
      code,
      hasNav: false,
      hasSidebar: false
    } // will be passed to the page component as props
  };
}
