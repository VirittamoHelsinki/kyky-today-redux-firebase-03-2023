import MultipleSelect from './MultipleSelect';

function SelectDays({ selectedDays }) {

  const options = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];


  return (
    <>
      <MultipleSelect options={options} onChange={(e) => selectedDays(e)} />
    </>
  );
}

export default SelectDays;
