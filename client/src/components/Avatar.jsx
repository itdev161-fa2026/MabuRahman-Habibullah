import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css'; // import the CSS file

export default function Avatar({ src, name, size = 40, className = '' }) {
    const initials = (name || '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

    const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    };

    if (src) {
    return <img src={src} alt={name || 'avatar'} style={style} className={`avatar-img ${className}`} />;
    }

    return (
    <div
        aria-hidden="true"
        className={`avatar-fallback ${className}`}
        style={style}
    >
        {initials || 'U'}
    </div>
    );
}

Avatar.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
};
