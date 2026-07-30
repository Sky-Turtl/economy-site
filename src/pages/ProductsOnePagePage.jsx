import { useEffect, useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";

export default function ProductsOnePagePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">
          Products
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Browse by Category
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Jump to a category below, or scroll through everything on one page.
        </p>
      </div>

      <nav className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-5 border-b border-slate-200 pb-8">
        {categories.map((category) => (
          <a
            key={category.key}
            href={`#${category.key}`}
            className="flex w-20 flex-col items-center gap-2 text-center"
          >
            <PlaceholderImage
              label={category.name}
              className="h-14 w-14 rounded-lg border border-slate-100"
            />
            <span className="text-xs font-medium leading-tight text-slate-700">
              {category.name}
            </span>
          </a>
        ))}
      </nav>

      <div className="flex flex-col">
        {categories.map((category, index) => (
          <section
            key={category.key}
            id={category.key}
            className="scroll-mt-24 py-10 first:pt-0"
          >
            <div className="mb-6 flex items-center gap-4">
              <PlaceholderImage
                label={category.name}
                className="h-14 w-14 rounded-lg border border-slate-200"
              />
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                {category.name}
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {category.items.map((entry) => (
                <div
                  key={entry.name}
                  className="border border-slate-200 bg-white p-3"
                >
                  {entry.logo ? (
                    <div className="flex h-20 w-full items-center justify-center border border-slate-100 p-2">
                      <img
                        src={entry.logo}
                        alt={entry.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <BrandBadge
                      name={entry.name}
                      className="h-20 w-full border border-slate-100"
                    />
                  )}
                  <div className="mt-2 text-xs font-semibold text-slate-900">
                    {entry.name}
                  </div>
                </div>
              ))}
            </div>

            {index < categories.length - 1 && (
              <hr className="mt-10 border-t border-slate-200" />
            )}
          </section>
        ))}
      </div>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition hover:opacity-90"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
