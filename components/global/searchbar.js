import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { FormField } from './formfield';

export const Searchbar = ({
  buttonLabel,
  className,
  onChange,
  onSearch,
  placeholder,
  value
}) => {
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSearch(value);
    // inputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classnames('searchbar', className)}
    >
      <FormField
        ref={inputRef}
        className=""
        placeholder={placeholder || 'Search'}
        onChange={onChange}
        value={value}
      />
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
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string
};
