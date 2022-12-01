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

  const subCategory2 = [
    { value: 'movingServices', label: 'Moving Services' },
    { value: 'cleaningServices', label: 'Cleaning Services' },
    { value: 'carpetCleaning', label: 'Carpet Cleaning' }
  ];

  const subCategory3 = [
    { value: 'babysitting', label: 'Babysitting' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'eldelryCare', label: 'Eldelry Care' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'dietitian', label: 'Dietitian' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'sportsAndFitnessTrainer', label: 'Sports & Fitness trainer' },
    { value: 'massageTherapist', label: 'MassageTherapist' },
    { value: 'fitnessCoach', label: 'Fitness Coach' }
  ];

  const subCategory4 = [
    { value: 'photographer', label: 'Photographer' },
    { value: 'graphicDesigner', label: 'Graphic Designer' },
    { value: 'contentWriter', label: 'ContentWriter' },
    { value: 'translators', label: 'Translators' },
    { value: 'artAndCrafts', label: 'Art & Crafts' },
    { value: 'music', label: 'Music' },
    { value: 'itDeveloper', label: 'IT Developer' },
    { value: 'itDesigner', label: 'IT Designer' },
    { value: 'programmer', label: 'Programmer' },
    { value: 'technicians', label: 'Technicians' },
    { value: 'socialMedia', label: 'Social Media' }
  ];

  const subCategory5 = [
    { value: 'teachersAndTutors', label: 'Teachers & Tutors' },
    { value: 'lifeCoach', label: 'Life Coach' },
    { value: 'virtualAssistent', label: 'Virtual Assistent' },
    { value: 'accountant', label: 'Accountant' },
    { value: 'businessConsultant', label: 'Business Consultant' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'itDeveloper', label: 'IT Developer' },
    { value: 'taxAndFinanceConsultant', label: 'Tax & Finance Consultant' },
    { value: 'architect', label: 'Architect' }
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
