import BrandOrModelHero from "../components/BrandOrModelHero";
import { useParams, Link } from "react-router-dom";
import SelectionSection from "../components/SelectionSection";
export default function ModelsPage() {
  const { brandId } = useParams();
  return (
    <>
      <BrandOrModelHero mode="brand" brandId={brandId} />
      <SelectionSection brandId={brandId} />
    </>
  );
}
