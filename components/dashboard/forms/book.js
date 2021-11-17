import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { formatCharLength, getFileName, notify } from '../../../utility';
import axios from '../../../services/axios';
import handleApiError from '../../../services/handle-api-error';
import { BOOK_FORM_MODEL } from '../../../utility/models';
import { TEXT_RESTRICTIONS } from '../../../utility/constants';
import { BookSchema } from '../../../utility/validations';
import { FormField } from '../../global';
import { FileInput } from '../../global/file-input';

const BookForm = ({ data, onDelete }) => {
  const [image, setImage] = useState();
  const [pdf, setPdf] = useState();
  const [pdfError, setPdfError] = useState();
  const [loading, setLoading] = useState(false);

  const initialData = {
    author: formatCharLength(data?.author, TEXT_RESTRICTIONS.medium_text, true),
    title: formatCharLength(data?.title, TEXT_RESTRICTIONS.medium_text, true),
    description: formatCharLength(
      data?.description,
      TEXT_RESTRICTIONS.long_text,
      true
    )
  };

  const formik = useFormik({
    initialValues: data ? initialData : BOOK_FORM_MODEL,
    validationSchema: BookSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();

        if (image) {
          formData.append('files.image', image, getFileName(image));
        }

        if (pdf) {
          formData.append('files.file', pdf, getFileName(pdf));
        }

        formData.append('data', JSON.stringify(values));

        if (data) {
          await axios.put(`/books/${data.id}`, formData);

          notify({
            type: 'success',
            message: 'Book was updated successfully'
          });
        } else {
          await axios.post('/books', formData);

          notify({
            type: 'success',
            message: 'Book was created successfully'
          });

          formik.resetForm();
          setPdf();
          setImage();
        }
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePdfChange = (event) => {
    setPdf(event.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPdfError();

    if (!(data && data.file.name) && !pdf) {
      setPdfError(`File can't be empty`);
      return;
    }
    formik.handleSubmit(e);
  };

  return (
    <section>
      <Head>
        <title>Library | NBA-Ikeja</title>
      </Head>

      <div className="section container pt-0 pb-0">
        <div className="header-title-block">
          <h4>Library</h4>

          <Link href="/dashboard/library" passHref>
            <button className="button button--primary">Back to Library</button>
          </Link>
        </div>

        <hr className="divider mb-8" />
      </div>

      <div className="container pb-5">
        <form className="form form--inline mw-700" onSubmit={onSubmit}>
          <FormField
            id="title"
            label={`Title max (${TEXT_RESTRICTIONS.medium_text} characters)`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.errors.title}
            touched={formik.touched.title}
            maxLength={TEXT_RESTRICTIONS.medium_text}
            isRequired
          />

          <FormField
            type="textarea"
            rows={6}
            id="description"
            className="font-size-regular"
            label={`Short description max (${TEXT_RESTRICTIONS.long_text} characters)`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={formik.errors.description}
            touched={formik.touched.description}
            maxLength={TEXT_RESTRICTIONS.long_text}
          />

          <FileInput
            id="pdf"
            label="Select Book (pdf)"
            onChange={handlePdfChange}
            fileName={data ? data?.file?.name : getFileName(pdf)}
            allowedFiles=".pdf"
            error={pdfError}
            isRequired
          />

          <FileInput
            id="image"
            label="Select Image"
            onChange={handleImageChange}
            fileName={data ? data?.image?.name : getFileName(image)}
          />

          <FormField
            id="author"
            label={`Author max (${TEXT_RESTRICTIONS.medium_text} characters)`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
            error={formik.errors.author}
            touched={formik.touched.author}
            maxLength={TEXT_RESTRICTIONS.medium_text}
            isRequired
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
        </form>
      </div>
    </section>
  );
};

BookForm.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
};

export default BookForm;
