import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const FileInput = forwardRef((props, ref) => {
  const formProps = { ...props };
  delete formProps.allowedFiles;
  delete formProps.isRequired;
  delete formProps.label;
  delete formProps.error;
  delete formProps.fileName;

  return (
    <div className="form__group form__file-group">
      {props.label && (
        <label>
          {props.label}{' '}
          {props.isRequired && <span className="color-red">*</span>}
        </label>
      )}

      <div
        className={classnames('form__file mr-2', props.className, {
          'form__file--error': props.error,
          'form__file--active': props.fileName
        })}
      >
        <label>Choose file</label>

        <span className="form__file-name">{props.fileName}</span>

        <input
          {...formProps}
          type="file"
          ref={ref}
          id={props.id}
          name={props.id}
          accept={props.allowedFiles}
        />
      </div>

      {props.error && <p className="form__error">{props.error}</p>}
    </div>
  );
});

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
  allowedFiles: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  fileName: PropTypes.string
};

FileInput.defaultProps = {
  allowedFiles: 'image/png, image/jpeg',
  fileName: 'No file Chosen...'
};
