import { useState } from 'react';
import dogIMG from '../image/dog-walker.png';
import celebrationIMG from '../image/celebration.png';
import cookingIMG from '../image/cooking.png';
import technologyIMG from '../image/technology.png';
import gardeningIMG from '../image/gardening.png';
import photographyIMG from '../image/photography.png';
import teachingIMG from '../image/teaching.png';

function LandingPage() {
  const [landingPageImage, setLandingPageImage] = useState(cookingIMG);

  return (
    <div className="landing-page-container">
      <div className="landing-page-nav-and-image-container">
        <div className="landing-page-navigation-container">
          <button onMouseEnter={() => setLandingPageImage(cookingIMG)}>Koti & Korjaukset</button>
          <button onMouseEnter={() => setLandingPageImage(photographyIMG)}>Kauneus & Muoti</button>
          <button onMouseEnter={() => setLandingPageImage(teachingIMG)}>Koulutus & Kielet</button>
          <button onMouseEnter={() => setLandingPageImage(celebrationIMG)}>Hyvinvointi</button>
          <button onMouseEnter={() => setLandingPageImage(gardeningIMG)}>Ruoka & Tapahtumat</button>
          <button onMouseEnter={() => setLandingPageImage(dogIMG)}>Lemmikit</button>
          <button onMouseEnter={() => setLandingPageImage(technologyIMG)}>Luovuus & IT</button>
          <button onMouseEnter={() => setLandingPageImage(celebrationIMG)}>Konsultointi</button>
        </div>
        <div className="landing-page-image">
          <h1>Let's get things done!</h1>
          <img src={landingPageImage} />
        </div>
      </div>
      <div className="landing-page-footer">
        <button>Just Browsing?</button>
        <button>Join Us!</button>
      </div>
    </div>
  );
}

export default LandingPage;
