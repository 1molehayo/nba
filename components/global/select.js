import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Select = forwardRef((props, ref) => {
  const formProps = { ...props };
  delete formProps.isRequired;
  delete formProps.label;
  delete formProps.wrapperClass;
  delete formProps.error;
  delete formProps.touched;
  delete formProps.children;

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
        <select
          ref={ref}
          id={props.id}
          name={props.id}
          className={classnames('form__input', props.className)}
          {...formProps}
        >
          <option value="" disabled>
            -select-
          </option>
          {props.children}
        </select>

        {props.touched && props.error && (
          <p className="form__error">{props.error}</p>
        )}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
  wrapperClass: PropTypes.string
};
