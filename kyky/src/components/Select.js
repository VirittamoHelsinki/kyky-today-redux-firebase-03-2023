export default function Select({
    name,
    className = 'select-container',
    autoComplete = 'off',
    label = 'label',
    options,
    required,
    onChange = () => {}
}) {
    return (
        <div className={className}>
            <label id={name} htmlFor={name}>
                {label}
            </label>
            <select name={name} id={name} autoComplete={autoComplete} required={required}>
                {options.map(option => option)}
            </select>
        </div>
    );
}