import React, { forwardRef } from 'react';
import RTimePicker from 'react-time-picker/dist/entry.nostyle';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TimePicker = forwardRef((props, ref) => {
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
        <RTimePicker
          inputRef={ref}
          value={props.value}
          onChange={props.onChange}
          className={classnames('form__input', props.className)}
          maxTime={props.maxTime}
          minTime={props.minTime}
          format={props.format}
          amPmAriaLabel="Select AM/PM"
          hourPlaceholder="hh"
          minutePlaceholder="mm"
          secondPlaceholder="ss"
          secondAriaLabel="Second"
          // required={props.isRequired}
        />

        {props.error && props.touched && (
          <p className="form__error">{props.error}</p>
        )}
      </div>
    </div>
  );
});

TimePicker.displayName = 'TimePicker';

TimePicker.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  format: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  maxTime: PropTypes.object,
  minTime: PropTypes.string,
  onChange: PropTypes.func,
  touched: PropTypes.bool,
  value: PropTypes.string,
  wrapperClass: PropTypes.string
};

TimePicker.defaultProps = {
  format: 'HH:mm'
};
