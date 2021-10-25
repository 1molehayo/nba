import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import RichTextEditor from '../rich-text-editor';
import axios from '../../../services/axios';
import styles from '../../../styles/app/pages/news.module.scss';
import {
  formatCharLength,
  getImagePath,
  isArrayEmpty,
  isObjectEmpty,
  notify,
  shimmer,
  toBase64
} from '../../../utility';
import { FormField } from '../../global';
import handleApiError from '../../../services/handle-api-error';
import { ARTICLE_FORM_MODEL } from '../../../utility/models';
import { ArticleSchema } from '../../../utility/validations';

const ArticleForm = ({ data, onDelete }) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(
    data ? getImagePath(data.image.url) : null
  );
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState();

  const initialData = {
    title: formatCharLength(data?.title, 70, true),
    description: formatCharLength(data?.description, 250, true)
  };

  const formik = useFormik({
    initialValues: data ? initialData : ARTICLE_FORM_MODEL,
    validationSchema: ArticleSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();
        if (file) {
          formData.append('files.image', file);
        }

        if (isObjectEmpty(editorState)) {
          throw new Error(`Article content can't be empty`);
        }

        const content = draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        );

        formData.append(
          'data',
          JSON.stringify({
            content,
            short_description: values.description,
            title: values.title
          })
        );

        if (data) {
          await axios.put(`/articles/${data.id}`, formData);

          notify({
            type: 'success',
            message: 'Article was updated successfully'
          });
        } else {
          await axios.post('/articles', formData);

          notify({
            type: 'success',
            message: 'Article was created successfully'
          });
        }

        formik.resetForm();
        setImage();
        setEditorState();
      } catch (err) {
        const errorObj = handleApiError(err);

        notify({
          type: 'error',
          message: errorObj.message
        });
      } finally {
        setLoading(false);
      }
    }
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    if (isArrayEmpty(event.target.files)) {
      return;
    }

    const url = URL.createObjectURL(event.target.files[0]);
    setImage(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <section className="news">
      <Head>
        <title>News | NBA-Ikeja</title>
      </Head>

      <div className="section container pt-0 pb-0">
        <div className="d-flex justify-content-between pb-5">
          <h4>News</h4>

          <Link href="/dashboard/news" passHref>
            <button className="button button--primary">Back to News</button>
          </Link>
        </div>

        <hr className="divider mb-8" />
      </div>

      <form onSubmit={onSubmit}>
        <div className="section container pb-0 pt-0">
          <div className="pb-8">
            <FormField
              type="textarea"
              id="title"
              className={styles.title}
              label="Title max(70 characters)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={formik.errors.title}
              touched={formik.touched.title}
              isRequired
            />
          </div>

          <p className="font-size-small color-black">Select image</p>
          <div className={styles.image}>
            {image && (
              <Image
                src={image}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt={formik.values.title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            )}

            <input type="file" onChange={handleFileChange} />

            <div className={styles.image__label}>Edit</div>
          </div>
        </div>

        <div className="section container pb-0">
          <FormField
            type="textarea"
            rows={6}
            id="description"
            className="font-size-regular"
            label="Short description max(250 characters)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={formik.errors.description}
            touched={formik.touched.description}
            maxLength={250}
            isRequired
          />
        </div>

        <div className="section container">
          <p className="font-size-small color-black">
            Full content <span className="color-red">*</span>
          </p>
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />

          <div className="mt-4">
            <button
              type="submit"
              className="button button--primary mr-4"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Save'}
            </button>

            {onDelete && (
              <button
                type="button"
                className="button button--red ml-0"
                disabled={loading}
                onClick={onDelete}
              >
                {loading ? 'Loading...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

ArticleForm.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
};

export default ArticleForm;
