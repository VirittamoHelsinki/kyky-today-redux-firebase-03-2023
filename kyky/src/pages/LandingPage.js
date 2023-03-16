import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dogIMG from '../image/dog-walker.png';
import cookingIMG from '../image/cooking.png';
import technologyIMG from '../image/technology.png';
import gardeningIMG from '../image/gardening.png';
import photographyIMG from '../image/photography.png';

function LandingPage() {
  const [landingPageImage, setLandingPageImage] = useState(dogIMG);

  return (
    <div className='landing-page-main'>
      <div className="landing-page-container">
        <div className='landing-page-left-content'>
          <div className='landing-page-title'>
            <p>Let’s get things done!</p>
          </div>
          <div className='landing-page-description'>
            <p>Join KYKY and take control of your career. Our platform empowers freelancers worldwide with transparency, and immediate booking</p>
          </div>
          <div className='landing-page-buttons-row'>
          <Link to="/categories/all">
            <button className='browsing-button'>Just browsing?</button>
            </Link>
            <button className='join-button'>Join us!</button>
          </div>
        </div>
        <div className='landing-page-right-content'>
          <img className='landing-page-image' src={landingPageImage} alt="" />
          <div className="landing-page-navigation-container">
            <Link to="/categories/home_maintenance_and_repairs">
              <button onMouseEnter={() => setLandingPageImage(gardeningIMG)}>
                Home Maintenance & Repairs
              </button>
            </Link>
            <Link to="/categories/moving_and_cleaning">
              <button onMouseEnter={() => setLandingPageImage(cookingIMG)}>Moving & Cleaning</button>
            </Link>
            <Link to="/categories/care_and_wellness">
              <button onMouseEnter={() => setLandingPageImage(dogIMG)}>Care & Wellness</button>
            </Link>
            <Link to="/categories/learning_and_coaching">
              <button onMouseEnter={() => setLandingPageImage(photographyIMG)}>
                Learning & Coaching
              </button>
            </Link>
            <Link to="/categories/creative_and_it">
              <button onMouseEnter={() => setLandingPageImage(technologyIMG)}>Creative & IT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;