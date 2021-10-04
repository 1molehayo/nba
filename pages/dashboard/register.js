import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import styles from '../../styles/dashboard/pages/register.module.scss';
import Logo from '../../assets/images/logo.png';
import { FormField } from '../../components/global/formfield';
import { RegisterSchema } from '../../utility/validations';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  const handleRegister = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    router.push('/dashboard');
  };

  const formik = useFormik({
    initialValues: {
      address: '',
      bio: '',
      courtNumber: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      // alert(JSON.stringify(values, null, 2));
      handleRegister(values);
    }
  });

  return (
    <section className={styles.wrapper}>
      <Head>
        <title>Register | NBA-Ikeja</title>
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
                    value={formik.values.firstName}
                    error={formik.errors.firstName}
                  />

                  <div className={styles.w20} />

                  <FormField
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    display="inline"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    error={formik.errors.lastName}
                  />
                </div>
              </div>

              <FormField
                id="email"
                type="email"
                label="Email address"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                isRequired
              />

              <FormField
                id="phoneNumber"
                type="text"
                label="Phone number"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                isRequired
              />

              <FormField
                id="address"
                type="textarea"
                label="Address"
                rows={10}
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.errors.address}
              />

              <FormField
                id="courtNumber"
                type="text"
                label="Supreme court number"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.courtNumber}
                error={formik.errors.courtNumber}
                isRequired
              />

              <FormField
                id="bio"
                type="textarea"
                label="Bio"
                rows={10}
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.bio}
                error={formik.errors.bio}
              />

              <FormField
                id="password"
                type="password"
                label="Password"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
                isRequired
              />

              <FormField
                id="passwordConfirm"
                type="password"
                label="Confirm Password"
                display="inline"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                error={formik.errors.passwordConfirm}
                isRequired
              />

              <button type="submit" className="button button--primary mt-4">
                Register
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

export async function getStaticProps() {
  return {
    props: {
      hasNav: false,
      hasSidebar: false
    } // will be passed to the page component as props
  };
}
