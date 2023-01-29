import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GenericSelect } from './Select';
import {
  categories,
  subCategory1,
  subCategory2,
  subCategory3,
  subCategory4,
  subCategory5
} from './Features';
import '../../styles/NewProfileCreation.scss';

export default function Step5({ handleChange }) {
  const [selectValue, setSelectValue] = useState('');
  const [mainCategory, setMainCategory] = useState({ value: '', label: '' });
  const [subCategory, setSubCategory] = useState({ value: '', label: '' });

  const _mainCategory = useSelector((state) => state.profile.s5MainCategory);
  const _subCategory = useSelector((state) => state.profile.s5SubCategory);

  useEffect(() => {
    handleChange('s5MainCategory', mainCategory);
  }, [mainCategory]);

  useEffect(() => {
    handleChange('s5SubCategory', subCategory);
  }, [subCategory]);

  useEffect(() => {
    if (_mainCategory) {
      setMainCategory(_mainCategory);
    }
  }, [_mainCategory]);

  useEffect(() => {
    if (_subCategory) {
      setSubCategory(_subCategory);
    }
  }, [_subCategory]);

  const showCategory = (categories) => {
    if (categories.value === 'homeMaintenanceAndRepairs')
      setSelectValue(
        <GenericSelect
          className="select-container2b"
          placeholder="Choose a subcategory"
          options={[...subCategory1]}
          value={subCategory1.filter(({ label }) => label === subCategory.label)}
          onChange={(value) => setSubCategory(value)}></GenericSelect>
      );
    else if (categories.value === 'movingAndCleaning')
      setSelectValue(
        <GenericSelect
          className="select-container2b"
          placeholder="Choose a subcategory"
          options={[...subCategory2]}
          value={subCategory2.filter(({ label }) => label === subCategory.label)}
          onChange={(value) => setSubCategory(value)}></GenericSelect>
      );
    else if (categories.value === 'careAndWellness')
      setSelectValue(
        <GenericSelect
          className="select-container2b"
          placeholder="Choose a subcategory"
          options={[...subCategory3]}
          value={subCategory3.filter(({ label }) => label === subCategory.label)}
          onChange={(value) => setSubCategory(value)}></GenericSelect>
      );
    else if (categories.value === 'creativeAndIt')
      setSelectValue(
        <GenericSelect
          className="select-container2b"
          placeholder="Choose a subcategory"
          options={[...subCategory4]}
          value={subCategory4.filter(({ label }) => label === subCategory.label)}
          onChange={(value) => setSubCategory(value)}></GenericSelect>
      );
    else
      setSelectValue(
        <GenericSelect
          className="select-container2b"
          placeholder="Choose a subcategory"
          options={[...subCategory5]}
          value={subCategory5.filter(({ label }) => label === subCategory.label)}
          onChange={(value) => setSubCategory(value)}></GenericSelect>
      );
  };

  return (
    <div className="step step5">
      <GenericSelect
        key={categories.value}
        value={categories.filter(({ label }) => label === mainCategory.label)}
        className="select-container2"
        placeholder="Choose a main category"
        options={[...categories]}
        onChange={(value) => {
          showCategory(value);
          setMainCategory(value);
        }}
      />
      {selectValue}
    </div>
  );
}

Step5.propTypes = {
  handleChange: PropTypes.func.isRequired
};
