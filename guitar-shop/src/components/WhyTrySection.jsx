import smooth from "../assets/category-2.png";
import delivery from "../assets/group.png";
import payments from "../assets/empty-wallet-tick.png";

const FEATURES = [
  {
    icon: smooth,
    title: "SMOOTH BROWSING",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: delivery,
    title: "EASY DELIVERY",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: payments,
    title: "SWIFT PAYMENTS",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function WhyTrySection() {
  return (
    <section className="why">
      <header className="why-head">
        <h2 className="why-title">
          Why try <span className="accent">VibeStrings?</span>
        </h2>
      </header>

      <div className="why-grid">
        {FEATURES.map((f) => (
          <article key={f.title} className="why-card">
            <div className="why-icon">
              <img src={f.icon} alt="" aria-hidden />
            </div>
            <h3 className="why-card-title">{f.title}</h3>
            <p className="why-card-desc">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
