import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GET_BRAND_MODELS, SEARCH_MODELS, DEFAULT_SORT } from "../api/queries";
import SelectDropDown from "./SelectDropDown";
import typeIcon from "../assets/filter.png";
import searchIcon from "../assets/search.png";

function SectionHeading({ title, accent, subtitle }) {
  const i = title.indexOf(accent);
  return (
    <header className="sec-head">
      <h2 className="sec-title">
        {i >= 0 ? (
          <>
            {title.slice(0, i)}
            <span className="accent">{accent}</span>
            {title.slice(i + accent.length)}
          </>
        ) : (
          title
        )}
      </h2>
    </header>
  );
}

function ModelCard({ model, to }) {
  return (
    <Link to={to} className="product-card" title={model.name}>
      <div className="product-media">
        {model.image && (
          <img
            src={model.image}
            alt={model.name}
            loading="lazy"
            draggable="false"
          />
        )}
      </div>

      <div className="product-meta">
        <h4>{model.name}</h4>
        {model.type && <small>{model.type}</small>}
        {model.price != null && <p>${Number(model.price).toLocaleString()}</p>}
      </div>
    </Link>
  );
}

export default function SelectionSection({ brandId }) {
  const PAGE_SIZE = 6; // 2 rows × 3 columns

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const useSearch = search.trim().length > 0;

  const baseQuery = useQuery(GET_BRAND_MODELS, {
    variables: { id: brandId, sortBy: DEFAULT_SORT },
    skip: useSearch,
  });

  const searchQuery = useQuery(SEARCH_MODELS, {
    variables: { brandId: String(brandId), name: search.trim() || " " },
    skip: !useSearch,
  });

  const active = useSearch ? searchQuery : baseQuery;
  const loading = active.loading && !active.data;
  const error = active.error;

  const raw = active.data?.findBrandModels || active.data?.searchModels || [];

  const types = useMemo(() => {
    const set = new Set(
      raw.map((m) => (m.type || "").toLowerCase()).filter(Boolean)
    );
    return Array.from(set);
  }, [raw]);

  const filtered = useMemo(
    () =>
      type ? raw.filter((m) => (m.type || "").toLowerCase() === type) : raw,
    [raw, type]
  );

  useEffect(() => setPage(1), [search, type]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * PAGE_SIZE;
  const current = filtered.slice(start, start + PAGE_SIZE);

  const pageItems = useMemo(() => {
    const items = [];
    const delta = 1;
    items.push(1);
    if (clampedPage - delta > 2) items.push("…");
    for (
      let i = Math.max(2, clampedPage - delta);
      i <= Math.min(totalPages - 1, clampedPage + delta);
      i++
    ) {
      items.push(i);
    }
    if (clampedPage + delta < totalPages - 1) items.push("…");
    if (totalPages > 1) items.push(totalPages);
    return items;
  }, [clampedPage, totalPages]);

  if (loading) return <p className="state">Loading…</p>;
  if (error) return <p className="state error">Something went wrong.</p>;

  const Filters = (
    <div className="filters">
      <div className={`field ${type ? "has-value" : ""}`}>
        <span
          className="field__icon"
          style={{ "--icon": `url(${typeIcon})` }}
        />
        <SelectDropDown
          value={type}
          onChange={setType}
          placeholder="Filter by type"
          className="field__control"
          options={types.map((t) => ({
            value: t,
            label: t[0].toUpperCase() + t.slice(1),
          }))}
        />
      </div>

      <div className={`field ${search ? "has-value" : ""}`}>
        <span
          className="field__icon"
          style={{ "--icon": `url(${searchIcon})` }}
        />
        <input
          className="field__control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          aria-label="Search by name"
        />
      </div>
    </div>
  );

  if (!total) {
    return (
      <section className="selection">
        <SectionHeading title="Check out the Selection" accent="Selection" />
        {Filters}
        <p className="state">No models found.</p>
      </section>
    );
  }

  return (
    <section className="selection">
      <SectionHeading
        title="Check out the Selection"
        accent="Selection"
        subtitle="Pick a type or search by name, then choose a model."
      />

      {Filters}

      {/* grid 3 columns */}
      <div className="grid products-grid products-grid--3">
        {current.map((m) => (
          <ModelCard
            key={m.id}
            model={m}
            to={`/brand/${brandId}/model/${m.id}`}
          />
        ))}
      </div>

      {/* pager */}
      <div className="pager-bar">
        <div className="pager-summary">
          Showing {current.length} results from {total}
        </div>

        <div className="pager">
          <button
            className="page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {pageItems.map((it, idx) =>
            it === "…" ? (
              <span key={`e${idx}`} className="page-ellipsis">
                …
              </span>
            ) : (
              <button
                key={it}
                className={`page-btn ${clampedPage === it ? "is-active" : ""}`}
                onClick={() => setPage(it)}
                aria-current={clampedPage === it ? "page" : undefined}
              >
                {it}
              </button>
            )
          )}

          <button
            className="page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
