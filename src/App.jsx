import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsSidebarPage from "./pages/ProductsSidebarPage";
import ProductsOnePagePage from "./pages/ProductsOnePagePage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [page, setPage] = useState("home");
  const headerRef = useRef(null);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerEl.offsetHeight}px`
      );
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(headerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header ref={headerRef} page={page} setPage={setPage} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "products" && <ProductsSidebarPage />}
        {page === "products-onepage" && <ProductsOnePagePage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer />
    </div>
  );
}
