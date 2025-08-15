import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      backToHome: "Back To Home",
      browseBrands: "Browse top quality Guitars online",
      featuring: "Featuring the Best Brands",
      checkSelection: "Check out the Selection",
      filterByType: "Filter by type",
      searchByName: "Search by name",
      loading: "Loading...",
      error: "Something went wrong.",
      specs: "Specification",
      whoPlaysIt: "Who plays it?",
      showing: "Showing",
      of: "of",
      results: "results",
      language: "Language"
    }
  },
  sq: {
    translation: {
      backToHome: "Kthehu në Faqe",
      browseBrands: "Shfleto kitarat më cilësore online",
      featuring: "Markat më të mira",
      checkSelection: "Shiko Përzgjedhjen",
      filterByType: "Filtro sipas llojit",
      searchByName: "Kërko sipas emrit",
      loading: "Duke u ngarkuar...",
      error: "Diçka shkoi keq.",
      specs: "Specifikimet",
      whoPlaysIt: "Kush e luan?",
      showing: "Duke shfaqur",
      of: "nga",
      results: "rezultate",
      language: "Gjuha"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
