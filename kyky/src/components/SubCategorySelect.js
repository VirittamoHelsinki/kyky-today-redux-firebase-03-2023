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
      <optgroup label="Home & Repairs">
        <option value="cleaning services">cleaning services</option>
        <option value="moving services">moving services</option>
        <option value="home repairs & maintenance">home repairs & maintenance</option>
        <option value="gardeners">gardeners</option>
        <option value="interior design">interior design</option>
      </optgroup>
      <optgroup label="Beauty & Fashion">
        <option value="hairdressers">hairdressers</option>
        <option value="makeup artists & cosmetologists">makeup artist & cosmetologists</option>
        <option value="manicure & pedicure">manicure & pedicure</option>
        <option value="other beauty related">other beauty related</option>
        <option value="tailors">tailors</option>
      </optgroup>
      <optgroup label="Education & Languages">
        <option value="school tutors">school tutors</option>
        <option value="language mentors">language mentors</option>
        <option value="music mentors">music mentors</option>
        <option value="others">others</option>
      </optgroup>
      <optgroup label="Wellness">
        <option value="mind coach">mind coach</option>
        <option value="health coach">health coach</option>
        <option value="sport coach">sport coach</option>
        <option value="nutrition coach">nutrition coach</option>
        <option value="eldercare">eldercare</option>
      </optgroup>
      <optgroup label="Food & Events">
        <option value="photographers">photographers</option>
        <option value="party planning">party planning</option>
        <option value="wedding planning">wedding planning</option>
        <option value="chef & catering">chef & catering</option>
      </optgroup>
      <optgroup label="Pets">
        <option value="pet training">pet training</option>
        <option value="fur grooming">fur grooming</option>
        <option value="dog walking">dog walking</option>
        <option value="animal attendants">animal attendants</option>
      </optgroup>
      <optgroup label="Creativity & IT">
        <option value="bloggers">bloggers</option>
        <option value="DIY">DIY</option>
        <option value="sightseeings">sightseeings</option>
        <option value="other hobbies">other hobbies</option>
      </optgroup>
      <optgroup label="Consultant">
        <option value="accountings">accountings</option>
        <option value="car & bicycle maintenance">car & bicycle maintenance</option>
      </optgroup>
    </select>
  );
}
