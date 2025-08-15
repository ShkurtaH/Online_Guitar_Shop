import googleBadge from "../assets/google-play.png";
import appStoreBadge from "../assets/app-store.png";
import phoneFeed from "../assets/phone-feed.png";
import phoneProduct from "../assets/phone-product.png";

export default function DownloadAppSection() {
  return (
    <section className="cta-app">
      {/* LEFT: text + badges */}
      <div className="cta-left">
        <h2 className="cta-title">
          Browse and buy your <span className="accent">favorite guitars</span>{" "}
          with VibeStrings.
        </h2>

        <div className="cta-badges">
          <a href="#" aria-label="Get it on Google Play">
            <img src={googleBadge} alt="" />
          </a>
          <a href="#" aria-label="Download on the App Store">
            <img src={appStoreBadge} alt="" />
          </a>
        </div>
      </div>

      {/* RIGHT: phones with orange ellipse behind */}
      <div className="cta-right">
        <div className="phones">
          <img className="phone phone--left" src={phoneFeed} alt="" />
          <img className="phone phone--right" src={phoneProduct} alt="" />
        </div>
      </div>
    </section>
  );
}
