import { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import IconOption from './IconOption';
import Languages from '../../../languages.json';

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
    className = "select-container",
    name,
    placeholder,
    options,
    getOptionLabel,
    getOptionValue
}) {
    const renderReactSelect = () => {
        return (
            <ReactSelect
                className={`${className !== 'select-container' ? className : 'select-container'}`}
                name={name}
                placeholder={placeholder}
                options={[...options]}
                getOptionLabel={getOptionLabel ? getOptionLabel : (option) => option.label}
                getOptionValue={getOptionValue ? getOptionValue : (option) => option.value}
                components={{ Option: IconOption }}
            />
        );
    };

  return renderReactSelect();
}

/*
Component for creating multiple 'HTML label element – react-select Select component' pairs in profile creation Languges section.
*/
export function LanguagesSelect({
    selectAttributes,
    placeholder,
    options,
    handleClick
}) {

  const [languages, setLanguages] = useState();
  useEffect( () => {
    setLanguages(Object.keys(Languages)
                       .map(key => { return { value: key, label: Languages[key].name } }));
  }, [selectAttributes, Languages]);

  const renderIfThereIsLanguagesData = () => {
    if (typeof languages !== undefined) {
        return (
            <>
                {selectAttributes.map( language => {
                    if (language.visible && language.name !== 'otherSelect') {
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
                    } else if (language.visible && language.name === 'otherSelect') {
                        return (
                            <div className="languageRow" key={language.name}>
                                <GenericSelect 
                                    name={language.name}
                                    placeholder={placeholder}
                                    options={languages}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.value}
                                />
                                <GenericSelect 
                                    name={language.name}
                                    placeholder={placeholder}
                                    options={[...options]}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <button id="addLanguageButton" onClick={handleClick} key="addLanguageButton">
                                <i className="material-icons-outlined">add_circle_outline</i>
                                <p>Add a language</p>
                            </button>
                        );
                    }
                })}
            </>
        )
    } else {
        return (
            <div className="languageRow">
                <p>Loading languages...</p>
            </div>
        )
    }
  }

  return renderIfThereIsLanguagesData();
}
