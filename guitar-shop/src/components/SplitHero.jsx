import { Link } from "react-router-dom";
import logo from "../assets/Butterfly.svg";

/**
 * SplitHero: left text + orange form on the right.
 * Props:
 *  - heading, accent, subtext
 *  - rightType: "brand" | "image"
 *  - brandName, brandLogo (when rightType==="brand")
 *  - imageUrl (when rightType==="image")
 *  - showBack (default true)
 */
export default function SplitHero({
  heading,
  accent,
  subtext,
  rightType = "brand",
  brandName,
  brandLogo,
  imageUrl,
  showBack = true,
}) {
  const renderHeading = () => {
    if (!accent || !heading?.includes(accent)) return heading;
    const i = heading.indexOf(accent);
    return (
      <>
        {heading.slice(0, i)}
        <span className="accent">{accent}</span>
        {heading.slice(i + accent.length)}
      </>
    );
  };

  return (
    <section className="split-hero">
      {/* LEFT */}
      <div className="split-left">
        {showBack && (
          <div className="split-crumb">
            <Link to="/" className="crumb-back">
              ← Back To Home
            </Link>
            <span className="crumb-brand">
              <img src={logo} alt="VibeStrings" className="brandmark" />
              <Link to="/" className="brand">
                VibeStrings
              </Link>
            </span>
          </div>
        )}
        <h1 className="split-title">{renderHeading()}</h1>
        {subtext && <p className="split-lead">{subtext}</p>}
      </div>

      {/* RIGHT */}
      <div className="split-art">
        <span className="hero-notch" />
        <img src={logo} alt="VibeStrings" className="hero-notch-icon" />
        {rightType === "brand" ? (
          brandLogo ? (
            <img
              className="split-brand-logo"
              src={brandLogo}
              alt={brandName || "Brand"}
            />
          ) : (
            <div className="split-brand-text">{brandName}</div>
          )
        ) : imageUrl ? (
          <img className="split-guitar" src={imageUrl} alt="" />
        ) : null}
      </div>
    </section>
  );
}
