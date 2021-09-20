import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const FormField = (props) => {
  return (
    <div className={classnames("form__group", props.wrapperClass)}>
      {props.label && <label>{props.label}</label>}

      <div className="form__input__wrapper">
        {props.type === "textarea" ? (
          <textarea
            {...props}
            id={props.id}
            name={props.id}
            className={classnames("form__textarea", props.className)}
          />
        ) : (
          <input
            {...props}
            id={props.id}
            name={props.id}
            className={classnames("form__input", props.className)}
          />
        )}

        {props.error && <p className="form__error">{props.error}</p>}
      </div>
    </div>
  );
};

FormField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  wrapperClass: PropTypes.string,
};
