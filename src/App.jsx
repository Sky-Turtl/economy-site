import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsSidebarPage from "./pages/ProductsSidebarPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header page={page} setPage={setPage} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "products" && <ProductsSidebarPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer />
    </div>
  );
}
