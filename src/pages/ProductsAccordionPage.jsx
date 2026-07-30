import { useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";

export default function ProductsAccordionPage() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (key) => {
    setOpenCategory((current) => (current === key ? null : key));
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
          Click a category to expand its items. Other categories stay open too, so you can compare across them.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => {
          const isOpen = openCategory === category.key;

          return (
            <div
              key={category.key}
              className={`border bg-white transition-colors ${
                isOpen
                  ? "border-[var(--color-primary)] sm:col-span-2"
                  : "border-slate-200"
              }`}
            >
              <button
                onClick={() => toggleCategory(category.key)}
                className="flex w-full items-center gap-4 p-5 text-left hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <PlaceholderImage
                  label={category.name}
                  className="h-14 w-14 shrink-0 rounded-lg border border-slate-100"
                />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">
                    {category.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {category.items.length} items
                  </div>
                </div>
                <span
                  className={`text-xl text-slate-400 transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((entry) => (
                    <div
                      key={entry.name}
                      className="border border-slate-200 bg-white p-4"
                    >
                      {entry.logo ? (
                        <div className="flex h-28 w-full items-center justify-center border border-slate-100 p-3">
                          <img
                            src={entry.logo}
                            alt={entry.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <BrandBadge
                          name={entry.name}
                          className="h-28 w-full border border-slate-100"
                        />
                      )}
                      <div className="mt-3 text-sm font-semibold text-slate-900">
                        {entry.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
