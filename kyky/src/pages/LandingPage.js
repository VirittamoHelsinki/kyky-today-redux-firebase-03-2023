import { useState } from 'react';
import { Link } from 'react-router-dom';
import dogIMG from '../image/dog-walker.png';
import cookingIMG from '../image/cooking.png';
import technologyIMG from '../image/technology.png';
import gardeningIMG from '../image/gardening.png';
import photographyIMG from '../image/photography.png';

function LandingPage() {
  const [landingPageImage, setLandingPageImage] = useState(dogIMG);

  return (
    <div className="landing-page-container">
      <div className="landing-page-nav-and-image-container">
        <div className="landing-page-navigation-container">
          <Link to="/categories/care_and_wellness">
            <button onMouseEnter={() => setLandingPageImage(dogIMG)}>Care & Wellness</button>
          </Link>
          <Link to="/categories/learning_and_coaching">
            <button onMouseEnter={() => setLandingPageImage(photographyIMG)}>
              Learning & Coaching
            </button>
          </Link>
          <Link to="/categories/home_maintenance_and_repairs">
            <button onMouseEnter={() => setLandingPageImage(gardeningIMG)}>
              Home Maintenance & Repairs
            </button>
          </Link>
          <Link to="/categories/moving_and_cleaning">
            <button onMouseEnter={() => setLandingPageImage(cookingIMG)}>Moving & Cleaning</button>
          </Link>
          <Link to="/categories/creative_and_it">
            <button onMouseEnter={() => setLandingPageImage(technologyIMG)}>Creative & IT</button>
          </Link>
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
