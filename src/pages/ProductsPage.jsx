import { useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const selected = categories.find((c) => c.key === activeCategory);

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setActiveCategory(null)}
          className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]"
        >
          &larr; Back to Categories
        </button>

        <div className="mb-8 flex items-center gap-4">
          <PlaceholderImage
            label={selected.name}
            className="h-16 w-16 rounded-lg border border-slate-200"
          />
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {selected.name}
          </h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selected.items.map((entry) => (
            <div
              key={entry.name}
              className="border border-slate-200 bg-white p-5"
            >
              {entry.logo ? (
                <div className="flex h-32 w-full items-center justify-center border border-slate-100 p-4">
                  <img
                    src={entry.logo}
                    alt={entry.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <BrandBadge
                  name={entry.name}
                  className="h-32 w-full border border-slate-100"
                />
              )}
              <div className="mt-3 text-sm font-semibold text-slate-900">
                {entry.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          Select a category to see the brands and items we carry.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className="flex flex-col items-center gap-4 border border-slate-200 bg-white p-6 text-center hover:border-[var(--color-primary)] hover:shadow-sm"
          >
            <PlaceholderImage
              label={category.name}
              className="h-20 w-20 rounded-lg border border-slate-100"
            />
            <div className="font-semibold text-slate-900">
              {category.name}
            </div>
            <div className="text-xs text-slate-500">
              {category.items.length} items
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
