export default function BrandBadge({ name, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-50 px-3 text-center ${className}`}
    >
      <span className="line-clamp-3 text-sm font-bold uppercase tracking-wide text-slate-500 sm:text-base">
        {name}
      </span>
    </div>
  );
}
