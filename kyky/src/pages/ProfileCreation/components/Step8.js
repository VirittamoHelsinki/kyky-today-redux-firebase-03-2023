import '../../../styles/NewProfileCreation.scss';

import React from 'react';

export default function Step8(currentStep) {
  return (
    <div className="step step8">
      <div className="previewContainer1"><h3>UI/UX Designer</h3></div>
      <div className="previewContainer2">
        <h3>Skills</h3>
        <div className="skillContainer">
          <div className="skill Html">HTML5</div>
          <div className="skill Css">CSS 3</div>
          <div className="skill Figma">Figma</div>
          <div className="skill Proto">Prototype Design</div>
        </div>
      </div>
      <div className="previewContainer3">
        {' '}
        <h3>Work Experience</h3>
        <p>No items to display.</p>
      </div>
      <div className="previewContainer4">
        <h3>Education History</h3>
        <p>No items to display.</p>
      </div>
    </div>
  );
}
