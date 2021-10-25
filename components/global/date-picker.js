import React, { forwardRef } from 'react';
import RDatePicker from 'react-date-picker/dist/entry.nostyle';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const DatePicker = forwardRef((props, ref) => {
  return (
    <div
      className={classnames('form__group', props.wrapperClass, {
        'form__group--error': props.error
      })}
    >
      {props.label && (
        <label>
          {props.label}{' '}
          {props.isRequired && <span className="color-red">*</span>}
        </label>
      )}

      <div className="form__input__wrapper">
        <RDatePicker
          inputRef={ref}
          value={props.value}
          onChange={props.onChange}
          className={classnames('form__input', props.className)}
          maxDate={props.maxDate}
          minDate={props.minDate}
          format={props.format}
          dayPlaceholder="DD"
          monthPlaceholder="MM"
          yearPlaceholder="YYYY"
          // required={props.isRequired}
        />
        {props.error && <p className="form__error">{props.error}</p>}
      </div>
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  format: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.object,
  wrapperClass: PropTypes.string
};

DatePicker.defaultProps = {
  minDate: new Date(),
  format: 'dd/MM/y'
};
