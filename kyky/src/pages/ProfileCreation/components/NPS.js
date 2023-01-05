import { useState, React } from 'react';
import Button from '../../../components/Button';
import { ReactComponent as Happy } from '../../../image/npsHappy.svg';
import { ReactComponent as VeryHappy } from '../../../image/npsVeryHappy.svg';
import { ReactComponent as Neutral } from '../../../image/npsNeutral.svg';
import { ReactComponent as Sad } from '../../../image/sad-face-icon.svg';
import { ReactComponent as VerySad } from '../../../image/npsVerySad.svg';
import '../../../styles/buyersrating.scss';

export default function NPS() {
  const [verySad, setVerySad] = useState('emojiAttributes1');
  const [sad, setSad] = useState('emojiAttributes1');
  const [neutral, setNeutral] = useState('emojiAttributes1');
  const [happy, setHappy] = useState('emojiAttributes1');
  const [veryHappy, setVeryHappy] = useState('emojiAttributes1');

  const selectVerySad = () => {
    setVerySad('emojiAttributes2');
  };
  const selectSad = () => {
    setSad('emojiAttributes2');
  };
  const selectNeutral = () => {
    setNeutral('emojiAttributes2');
  };
  const selectHappy = () => {
    setHappy('emojiAttributes2');
  };
  const selectVeryHappy = () => {
    setVeryHappy('emojiAttributes2');
  };
  return (
    <div className="nps">
      <div className="npsMainContainer">
        <h1>How happy are you with this service?</h1>
        <div className="emojiContainer">
          <VerySad className={verySad} onClick={selectVerySad} />
          <Sad className={sad} onClick={selectSad} />
          <Neutral className={neutral} onClick={selectNeutral} />
          <Happy className={happy} onClick={selectHappy} />
          <VeryHappy className={veryHappy} onClick={selectVeryHappy} />
        </div>
        <Button className="submitButton" link="nps">
          Submit
        </Button>
      </div>
    </div>
  );
}
