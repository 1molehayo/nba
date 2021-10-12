import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from 'next/link';
import useOnClickOutside from '../../services/use-on-click-outside';

export const Dropdown = ({
  title,
  items,
  children,
  titleNode,
  isActive,
  buttonlinks
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prevState) => !prevState);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      className={classnames('dropdown', {
        'dropdown--active': isOpen,
        'dropdown--urlActive': isActive
      })}
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
              {item.url && item.type === 'link' && (
                <Link href={item.url}>{item.name}</Link>
              )}
              {item.url && item.type === 'button' && (
                <span role="button" onClick={buttonlinks[item.url]}>
                  {item.name}
                </span>
              )}
              {!item.url && item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  buttonlinks: PropTypes.object,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  items: PropTypes.array,
  title: PropTypes.string,
  titleNode: PropTypes.node
};
