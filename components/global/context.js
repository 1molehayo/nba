import PropTypes from 'prop-types';

export const Context = ({ children }) => {
  return (
    <div className="context">
      <ul className="context__list">{children}</ul>
    </div>
  );
};

Context.propTypes = {
  children: PropTypes.node
};
