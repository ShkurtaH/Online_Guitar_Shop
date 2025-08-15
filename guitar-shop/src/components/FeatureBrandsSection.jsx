import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_BRANDS } from "../api/queries";
import { getBrandLogo, FEATURED_KEYS } from "../constants/brandLogos"; // ← no 'norm' import

// define it here
const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export default function FeaturedBrandsSection() {
  const { data } = useQuery(GET_BRANDS);
  const brands = data?.findAllBrands ?? [];

  const index = new Map(brands.map((b) => [norm(b.name), b]));

  const featured = FEATURED_KEYS.map((key) => {
    const apiBrand = index.get(key) || null;
    const logoSrc = getBrandLogo(apiBrand?.name || key);
    return { key, apiBrand, logoSrc, display: apiBrand?.name || key };
  });

  return (
    <section className="feat">
      <header className="feat-head">
        <h2 className="feat-title">
          Featuring the <span className="accent">Best Brands</span>
        </h2>
        <p className="feat-sub">
          Select your preferred brand and explore our exquisite collection.
        </p>
      </header>

      <div className="brands-logos-grid">
        {featured.map(({ key, apiBrand, logoSrc, display }) =>
          apiBrand ? (
            <Link
              key={key}
              to={`/brand/${apiBrand.id}`}
              className="brand-logo-item"
              title={display}
            >
              {logoSrc ? (
                <img src={logoSrc} alt={display} />
              ) : (
                <span className="brand-logo-text">{display}</span>
              )}
            </Link>
          ) : (
            <div
              key={key}
              className="brand-logo-item"
              title={display}
              aria-disabled
            >
              {logoSrc ? (
                <img src={logoSrc} alt={display} />
              ) : (
                <span className="brand-logo-text">{display}</span>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
