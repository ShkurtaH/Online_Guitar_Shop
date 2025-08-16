// src/api/queries.js
import { gql } from "@apollo/client";

/* ---------- Fragments (avoid repetition) ---------- */
export const BRAND_CORE = gql`
  fragment BrandCore on Brand {
    id
    name
    image
    origin
    categories
  }
`;

export const MODEL_CARD = gql`
  fragment ModelCard on Model {
    id
    name
    type
    image
    price
    description
  }
`;

export const MODEL_FULL = gql`
  ${MODEL_CARD}
  fragment ModelFull on Model {
    ...ModelCard
    specs {
      bodyWood
      neckWood
      fingerboardWood
      pickups
      tuners
      scaleLength
      bridge
    }
    musicians {
      name
      musicianImage
      bands
    }
  }
`;

/* ---------- Queries used across pages ---------- */

// Page 1 — list all brands (for “Featuring the Best Brands”, etc.)
export const GET_BRANDS = gql`
  ${BRAND_CORE}
  query GetBrands {
    findAllBrands {
      ...BrandCore
    }
  }
`;

// Page 2 — single brand (for SplitHero on brand page)
export const GET_BRAND = gql`
  ${BRAND_CORE}
  query GetBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      ...BrandCore
    }
  }
`;

// Page 2 — brand models (server requires sortBy)
export const GET_BRAND_MODELS = gql`
  ${MODEL_CARD}
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      ...ModelCard
    }
  }
`;

// Page 2 — search models (brandId + name are required by API)
export const SEARCH_MODELS = gql`
  ${MODEL_CARD}
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      ...ModelCard
    }
  }
`;

// Page 3 — model details (needs brandId + modelId)
export const GET_MODEL = gql`
  ${MODEL_FULL}
  query GetModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      ...ModelFull
    }
  }
`;

/* ---------- Handy defaults ---------- */
export const DEFAULT_SORT = { field: "name", order: "ASC" }; // ModelSortField.name / SortOrder.ASC
