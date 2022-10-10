import ReactSelect from 'react-select';
import IconOption from './IconOption';

/*
Custom react-select Select component with Option component which has check mark icon indicating the chosen option in dropdown menu.
Attributes:
name – name that connects the Select component with HTML label element's htmlFor attribute
placeholder – placeholder text in Select component
options – options in Select component (dropdown menu), list of value-label pairs inside objects:
    { value: '...', label: '...' }, { value: '...', label: '...' }, ...
    [...options] is for creating new options array for each Select component with the same content.
components – custom react-select Option components with check mark icon
*/
export function GenericSelect({
    name,
    placeholder,
    options
}) {
  return (
    <ReactSelect
        className="select-container"
        name={name}
        placeholder={placeholder}
        options={[...options]}
        components={{ Option: IconOption }}
    />
  );
}

/*
Component for creating multiple 'HTML label element – react-select Select component' pairs in profile creation Languges section.
*/
export function LanguagesSelect({
    selectAttributes,
    placeholder,
    options
}) {
  return (
    <>
        {selectAttributes.map( language => {
            return (
                <div className="languageRow" key={language.name}>
                    <label htmlFor={language.name}>{language.label}</label>
                    <GenericSelect 
                        name={language.name}
                        placeholder={placeholder}
                        options={[...options]}
                    />
                </div>
            );
        })}
    </>
)}