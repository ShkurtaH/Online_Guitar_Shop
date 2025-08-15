import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import photo from "../assets/hero-guitar.png";
import logo from "../assets/Butterfly.svg";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero-block hero--split">
      {/* LEFT COLUMN: header + copy */}
      <div className="hero-left-col">
        <header className="header header--simple">
          <div className="left">
            <img src={logo} alt="VibeStrings" className="brandmark" />
            <Link to="/" className="brand">
              VibeStrings
            </Link>
          </div>
        </header>

        <div className="hero-left">
          <h1 className="hero-title">
            Browse top quality <span className="accent">Guitars</span> online
          </h1>
          <p className="hero-lead">
            Explore 50k+ latest collections of branded guitars online with
            VibeStrings.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: photo panel */}
      <div
        className="hero-art hero-art--photo"
        style={{ backgroundImage: `url(${photo})` }}
        aria-hidden
      >
        <span className="hero-notch" />
        <img src={logo} alt="VibeStrings" className="hero-notch-icon" />
      </div>
    </section>
  );
}
