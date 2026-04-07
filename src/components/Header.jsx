const hours = {
  Sunday: "8:00 AM - 3:00 PM",
  Monday: "7:30 AM - 6:00 PM",
  Tuesday: "7:30 AM - 6:00 PM",
  Wednesday: "7:30 AM - 6:00 PM",
  Thursday: "7:30 AM - 6:00 PM",
  Friday: "7:30 AM - 6:00 PM",
  Saturday: "7:30 AM - 6:00 PM",
};

const holidayClosures = [
  // { name: "New Year's Day", date: "Jan 1" },
  // { name: "Memorial Day", date: "Last Monday in May" },
  // { name: "Independence Day", date: "July 4" },
];

export default function Header({ page, setPage }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const navItems = [
    { label: "Home", key: "home" },
    { label: "About", key: "about" },
    { label: "Contact Us", key: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="bg-[var(--color-primary)] text-sm text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-2">
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Today's Hours:</span>
            <span>
              {today}: {hours[today]}
            </span>
          </div>

          {holidayClosures.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs opacity-90">
              <span className="font-semibold">Holiday Closures:</span>
              {holidayClosures.map((holiday, index) => (
                <span key={holiday.name}>
                  {holiday.name}
                  {index < holidayClosures.length - 1 && " • "}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)] font-bold text-white">
            E
          </div>
          <div className="text-left">
            <div className="font-semibold">Economy RHVAC Supply</div>
            <div className="text-sm text-slate-500">
              Refrigeration & HVAC Supply
            </div>
          </div>
        </button>

        <nav className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                page === item.key
                  ? "bg-red-50 text-[var(--color-primary)]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}