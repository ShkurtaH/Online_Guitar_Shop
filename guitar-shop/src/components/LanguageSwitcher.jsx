import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const change = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };
  return (
    <div className="lang">
      <span>{t("language")}:</span>
      <button
        onClick={() => change("en")}
        className={i18n.language === "en" ? "active" : ""}
      >
        EN
      </button>
      <button
        onClick={() => change("sq")}
        className={i18n.language === "sq" ? "active" : ""}
      >
        SQ
      </button>
    </div>
  );
}
