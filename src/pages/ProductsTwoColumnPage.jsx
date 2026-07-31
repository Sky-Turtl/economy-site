import { useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";
import useFillViewportHeight from "../hooks/useFillViewportHeight";

export default function ProductsTwoColumnPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key ?? null);
  const [rowRef, colHeight] = useFillViewportHeight();

  const selected = categories.find((c) => c.key === activeCategory) ?? categories[0];
  const columnStyle = colHeight ? { height: `${colHeight}px` } : undefined;

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
          Categories and items sit side by side in two equal columns.
        </p>
      </div>

      <div ref={rowRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div style={columnStyle} className="flex flex-col md:overflow-hidden">
          <h2 className="mb-3 shrink-0 text-sm font-semibold uppercase tracking-[0.06em] text-slate-500">
            Categories
          </h2>
          <div className="grid grid-flow-col grid-rows-2 gap-3 min-h-0 overflow-x-auto pb-2 md:grid-flow-row md:grid-cols-2 md:grid-rows-none md:flex-1 md:overflow-y-auto md:overflow-x-visible md:pb-0 md:pr-1">
            {categories.map((category) => {
              const isActive = category.key === selected?.key;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex w-40 shrink-0 items-center gap-4 border p-4 text-left md:w-auto ${
                    isActive
                      ? "border-[var(--color-primary)] bg-red-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <PlaceholderImage
                    label={category.name}
                    className="h-14 w-14 shrink-0 rounded-md border border-slate-100"
                  />
                  <div className="min-w-0">
                    <div
                      className={`truncate text-base font-semibold ${
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
        </div>

        <div style={columnStyle} className="flex min-w-0 flex-col md:overflow-hidden">
          {selected && (
            <>
              <div className="mb-3 flex shrink-0 items-center gap-3">
                <PlaceholderImage
                  label={selected.name}
                  className="h-12 w-12 rounded-lg border border-slate-200"
                />
                <h2 className="text-xl font-semibold text-slate-900">
                  {selected.name}
                </h2>
              </div>

              <div className="min-h-0 md:flex-1 md:overflow-y-auto">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selected.items.map((entry) => (
                    <div
                      key={entry.name}
                      className="border border-slate-200 bg-white p-3"
                    >
                      {entry.logo ? (
                        <div className="flex h-20 w-full items-center justify-center overflow-hidden border border-slate-100 p-1">
                          <img
                            src={entry.logo}
                            alt={entry.name}
                            className="h-full w-full object-contain"
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
