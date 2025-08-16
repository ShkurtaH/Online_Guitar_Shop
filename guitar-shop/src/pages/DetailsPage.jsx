// src/pages/DetailsPage.jsx
import { useQuery } from "@apollo/client";
import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SplitHero from "../components/SplitHero";
import { GET_MODEL } from "../api/queries";

export default function DetailsPage() {
  const { brandId, modelId } = useParams();

  // Hook 1: data
  const { data, loading, error } = useQuery(GET_MODEL, {
    variables: { brandId, modelId },
  });
  const g = data?.findUniqueModel;

  // Hook 2: tab state
  const [tab, setTab] = useState("specs");

  // Hook 3: specs memo (safe when g is undefined)
  const specs = useMemo(() => {
    const s = g?.specs || {};
    return [
      ["Body Wood", s.bodyWood],
      ["Neck Wood", s.neckWood],
      ["Fingerboard", s.fingerboardWood],
      ["Pickups", s.pickups],
      ["Tuners", s.tuners],
      ["Scale Length", s.scaleLength],
      ["Bridge", s.bridge],
    ].filter(([, v]) => !!v);
  }, [g]);

  // Hooks 4–6: musicians paging (always defined)
  const allMusicians = g?.musicians || [];
  const pageSize = 2;
  const [mPage, setMPage] = useState(1);
  const mTotalPages = Math.max(1, Math.ceil(allMusicians.length / pageSize));
  const mStart = (mPage - 1) * pageSize;
  const musicians = allMusicians.slice(mStart, mStart + pageSize);
  const dotsCount = Math.max(1, mTotalPages);
  // Hook 7: clamp/reset musician page when model changes or length changes
  useEffect(() => {
    setMPage(1);
  }, [modelId, allMusicians.length]);

  /* ---- JSX (branch AFTER all hooks have run) ---- */
  return (
    <>
      <SplitHero
        heading={g?.name || (loading ? "" : "Unknown model")}
        rightType="image"
        imageUrl={g?.image}
        subtext=""
        showBack
      />

      <section className="details">
        {error && <p className="state error">Failed to load.</p>}

        {!error && (
          <>
            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab ${tab === "specs" ? "is-active" : ""}`}
                onClick={() => setTab("specs")}
                disabled={loading}
              >
                Specification
              </button>
              <button
                className={`tab ${tab === "players" ? "is-active" : ""}`}
                onClick={() => setTab("players")}
                disabled={loading}
              >
                Who plays it?
              </button>
            </div>

            {/* Loading body */}
            {loading && <p className="state">Loading…</p>}

            {/* SPECIFICATION */}
            {!loading && tab === "specs" && (
              <div className="specs">
                {g?.description && (
                  <p className="specs-lead">{g.description}</p>
                )}
                {!!specs.length && (
                  <ul className="specs-list">
                    {specs.map(([k, v]) => (
                      <li key={k}>
                        <strong>{k}:</strong> {v}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* MUSICIANS */}
            {tab === "players" && (
              <div className="musicians">
                <div className="musicians-grid">
                  {musicians.map((m, i) => (
                    <article className="polaroid" key={`${m.name}-${i}`}>
                      <div className="polaroid-inner">
                        <div className="polaroid-photo">
                          {m.musicianImage && (
                            <img
                              src={m.musicianImage}
                              alt={m.name}
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="polaroid-caption">{m.name}</div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="dots-only">
                  {Array.from({ length: dotsCount }).map((_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={n}
                        className={`dot ${mPage === n ? "is-active" : ""}`}
                        onClick={() => setMPage(n)}
                        disabled={mTotalPages === 1} // single page: dot is inert
                        aria-label={`Show set ${n}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
