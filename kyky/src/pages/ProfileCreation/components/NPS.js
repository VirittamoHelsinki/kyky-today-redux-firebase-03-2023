import React from 'react';
import Button from '../../../components/Button';
import { ReactComponent as Happy } from '../../../image/npsHappy.svg';
import { ReactComponent as VeryHappy } from '../../../image/npsVeryHappy.svg';
import { ReactComponent as Neutral } from '../../../image/npsNeutral.svg';
import { ReactComponent as Sad } from '../../../image/npsSad.svg';
import { ReactComponent as VerySad } from '../../../image/npsVerySad.svg';
import '../../../styles/buyersrating.scss';

export default function NPS() {
  return (
    <div className= "nps">
      <div className= "npsMainContainer">
        <h1>How happy are you with this service?</h1>
        <div className= "emojiContainer"><VerySad /><Sad /><Neutral /><Happy/>
        <VeryHappy /></div>
    <Button className="submitButton" link="nps">
      Submit
    </Button>
      </div>
    </div>
  );
}
