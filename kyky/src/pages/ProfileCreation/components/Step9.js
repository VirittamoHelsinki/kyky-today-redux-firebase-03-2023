import '../../../styles/NewProfileCreation.scss';
import '../../../styles/_components.scss';
import React, { useState } from 'react';
import {ReactComponent as Like} from '../../../image/like.svg';

export default function Step9(currentStep) {
    return(
        <div className= "step step9">
            <div classname= "mainContainer">
                <div className= "leftContainer"><h1 className= "success">Your profile has been successfully created, Firstname !</h1><Like></Like></div>
                <div className= "rightContainer"></div>
            </div>

        </div>



    )
}