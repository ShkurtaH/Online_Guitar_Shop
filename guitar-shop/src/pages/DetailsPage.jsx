import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MODEL } from "../api/queries";
import Tabs from "../components/Tabs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SplitHero from "../components/SplitHero";
export default function DetailsPage() {
  const { brandId, modelId } = useParams();
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_MODEL, {
    variables: { brandId, modelId },
  });
  const [visible, setVisible] = useState(2);

  if (loading) return <p className="state">{t("loading")}</p>;
  if (error) return <p className="state error">{t("error")}</p>;

  const g = data?.findUniqueModel;
  if (!g) return null;

  const specs = g.specs || {};
  const specRows = [
    ["Body wood", specs.bodyWood],
    ["Neck wood", specs.neckWood],
    ["Fingerboard", specs.fingerboardWood],
    ["Pickups", specs.pickups],
    ["Tuners", specs.tuners],
    ["Scale length", specs.scaleLength],
    ["Bridge", specs.bridge],
  ].filter(([, v]) => v);

  const musicians = Array.isArray(g.musicians) ? g.musicians : [];

  const tabs = [
    {
      label: t("specs"),
      content: (
        <div className="specs">
          {specRows.length ? (
            <ul>
              {specRows.map(([k, v]) => (
                <li key={k}>
                  <strong>{k}:</strong> {v}
                </li>
              ))}
            </ul>
          ) : (
            <p>No specifications provided.</p>
          )}
        </div>
      ),
    },
    {
      label: t("whoPlaysIt"),
      content: (
        <div className="musicians">
          <div className="grid mus-grid">
            {musicians.slice(0, visible).map((m, i) => (
              <figure key={`${m.name}-${i}`} className="artist-card">
                {m.musicianImage && <img src={m.musicianImage} alt={m.name} />}
                <figcaption>
                  <div>{m.name}</div>
                  {m.bands?.length ? <small>{m.bands.join(", ")}</small> : null}
                </figcaption>
              </figure>
            ))}
          </div>
          {musicians.length > visible && (
            <div className="dots">
              <button onClick={() => setVisible((v) => v + 2)}>• •</button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="details">
      <Tabs tabs={tabs} />
      <SplitHero
        heading={g.name}
        subtext={g.description}
        rightType="image"
        imageUrl={g.image}
        showBack={true}
      />
    </section>
  );
}
