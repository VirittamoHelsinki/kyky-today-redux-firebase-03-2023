import 'material-icons/iconfont/material-icons.css';

// footer

function Footer() {
  return (
    <footer className="main-footer">
      <ul className="footer-nav">
        <h1>Heading 1</h1>
        <li>Link A</li>
        <li>Link B</li>
        <li>Link C</li>
      </ul>
      <ul className="footer-nav">
        <h1>Heading 2</h1>
        <li>Link A</li>
        <li>Link B</li>
        <li>Link C</li>
      </ul>
      <div className="social-icons">
        <span className="material-icons-outlined light">supervised_user_circle</span>
        <span className="material-icons-outlined light">supervised_user_circle</span>
        <span className="material-icons-outlined light">supervised_user_circle</span>
        <span className="material-icons-outlined light">supervised_user_circle</span>
      </div>
    </footer>
  );
}

export default Footer;
