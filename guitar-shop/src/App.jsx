import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import DetailsPage from "./pages/DetailsPage";
import "./index.css";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<BrandsPage />} />
        <Route path="/brand/:brandId" element={<ModelsPage />} />
        {/* details needs both */}
        <Route
          path="/brand/:brandId/model/:modelId"
          element={<DetailsPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
