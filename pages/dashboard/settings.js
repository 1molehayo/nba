/* eslint-disable camelcase */
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useFormik } from 'formik';
import axios from '../../services/axios';
import styles from '../../styles/dashboard/pages/settings.module.scss';
import { FormField, Select } from '../../components/global';
import { SettingsSchema } from '../../utility/validations';
import {
  getImagePath,
  getObjPropWithValues,
  isArrayEmpty,
  notify,
  shimmer,
  toBase64
} from '../../utility';
import handleApiError from '../../services/handle-api-error';
import withAuth from '../../services/with-auth';
import {
  useCurrentUser,
  useDispatchCurrentUser
} from '../../contexts/current-user';
import { LOGIN_COMPLETED } from '../../utility/constants';
import { JOB_TITLES, JOB_TYPES } from '../../utility/constants/job';

function Settings() {
  const {
    address,
    bio,
    court_number,
    first_name,
    last_name,
    image,
    phone_number,
    social_media,
    job_type,
    job_title
  } = useCurrentUser();
  const dispatch = useDispatchCurrentUser();

  const [updating, setUpdating] = useState(false);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState(getImagePath(image?.url));

  const formik = useFormik({
    initialValues: {
      address: address || '',
      bio: bio || '',
      court_number: court_number || '',
      first_name: first_name || '',
      last_name: last_name || '',
      phone_number: phone_number || '',
      linkedin: social_media?.linkedin || '',
      twitter: social_media?.twitter || '',
      job_title: job_title || '',
      job_type: job_type || ''
    },
    validationSchema: SettingsSchema,
    onSubmit: async (values) => {
      setUpdating(true);

      try {
        const formData = new FormData();
        const obj = getObjPropWithValues(values);
        delete obj.twitter;
        delete obj.linkedin;

        if (values.twitter || values.linkedin) {
          obj.social_media = {
            twitter: values.twitter,
            linkedin: values.linkedin
          };
        }

        if (file) {
          formData.append('files.image', file);
        }
        formData.append('data', JSON.stringify(obj));

        const { data } = await axios.put('/profiles/me', formData);

        notify({
          type: 'success',
          message: 'Profile updated successfully'
        });

        dispatch({ type: LOGIN_COMPLETED, user: data });
      } catch (err) {
        const errorObj = handleApiError(err);

        notify({
          type: 'error',
          message: errorObj.message
        });
      } finally {
        setUpdating(false);
      }
    }
  });

  const handleFileChange = (event) => {
    if (!event) {
      setAvatar();
      setFile();
      return;
    }

    setFile(event.target.files[0]);

    if (isArrayEmpty(event.target.files)) {
      return;
    }

    const url = URL.createObjectURL(event.target.files[0]);
    setAvatar(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

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
              <form className="form form--inline" onSubmit={onSubmit}>
                <div className={styles.fullname}>
                  <div className={styles.fullname__label}>
                    <p>
                      Full name <span className="color-red">*</span>
                    </p>
                  </div>

                  <div className={styles.fullname__form}>
                    <FormField
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      display="inline"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                      error={formik.errors.first_name}
                      touched={formik.touched.first_name}
                    />

                    <div className="w20" />

                    <FormField
                      id="last_name"
                      type="text"
                      placeholder="Last Name"
                      display="inline"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                      error={formik.errors.last_name}
                      touched={formik.touched.last_name}
                    />
                  </div>
                </div>

                <FormField
                  id="phone_number"
                  type="text"
                  label="Phone number"
                  display="inline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                  error={formik.errors.phone_number}
                  touched={formik.touched.phone_number}
                  isRequired
                />

                <FormField
                  id="court_number"
                  type="text"
                  label="Supreme court number"
                  display="inline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.court_number}
                  error={formik.errors.court_number}
                  touched={formik.touched.court_number}
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

                <Select
                  id="jobType"
                  label="Job Type"
                  display="inline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.job_type}
                  error={formik.errors.job_type}
                  touched={formik.touched.job_type}
                  isRequired
                >
                  {JOB_TYPES.map((typeItem, i) => (
                    <option key={i} value={typeItem}>
                      {typeItem}
                    </option>
                  ))}
                </Select>

                <Select
                  id="jobTitle"
                  label="Job Title"
                  display="inline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.job_title}
                  error={formik.errors.job_title}
                  touched={formik.touched.job_title}
                  isRequired
                >
                  {JOB_TITLES.map((titleItem, i) => (
                    <option key={i} value={titleItem}>
                      {titleItem}
                    </option>
                  ))}
                </Select>

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
                  disabled={updating}
                  className="button button--primary mt-4"
                >
                  {updating ? 'Loading...' : 'Save'}
                </button>
              </form>
            </div>

            <div className={styles.image__wrapper}>
              <p className="color-black font-size-small">Profile Picture</p>

              <div className={styles.image}>
                {avatar && (
                  <Image
                    src={avatar}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    alt=""
                    objectFit="cover"
                    layout="fill"
                  />
                )}

                {avatar && (
                  <button
                    className="button button--red"
                    onClick={() => handleFileChange()}
                  >
                    Delete <span className="icon-delete" />
                  </button>
                )}

                {!avatar && (
                  <span className="font-size-xx-large icon-profile" />
                )}

                <input type="file" onChange={handleFileChange} id="file" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withAuth(Settings);
