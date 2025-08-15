import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Footer from "../components/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="shell">
      <main>{children}</main>

      <Footer />
    </div>
  );
}
