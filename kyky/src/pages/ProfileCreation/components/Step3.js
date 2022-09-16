import '../../../styles/NewProfileCreation.scss';
import React from 'react';
import Input from '../../../components/Input';

export default function Step3(currentStep) {
  return (
    <div className="step step3">
      <div className="formContainer">
        <h2>Language</h2>
        <Input type="text" name="finnish" placeholder="My level is" label="Finnish"></Input>
        <Input type="text" name="swedish" placeholder="My level is" label="Swedish"></Input>
        <Input type="text" name="english" placeholder="My level is" label="English"></Input>
      </div>
    </div>
  );
}