import { gql } from "@apollo/client";

/** Page 1 — Brands */
export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      image
      origin
      categories
    }
  }
`;

/** Page 2 — Models (list for a brand; server requires sortBy) */
export const GET_BRAND_MODELS = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

/** Page 2 — Search (server requires both brandId and name) */
export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

/** Page 3 — Details (server requires brandId + modelId) */
export const GET_MODEL = gql`
  query GetModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
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
  }
`;
