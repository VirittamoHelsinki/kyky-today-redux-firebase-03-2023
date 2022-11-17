import {useState} from "react";

function LandingPage() {

    const [landingPageImageClass, setLandingPageImageClass] = useState('image1');

  return (
    <div className="landing-page-container">
        <div className="landing-page-nav-and-image-container">
            <div className="landing-page-navigation-container">
                            <button onMouseEnter={()=>setLandingPageImageClass('image1')}>Koti & Korjaukset</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image2')}>Kauneus & Muoti</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image3')}>Koulutus & Kielet</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image4')}>Hyvinvointi</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image5')}>Ruoka & Tapahtumat</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image6')}>Lemmikit</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image7')}>Luovuus & IT</button>
                            <button onMouseEnter={()=>setLandingPageImageClass('image7')}>Konsultointi</button>
            </div>
            <div className="landing-page-image">
                <h1>Let's get things done!</h1>
                <div className={`${landingPageImageClass}`}/>
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
