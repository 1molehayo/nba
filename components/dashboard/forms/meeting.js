import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';
import {
  capitalizeFirstLetter,
  convertToTime,
  formatCharLength,
  isArrayEmpty,
  notify
} from '../../../utility';
import axios from '../../../services/axios';
import RichTextEditor from '../rich-text-editor';
import handleApiError from '../../../services/handle-api-error';
import { MEETING_FORM_MODEL } from '../../../utility/models';
import { MeetingSchema } from '../../../utility/validations';
import { DatePicker, FormField, Select, TimePicker } from '../../global';
import { useCurrentPlatform } from '../../../contexts/platform-context';
import { TEXT_RESTRICTIONS } from '../../../utility/constants';

const MeetingForm = ({ data, onDelete }) => {
  const { platforms } = useCurrentPlatform();

  const [date, setDate] = useState(
    data?.date ? moment(data?.date, 'YYYY-MM-DD').toDate() : null
  );
  const [dateError, setDateError] = useState();
  const [editorState, setEditorState] = useState();
  const [loading, setLoading] = useState(false);

  const initialData = {
    title: formatCharLength(data?.title, TEXT_RESTRICTIONS.medium_text, true),
    description: formatCharLength(
      data?.description,
      TEXT_RESTRICTIONS.long_text,
      true
    ),
    time: convertToTime(data?.time),
    platform: `${data?.platform}`,
    url: data?.url
  };

  const formik = useFormik({
    initialValues: data ? initialData : MEETING_FORM_MODEL,
    validationSchema: MeetingSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const formData = new FormData();

        const content = draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        );

        const obj = {
          ...values,
          extra_info: content,
          date: moment(date).format(),
          time: `${values.time}:00`
        };

        formData.append('data', JSON.stringify(obj));

        if (data) {
          await axios.put(`/meetings/${data.id}`, formData);

          notify({
            type: 'success',
            message: 'Meeting was updated successfully'
          });
        } else {
          await axios.post('/meetings', formData);

          notify({
            type: 'success',
            message: 'Meeting was created successfully'
          });

          formik.resetForm();
          setEditorState();
          setDate();
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
        <title>Meetings | NBA-Ikeja</title>
      </Head>

      <div className="section container pt-0 pb-0">
        <div className="header-title-block">
          <h4>Meetings</h4>

          <Link href="/dashboard/meetings" passHref>
            <button className="button button--primary">Back to Meetings</button>
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

          <Select
            id="platform"
            label="Platform"
            display="inline"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.platform}
            error={formik.errors.platform}
            touched={formik.touched.platform}
            isRequired
          >
            {!isArrayEmpty(platforms) &&
              platforms.map((pItem, i) => (
                <option key={i} value={`${pItem.id}`}>
                  {capitalizeFirstLetter(pItem.name)}
                </option>
              ))}
          </Select>

          <FormField
            id="url"
            label="Meeting URL"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.url}
            error={formik.errors.url}
            touched={formik.touched.url}
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

          <div className="form__group align-items-start">
            <label className="font-size-small color-black pt-2">
              Extra Information
            </label>

            <div className="form__input__wrapper">
              <RichTextEditor
                editorState={editorState}
                setEditorState={setEditorState}
                content={data?.extra_info ? data?.extra_info : null}
              />
            </div>
          </div>

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

MeetingForm.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
  platforms: PropTypes.array
};

export default MeetingForm;
