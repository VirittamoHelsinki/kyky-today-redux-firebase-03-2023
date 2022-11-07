import '../../../styles/NewProfileCreation.scss';
import React from 'react';

export default function AddSkills(setSaved) {
    return(
        <div className= "AddSkillsContainer"><h3>My skills</h3><p>Your skills</p><button type="button" className="saveButton" onClick={() => setSaved(true)}>
        Save
      </button></div>
    )
}