

function LandingPage() {
  return (
    <div className="landing-page-container">
        <div className="landing-page-nav-and-image-container">
            <div className="landing-page-navigation-container">
                <nav className="landing-page-navigation">
                   it  <ol>
                        <li>Koti & Korjaukset</li>
                        <li>Kauneus & Muoti</li>
                        <li>Koulutus & Kielet</li>
                        <li>Hyvinvointi</li>
                        <li>Ruoka & Tapahtumat</li>
                        <li>Lemmikit</li>
                        <li>Luovuus & IT</li>
                        <li>Konsultointi</li>
                    </ol>
                </nav>
            </div>
            <div className="landing-page-image">
                <h1>Let's get things done!</h1>
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
