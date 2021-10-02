import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import useOnClickOutside from '../../services/useOnClickOutside';

export const Dropdown = ({ title, items, children, titleNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      className={classnames('dropdown', { 'dropdown--active': isOpen })}
      ref={dropdownRef}
    >
      <span className="dropdown__toggle" onClick={toggleDropdown}>
        {title || titleNode}
      </span>

      <ul className="dropdown__menu">
        {!!children && children}

        {!children &&
          items.map((item, index) => (
            <li key={index} className="dropdown__item">
              {item.url ? <Link href={item.url}>{item.name}</Link> : item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array,
  title: PropTypes.string,
  titleNode: PropTypes.node
};
