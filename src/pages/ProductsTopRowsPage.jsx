import { useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";

export default function ProductsTopRowsPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key ?? null);

  const selected = categories.find((c) => c.key === activeCategory) ?? categories[0];

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
          Pick a category from the two rows above to see its items below.
        </p>
      </div>

      <div className="mb-8 grid grid-flow-col grid-rows-2 gap-3 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((category) => {
          const isActive = category.key === selected?.key;
          return (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`flex w-40 shrink-0 items-center gap-3 border p-3 text-left ${
                isActive
                  ? "border-[var(--color-primary)] bg-red-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <PlaceholderImage
                label={category.name}
                className="h-12 w-12 shrink-0 rounded-md border border-slate-100"
              />
              <div className="min-w-0">
                <div
                  className={`truncate text-sm font-semibold ${
                    isActive ? "text-[var(--color-primary)]" : "text-slate-900"
                  }`}
                >
                  {category.name}
                </div>
                <div className="text-xs text-slate-500">
                  {category.items.length} items
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <>
          <div className="mb-4 flex items-center gap-3">
            <PlaceholderImage
              label={selected.name}
              className="h-12 w-12 rounded-lg border border-slate-200"
            />
            <h2 className="text-xl font-semibold text-slate-900">
              {selected.name}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {selected.items.map((entry) => (
              <div
                key={entry.name}
                className="border border-slate-200 bg-white p-3"
              >
                {entry.logo ? (
                  <div className="flex h-16 w-full items-center justify-center border border-slate-100 p-2">
                    <img
                      src={entry.logo}
                      alt={entry.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <BrandBadge
                    name={entry.name}
                    className="h-16 w-full border border-slate-100"
                  />
                )}
                <div className="mt-2 text-xs font-semibold text-slate-900">
                  {entry.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
