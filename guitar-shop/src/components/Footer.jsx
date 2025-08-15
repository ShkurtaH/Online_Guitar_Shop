import { Link } from "react-router-dom";
import logo from "../assets/Butterfly.svg";
import mail from "../assets/mail.png";
import location from "../assets/location.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-grid">
        {/* 1) Brand + contact */}
        <div className="footer-brand">
          <div className="brand-row">
            <img src={logo} alt="" className="footer-logo" />
            <Link to="/" className="footer-brand-name">
              VibeStrings
            </Link>
          </div>

          <ul className="contact-list">
            <li>
              <img src={mail} alt="" />
              <a href="mailto:enquiry@vibestrings.com">
                Enquiry@VibeStrings.com
              </a>
            </li>
            <li>
              <img src={location} alt="" />
              <span>San Francisco</span>
            </li>
          </ul>
        </div>

        {/* 2) Pages */}
        <nav aria-label="Pages" className="footer-col">
          <h4 className="footer-col-title">PAGES</h4>
          <ul className="footer-links">
            <li>
              <Link to="/store">Store</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </nav>

        {/* 3) Product */}
        <nav aria-label="Product" className="footer-col">
          <h4 className="footer-col-title">PRODUCT</h4>
          <ul className="footer-links">
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/copyright">Copyright</Link>
            </li>
          </ul>
        </nav>

        {/* 4) Socials */}
        <div className="footer-col">
          <h4 className="footer-col-title">FOLLOW US</h4>
          <div className="social-row">
            <a href="#" aria-label="Facebook">
              <img src={facebook} alt="" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={twitter} alt="" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src={instagram} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© 2022 Copyright · VibeStrings</small>
      </div>
    </footer>
  );
}
