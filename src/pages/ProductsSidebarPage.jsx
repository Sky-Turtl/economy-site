import { useState } from "react";
import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";
import useFillViewportHeight from "../hooks/useFillViewportHeight";

export default function ProductsSidebarPage() {
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
          Pick a category on the left to see its items on the right.
        </p>
      </div>

      <div ref={rowRef} className="flex flex-col gap-6 md:flex-row md:items-start">
        <nav
          style={columnStyle}
          className="flex gap-2 overflow-x-auto md:w-72 md:shrink-0 md:flex-col md:overflow-y-auto md:overflow-x-visible"
        >
          {categories.map((category) => {
            const isActive = category.key === selected?.key;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex shrink-0 items-center gap-4 border p-4 text-left md:shrink ${
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
        </nav>

        <div
          style={columnStyle}
          className="flex min-w-0 flex-1 flex-col md:overflow-hidden"
        >
          {selected && (
            <>
              <div className="mb-4 flex shrink-0 items-center gap-3">
                <PlaceholderImage
                  label={selected.name}
                  className="h-12 w-12 rounded-lg border border-slate-200"
                />
                <h2 className="text-xl font-semibold text-slate-900">
                  {selected.name}
                </h2>
              </div>

              <div className="min-h-0 md:flex-1 md:overflow-y-auto">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
                  {selected.items.map((entry) => (
                    <div
                      key={entry.name}
                      className="min-w-[9rem] border border-slate-200 bg-white p-3"
                    >
                      {entry.logo ? (
                        <div className="flex h-20 min-h-20 w-full items-center justify-center overflow-hidden border border-slate-100 p-1">
                          <img
                            src={entry.logo}
                            alt={entry.name}
                            className="h-full w-full scale-125 object-contain"
                          />
                        </div>
                      ) : (
                        <BrandBadge
                          name={entry.name}
                          className="h-20 min-h-20 w-full overflow-hidden border border-slate-100"
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
