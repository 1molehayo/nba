import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import styles from '../../styles/dashboard/pages/register.module.scss';
import Logo from '../../assets/images/logo.png';
import { FormField } from '../../components/global/formfield';
import { RegisterSchema } from '../../utility/validations';
import isAuth from '../../services/is-auth';
import { useDispatchCurrentUser } from '../../contexts/current-user';
import axios from '../../services/axios';
import { LOGIN_COMPLETED, LOGOUT_COMPLETED } from '../../utility/constants';
import handleApiError from '../../services/handle-api-error';
import { getFileName, notify } from '../../utility';
import { REGISTER_FORM_MODEL } from '../../utility/models';
import { FileInput } from '../../components/global/file-input';

function Register() {
  const [registering, setRegistering] = useState(false);
  const [file, setFile] = useState();
  const dispatch = useDispatchCurrentUser();

  const formik = useFormik({
    initialValues: REGISTER_FORM_MODEL,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setRegistering(true);

      const userData = {
        username: values.firstName,
        email: values.email,
        password: values.password
      };

      const profileData = {
        address: values.address,
        bio: values.bio,
        court_number: values.courtNumber,
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        social_media: {
          linkedin: values.linkedin,
          twitter: values.twitter
        },
        active: false
      };

      try {
        await axios.post('/auth/local/register', userData);

        const formData = new FormData();
        formData.append('data', JSON.stringify(profileData));
        formData.append('files.image', file);

        await axios.post('/profiles/me', formData);

        notify({
          type: 'success',
          message: 'Registration successful'
        });

        const { data } = await axios.get('/profiles/me');

        setTimeout(() => {
          dispatch({ type: LOGIN_COMPLETED, user: data });
        }, 1200);
      } catch (err) {
        const errorObj = handleApiError(err);

        notify({
          type: 'error',
          message: errorObj.message
        });

        await axios.post('/logout');
        dispatch({ type: LOGOUT_COMPLETED });
      } finally {
        setRegistering(false);
      }
    }
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Register | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className={styles.container}>
          <div className={styles.form}>
            <form className="form form--inline" onSubmit={handleRegister}>
              <div className="form__logo">
                <Image
                  src={Logo}
                  alt="NBA Ikeja logo"
                  width={221}
                  height={55}
                />
              </div>

              <div className={styles.fullname}>
                <div className={styles.fullname__label}>
                  <p>
                    Full name <span className="color-red">*</span>
                  </p>
                </div>

                <div className={styles.fullname__form}>
                  <FormField
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    display="inline"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                  />

                  <div className="w20" />

                  <FormField
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    display="inline"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={formik.errors.lastName}
                    touched={formik.touched.lastName}
                  />
                </div>
              </div>

              <FormField
                id="email"
                type="email"
                label="Email address"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
                isRequired
              />

              <FormField
                id="phoneNumber"
                type="text"
                label="Phone number"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                error={formik.errors.phone_number}
                touched={formik.touched.phoneNumber}
                isRequired
              />

              <FormField
                id="address"
                type="textarea"
                label="Address"
                rows={10}
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.errors.address}
                touched={formik.touched.address}
              />

              <FormField
                id="courtNumber"
                type="text"
                label="Supreme court number"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.courtNumber}
                error={formik.errors.courtNumber}
                touched={formik.touched.courtNumber}
                isRequired
              />

              <FormField
                id="bio"
                type="textarea"
                label="Bio"
                rows={10}
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                error={formik.errors.bio}
                touched={formik.touched.bio}
              />

              <FormField
                id="password"
                type="password"
                label="Password"
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

              <FileInput
                id="image"
                label="Profile Picture"
                onChange={handleFileChange}
                fileName={getFileName(file)}
              />

              <FormField
                id="linkedin"
                type="text"
                label="Linkedin Profile"
                placeholder="e.g https://linkedin.com/in/john-doe"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.linkedin}
                error={formik.errors.linkedin}
                touched={formik.touched.linkedin}
              />

              <FormField
                id="twitter"
                type="text"
                label="Twitter Profile"
                placeholder="e.g https://twitter.com/john-doe"
                display="inline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twitter}
                error={formik.errors.twitter}
                touched={formik.touched.twitter}
              />

              <button
                type="submit"
                disabled={registering}
                className="button button--primary mt-4"
              >
                {registering ? 'Loading...' : 'Register'}
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

export default isAuth(Register);

export async function getStaticProps() {
  return {
    props: {
      hasNav: false,
      hasSidebar: false
    } // will be passed to the page component as props
  };
}
