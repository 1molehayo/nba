import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FormField = forwardRef((props, ref) => {
  const formProps = { ...props };
  delete formProps.isRequired;
  delete formProps.label;
  delete formProps.wrapperClass;
  delete formProps.error;
  delete formProps.touched;

  return (
    <div
      className={classnames('form__group', props.wrapperClass, {
        'form__group--error': props.touched && props.error
      })}
    >
      {props.label && (
        <label>
          {props.label}{' '}
          {props.isRequired && <span className="color-red">*</span>}
        </label>
      )}

      <div className="form__input__wrapper">
        {props.type === 'textarea' ? (
          <textarea
            {...formProps}
            id={props.id}
            name={props.id}
            ref={ref}
            className={classnames('form__textarea', props.className)}
          />
        ) : (
          <input
            {...formProps}
            ref={ref}
            id={props.id}
            name={props.id}
            className={classnames('form__input', props.className)}
          />
        )}

        {props.touched && props.error && (
          <p className="form__error">{props.error}</p>
        )}
      </div>
    </div>
  );
});

FormField.displayName = 'FormField';

FormField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
  wrapperClass: PropTypes.string
};
