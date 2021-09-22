import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const FormField = forwardRef((props, ref) => {
  return (
    <div className={classnames("form__group", props.wrapperClass)}>
      {props.label && <label>{props.label}</label>}

      <div className="form__input__wrapper">
        {props.type === "textarea" ? (
          <textarea
            {...props}
            id={props.id}
            name={props.id}
            ref={ref}
            className={classnames("form__textarea", props.className)}
          />
        ) : (
          <input
            {...props}
            ref={ref}
            id={props.id}
            name={props.id}
            className={classnames("form__input", props.className)}
          />
        )}

        {props.error && <p className="form__error">{props.error}</p>}
      </div>
    </div>
  );
});

FormField.displayName = "FormField";

FormField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  wrapperClass: PropTypes.string,
};
