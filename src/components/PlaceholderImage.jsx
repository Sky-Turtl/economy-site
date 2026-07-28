export default function PlaceholderImage({ label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}
      aria-label={`${label} placeholder image`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-1/3 w-1/3"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}
