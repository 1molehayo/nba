import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { formatCharLength, getFileName, notify } from '../../../utility';
import axios from '../../../services/axios';
import handleApiError from '../../../services/handle-api-error';
import { EVENT_FORM_MODEL } from '../../../utility/models';
import { EventSchema } from '../../../utility/validations';
import { FormField, DatePicker, TimePicker } from '../../global';
import { FileInput } from '../../global/file-input';
import moment from 'moment';

const EventForm = ({ data, onDelete }) => {
  const [image, setImage] = useState();
  const [date, setDate] = useState(
    data?.date ? moment(data?.date, 'YYYY-MM-DD').toDate() : null
  );
  const [dateError, setDateError] = useState();
  const [loading, setLoading] = useState(false);

  const initialData = {
    title: formatCharLength(data?.title, 70, true),
    description: formatCharLength(data?.description, 250, true),
    time: data?.time,
    venue: formatCharLength(data?.venue, 250, true)
  };

  const formik = useFormik({
    initialValues: data ? initialData : EVENT_FORM_MODEL,
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();

        if (image) {
          formData.append('files.image', image, getFileName(image));
        }

        const obj = {
          ...values,
          date: moment(date).format(),
          time: `${values.time}:00`
        };

        console.log(obj);

        formData.append('data', JSON.stringify(obj));

        if (data) {
          await axios.put(`/events/${data.id}`, formData);

          notify({
            type: 'success',
            message: 'Event was updated successfully'
          });
        } else {
          await axios.post('/events', formData);

          notify({
            type: 'success',
            message: 'Event was created successfully'
          });
        }

        formik.resetForm();
        setDate();
        setImage();
        setDateError();
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

  const onSubmit = (e) => {
    e.preventDefault();
    setDateError();
    formik.setFieldError('time', '');

    if (!date) {
      setDateError('Date is required');
      return;
    }

    if (!formik.values.time) {
      formik.setFieldError('time', 'Time is required');
      return;
    }
    formik.handleSubmit(e);
  };

  return (
    <section>
      <Head>
        <title>Event | NBA-Ikeja</title>
      </Head>

      <div className="section container pt-0 pb-0">
        <div className="d-flex justify-content-between pb-5">
          <h4>Event</h4>

          <Link href="/dashboard/events" passHref>
            <button className="button button--primary">Back to Events</button>
          </Link>
        </div>

        <hr className="divider mb-8" />
      </div>

      <div className="container pb-5">
        <form className="form form--inline mw-700" onSubmit={onSubmit}>
          <FormField
            id="title"
            label="Title max (70 characters)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.errors.title}
            touched={formik.touched.title}
            isRequired
          />

          <FormField
            id="description"
            type="textarea"
            rows={6}
            className="font-size-regular"
            label="Short description max (250 characters)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            error={formik.errors.description}
            touched={formik.touched.description}
            maxLength={250}
          />

          <FileInput
            id="image"
            label="Select Image"
            onChange={handleImageChange}
            fileName={data ? data.image.name : getFileName(image)}
          />

          <FormField
            id="venue"
            type="textarea"
            rows={6}
            label="Venue max (250 characters)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.venue}
            error={formik.errors.venue}
            touched={formik.touched.venue}
            isRequired
          />

          <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            error={dateError}
            isRequired
          />

          <TimePicker
            label="Time (24hr format)"
            value={formik.values.time}
            onChange={(e) => {
              formik.setFieldValue('time', e);
              formik.setFieldTouched('time', true);
            }}
            error={formik.errors.time}
            touched={formik.touched.time}
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

EventForm.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
};

export default EventForm;
