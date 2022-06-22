/* eslint-disable react/prop-types */
export default function TextArea({ title, name, value, onChange, className = 'text-area' }) {
  return (
    <div className={className}>
      <label htmlFor={name}>{title}</label>
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  );
}
