/* eslint-disable */
import { Link } from 'react-router-dom';

// Button component for ease of use.

export default function Button({
  link,
  href,
  onClick,
  className = 'button-primary',
  type = 'button',
  children
}) {
  if (href) {
    return (
      <a className={`${className !== 'button-primary' ? className : ''}`} href={href}>
        {children}
      </a>
    );
  }

  if (link) {
    return (
      <Link className={`${className !== 'button-primary' ? className : ''}`} to={link}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
