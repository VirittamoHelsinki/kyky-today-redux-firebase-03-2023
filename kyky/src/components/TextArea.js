/* eslint-disable react/prop-types */
export default function TextArea({ label, name, value, onChange, className = 'text-area' }) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  );
}
