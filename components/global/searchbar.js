import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { FormField } from './formfield';

export const Searchbar = ({
  buttonLabel,
  className,
  onChange,
  onSearch,
  onClear,
  placeholder,
  value
}) => {
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classnames('searchbar', className)}
    >
      <div className="relative">
        <FormField
          ref={inputRef}
          className=""
          placeholder={placeholder || 'Search'}
          onChange={onChange}
          value={value}
        />

        {value && (
          <span className="icon-close searchbar__close" onClick={onClear} />
        )}
      </div>

      <button type="submit" className="button button--primary">
        {buttonLabel || 'Find'}
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};
