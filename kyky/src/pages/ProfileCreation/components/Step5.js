import '../../../styles/NewProfileCreation.scss';

import { GenericSelect } from './Select';
import { useState, React } from 'react';

export default function Step5() {
  const [selectValue, setSelectValue] = useState('');
  const showCategory = () => {
    setSelectValue(
      <GenericSelect
        className="select-container2"
        placeholder="Choose a subcategory"
        options={[...subCategory1]}></GenericSelect>
    );
    //console.log('hello');
  };
  const categories = [
    { value: 'homeMaintenanceAndRepairs', label: 'Home Maintenance & Repairs', id: 1 },
    { value: 'movingAndCleaning', label: 'Moving & Cleaning', id: 2 },
    { value: 'careAndWellness', label: 'Care & Wellness', id: 3 },
    { value: 'creativeAndIt', label: 'Creative & IT', id: 4 },
    { value: 'learningandCoaching', label: 'Learning & Coaching', id: 5 }
  ];
  const subCategory1 = [
    { value: 'handyman', label: 'Handyman' },
    { value: 'painter', label: 'Painter' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'snowManagement', label: 'Snow Management' },
    { value: 'gardeningAndLandscaping', label: 'Gardening & Landscaping' },
    { value: 'chimneyOrGutterMaintenance', label: 'Chimney / Gutter Maintenance' }
  ];

  return (
    <div className="step step5">
      <GenericSelect
        className="select-container2"
        placeholder="Choose a main category"
        options={[...categories]}
        onChange={showCategory}
      />
      {selectValue}
    </div>
  );
}
