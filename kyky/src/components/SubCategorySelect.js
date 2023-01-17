import React from 'react';

export default function SubCategorySelect({ changeMainCat, changeSubCat }) {
  return (
    <select
      name="subcategories"
      defaultValue={'DEFAULT'}
      onChange={(e) => {
        changeSubCat(e.target.value);
        changeMainCat(
          document.querySelector('select[name="subcategories"] option:checked').parentElement.label
        );
      }}>
      <option value="DEFAULT" hidden disabled>
        -- select a category --
      </option>
      <optgroup label="Home maintenance and repairs">
        <option value="Handyman">handyman</option>
        <option value="Painter">painter</option>
        <option value="Electrician">electrician</option>
        <option value="Plumber">plumber</option>
        <option value="Carpenter">carpenter</option>
        <option value="Snow management">snow management</option>
        <option value="Gardening and landscaping">gardening and landscaping</option>
        <option value="Chimney/gutter maintenance">chimney/gutter maintenance</option>
      </optgroup>
      <optgroup label="moving and cleaning">
        <option value="Moving services">moving services</option>
        <option value="Cleaning services">cleaning services</option>
        <option value="Carpet cleaning">carpet cleaning</option>
      </optgroup>
      <optgroup label="care and wellness">
        <option value="Babysitting">babysitting</option>
        <option value="Nurse">nurse</option>
        <option value="Eldelry care">eldelry care</option>
        <option value="Yoga">yoga</option>
        <option value="Dietitia">dietitia</option>
        <option value="Meditation">meditation</option>
        <option value="Sports and fitness trainer">sports & fitness trainer</option>
        <option value="Massage therapist">massage therapist</option>
        <option value="Fitness coach">fitness coach</option>
      </optgroup>
      <optgroup label="creative and it">
        <option value="Photographer">photographer</option>
        <option value="Graphic designer">graphic designer</option>
        <option value="Content writer">content writer</option>
        <option value="Translators">translators</option>
        <option value="Art and crafts">art and crafts</option>
        <option value="Music">music</option>
        <option value="IT developer">IT developer</option>
        <option value="IT designer">IT designer</option>
        <option value="Programmer">programmer</option>
        <option value="Technicians">technicians</option>
        <option value="Social media">social media</option>
      </optgroup>
      <optgroup label="learning and coaching">
        <option value="Teachers and tutors">teachers and tutors</option>
        <option value="Life coach">life coach</option>
        <option value="Virtual assistent">virtual assistent</option>
        <option value="Accountant">accountant</option>
        <option value="Business consultant">business consultant</option>
        <option value="Lawyer">lawyer</option>
        <option value="Tax and finance consultant">tax and finance consultant</option>
        <option value="Architect">architect</option>
      </optgroup>
    </select>
  );
}
