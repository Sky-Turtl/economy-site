import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header page={page} setPage={setPage} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {page === "home" && <HomePage />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>
    </div>
  );
}