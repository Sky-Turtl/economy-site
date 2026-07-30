import { useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";

export default function ProductsSidebarPage() {
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
          Pick a category on the left to see its items on the right.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <nav
          className="flex gap-2 overflow-x-auto md:sticky md:w-64 md:shrink-0 md:flex-col md:overflow-y-auto md:overflow-x-visible"
          style={{
            top: "calc(var(--header-height, 6rem) + 1rem)",
            maxHeight: "calc(100vh - var(--header-height, 6rem) - 2rem)",
          }}
        >
          {categories.map((category) => {
            const isActive = category.key === selected?.key;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex shrink-0 items-center gap-3 border p-3 text-left md:shrink ${
                  isActive
                    ? "border-[var(--color-primary)] bg-red-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <PlaceholderImage
                  label={category.name}
                  className="h-10 w-10 shrink-0 rounded-md border border-slate-100"
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
        </nav>

        <div className="min-w-0 flex-1">
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

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {selected.items.map((entry) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
