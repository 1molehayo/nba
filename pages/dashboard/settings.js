import React from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import styles from '../../styles/dashboard/pages/settings.module.scss';
import { FormField } from '../../components/global';
import { SettingsSchema } from '../../utility/validations';

export default function Settings() {
  const handleSubmit = async (values) => {};

  const formik = useFormik({
    initialValues: {
      address: '',
      bio: '',
      courtNumber: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    },
    validationSchema: SettingsSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      // alert(JSON.stringify(values, null, 2));
      handleSubmit(values);
    }
  });

  return (
    <section className="section pt-0">
      <Head>
        <title>Settings | NBA-Ikeja</title>
      </Head>

      <div className="container">
        <div className="section pt-0">
          <h4 className="pb-5">Settings</h4>

          <div className={styles.wrapper}>
            <div className={styles.form}>
              <form
                className="form form--inline"
                onSubmit={formik.handleSubmit}
              >
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

                    <div className="w20" />

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
                  id="bio"
                  type="textarea"
                  label="Bio"
                  rows={10}
                  display="inline"
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                  error={formik.errors.bio}
                />

                <button type="submit" className="button button--primary mt-4">
                  Save
                </button>
              </form>
            </div>

            <div className={styles.image__wrapper}>
              <p>Edit Image</p>

              <div className={styles.image}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
