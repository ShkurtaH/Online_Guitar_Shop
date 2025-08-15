import { useQuery } from "@apollo/client";
import { GET_BRAND_MODELS, SEARCH_MODELS } from "../api/queries";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 12;

export default function ModelsPage() {
  const { brandId } = useParams();
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [type, setType] = useState(""); // client filter
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const useSearch = search.trim().length > 0;

  const baseQuery = useQuery(GET_BRAND_MODELS, {
    variables: {
      id: brandId,
      sortBy: { field: sortField, order: sortOrder },
    },
    skip: useSearch,
    notifyOnNetworkStatusChange: true,
  });

  const searchQuery = useQuery(SEARCH_MODELS, {
    variables: { brandId: String(brandId), name: search.trim() || " " },
    skip: !useSearch,
    notifyOnNetworkStatusChange: true,
  });

  const active = useSearch ? searchQuery : baseQuery;
  const loading = active.loading && !active.data;
  const error = active.error;

  // Normalize data array
  const rawModels =
    active.data?.findBrandModels || active.data?.searchModels || [];

  // Apply client-side type filter + (when searching) client-side sort to match UX
  const filtered = useMemo(() => {
    let out = rawModels;
    if (type) out = out.filter((m) => (m.type || "").toLowerCase() === type);
    if (useSearch) {
      out = [...out].sort((a, b) => {
        const dir = sortOrder === "ASC" ? 1 : -1;
        if (sortField === "price")
          return ((a.price ?? 0) - (b.price ?? 0)) * dir;
        if (sortField === "type")
          return String(a.type || "").localeCompare(String(b.type || "")) * dir;
        return String(a.name || "").localeCompare(String(b.name || "")) * dir; // default name
      });
    }
    return out;
  }, [rawModels, type, useSearch, sortField, sortOrder]);

  // Reset “load more” when inputs change
  useEffect(() => setVisible(PAGE_SIZE), [search, type, sortField, sortOrder]);

  const models = filtered.slice(0, visible);
  const canLoadMore = filtered.length > visible;

  if (loading) return <p className="state">{t("loading")}</p>;
  if (error) return <p className="state error">{t("error")}</p>;

  return (
    <section className="models">
      <h2 className="sub">{t("checkSelection")}</h2>

      <div className="filters">
        {/* Type (client-only) */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label={t("filterByType")}
        >
          <option value="">{t("filterByType")}</option>
          <option value="electric">Electric</option>
          <option value="acoustic">Acoustic</option>
          <option value="bass">Bass</option>
        </select>

        {/* Search (server) */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchByName")}
        />

        {/* Sort — server for base list, client for search results */}
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          aria-label="Sort field"
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="price">Price</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort order"
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      <div className="grid products-grid">
        {models.map((m) => (
          <Link
            key={m.id}
            to={`/brand/${brandId}/model/${m.id}`}
            className="product-card"
          >
            {m.image && <img src={m.image} alt={m.name} />}
            <div className="product-meta">
              <h4>{m.name}</h4>
              {m.price != null && <p>${Number(m.price).toLocaleString()}</p>}
              {m.type && <small>{m.type}</small>}
            </div>
          </Link>
        ))}
      </div>

      <div className="pager">
        <span>
          {t("showing")} {models.length} {t("of")} {filtered.length}{" "}
          {t("results")}
        </span>
        {canLoadMore && (
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            disabled={active.loading}
          >
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
