import PropTypes from 'prop-types';

export const Context = ({ onClose, children }) => (
  <div className="context">
    <div className="text-right">
      <button className="context__close" onClick={onClose}>
        <span className="icon-close" />
      </button>
    </div>

    <div className="context__list">{children}</div>
  </div>
);

Context.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};
