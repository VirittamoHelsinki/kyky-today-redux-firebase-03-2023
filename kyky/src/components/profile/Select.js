import ReactSelect from 'react-select';
import IconOption from './IconOption';

/*
Custom react-select Select component with Option component which has check mark icon indicating the chosen option in dropdown menu.
Attributes:
className – CSS class name for the Select component, "select-container" being the default (optional)
name – name that connects the Select component with HTML label element's htmlFor attribute (recommended for accessibility reasons)
placeholder – placeholder text in Select component (required)
onChange – event handler for change events (required)
options – options in Select component (dropdown menu), list of value-label pairs inside objects (required):
    { value: '...', label: '...' }, { value: '...', label: '...' }, ...
[...options] is for creating new options array for each Select component with the same content
*/
export function GenericSelect({
  className = 'select-container',
  name,
  placeholder,
  options,
  defaultValue = '',
  onChange = () => {}
}) {
  return (
    <ReactSelect
      className={`${className !== 'select-container' ? className : 'select-container'}`}
      name={name}
      placeholder={placeholder}
      options={[...options]}
      defaultValue={defaultValue}
      onChange={onChange}
      components={{ Option: IconOption }}
    />
  );
}

/*
Component for creating multiple 'HTML label element – react-select Select component' pairs in profile creation Languges section.
*/
export function LanguagesSelect({
  formData,
  placeholder,
  languages,
  options,
  handleChangeReactSelect,
  handleClickAddLanguage,
  toggleAddLanguageButton,
  fourthLanguageSelectPlaceholder
}) {
  const renderIfThereIsLanguagesData = () => {
    if (languages !== undefined) {
      return (
        <>
          <div className="languageRow">
            <label htmlFor="finnish">Finnish</label>
            <GenericSelect
              name="finnish"
              placeholder={placeholder}
              options={[...options]}
              defaultValue={formData?.s3LanguageFI}
              onChange={(selectOption) => handleChangeReactSelect('s3LanguageFI', selectOption)}
            />
          </div>
          <div className="languageRow">
            <label htmlFor="swedish">Swedish</label>
            <GenericSelect
              name="swedish"
              placeholder={placeholder}
              options={[...options]}
              defaultValue={formData?.s3LanguageSV}
              onChange={(selectOption) => handleChangeReactSelect('s3LanguageSV', selectOption)}
            />
          </div>
          <div className="languageRow">
            <label htmlFor="english">English</label>
            <GenericSelect
              name="english"
              placeholder={placeholder}
              options={[...options]}
              defaultValue={formData?.s3LanguageEN}
              onChange={(selectOption) => handleChangeReactSelect('s3LanguageEN', selectOption)}
            />
          </div>

          {toggleAddLanguageButton === true && (
            <button
              id="addLanguageButton"
              onClick={() => {
                handleClickAddLanguage();
              }}
              key="addLanguageButton">
              <i className="material-icons-outlined">add_circle_outline</i>
              <p>Add a language</p>
            </button>
          )}

          {toggleAddLanguageButton === false && (
            <div className="languageRow">
              <GenericSelect
                className="fourth-language-select-container"
                name="otherLanguage"
                placeholder={fourthLanguageSelectPlaceholder}
                options={languages}
                defaultValue={formData?.s3LanguageOther}
                onChange={(selectOption) =>
                  handleChangeReactSelect('s3LanguageOther', selectOption)
                }
              />
              <GenericSelect
                name="otherLanguageProficiency"
                placeholder={placeholder}
                options={[...options]}
                defaultValue={formData?.s3LanguageOtherProficiency}
                onChange={(selectOption) =>
                  handleChangeReactSelect('s3LanguageOtherProficiency', selectOption)
                }
              />
            </div>
          )}
        </>
      );
    } else {
      return (
        <div className="languageRow">
          <p>Loading languages...</p>
        </div>
      );
    }
  };

  return renderIfThereIsLanguagesData();
}
