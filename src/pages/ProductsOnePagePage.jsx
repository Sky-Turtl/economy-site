import { categories } from "../data/products";
import PlaceholderImage from "../components/PlaceholderImage";
import BrandBadge from "../components/BrandBadge";

export default function ProductsOnePagePage() {
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
    </div>
  );
}
