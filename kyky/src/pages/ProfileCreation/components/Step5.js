import '../../../styles/NewProfileCreation.scss';
import Select, { components } from 'react-select';
import React from 'react';
import { ReactComponent as CheckMark } from '../../../image/check-mark.svg';
export default function Step5() {
  const options = [
    { value: 'itAndNetworking', label: 'IT & Networking' },
    { value: 'salesAndMarketing', label: 'Sales & marketing' },
    { value: 'writing', label: 'Writing' },
    { value: 'webMobileAndSoftwareDev ', label: 'Web, Mobile & Software Dev' }
  ];

  const placeholder = 'Search for a service';
  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      {props.isSelected ? (
        <div class="optionContainer">
          <CheckMark id="checkMark" />
          <span class="optionLabelTextBold">{props.data.label}</span>
        </div>
      ) : (
        <div class="optionContainer">
          <div id="noCheckMark"></div>
          <span class="optionLabelText">{props.data.label}</span>
        </div>
      )}
    </Option>
  );

  return (
    <div className="step step5">
      <Select
        className="select-container2"
        placeholder={placeholder}
        options={[...options]}
        components={{ Option: IconOption }}
      />
    </div>
  );
}
