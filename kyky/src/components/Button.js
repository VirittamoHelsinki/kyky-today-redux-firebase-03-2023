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
    return <a href={href}>{children}</a>;
  }

  if (link) {
    return <Link to={link}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
