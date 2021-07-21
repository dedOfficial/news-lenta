import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({type, text, color, handleClick}) {
    return (
        <button
            onClick={handleClick}
            type={type}
            className={`btn btn_${color} mb-1rem`}
        >{text}</button>
    );
}

Button.defaultProps = {
    type: 'button',
    color: 'primary',
    handleClick: () => {}
};

Button.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func
};