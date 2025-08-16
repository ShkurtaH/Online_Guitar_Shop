import { useQuery } from "@apollo/client";
import SplitHero from "./SplitHero";
import { GET_BRAND, GET_MODEL } from "../api/queries";

export default function BrandOrModelHero({
  mode,
  brandId,
  modelId,
  heading,
  accent,
  subtext,
  showBack = true,
}) {
  const isBrand = mode === "brand";

  const { data, loading, error } = useQuery(isBrand ? GET_BRAND : GET_MODEL, {
    variables: isBrand ? { id: brandId } : { brandId, modelId },
    skip: !brandId || (!isBrand && !modelId),
  });

  if (loading) return <div style={{ height: 340 }} />; // simple spacer skeleton
  if (error) return null;

  const brand = isBrand ? data?.findUniqueBrand : null;
  const model = !isBrand ? data?.findUniqueModel : null;

  // Defaults if you don’t pass heading/subtext
  const computedHeading =
    heading ?? (isBrand ? "Play like a Rock star" : model?.name || "");
  const computedAccent = accent ?? (isBrand ? "Rock star" : "");
  const computedSubtext =
    subtext ??
    (isBrand
      ? `With a legacy dating back to the 1950s, ${
          brand?.name || "our brands"
        } blend expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance.`
      : model?.description || "");

  return (
    <SplitHero
      heading={computedHeading}
      accent={computedAccent}
      subtext={computedSubtext}
      rightType={isBrand ? "brand" : "image"}
      brandName={brand?.name}
      brandLogo={brand?.image}
      imageUrl={model?.image}
      showBack={showBack}
    />
  );
}
