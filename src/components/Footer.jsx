export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <div className="font-semibold text-slate-900">
            Economy RHVAC Supply
          </div>
          <div className="mt-3 text-sm leading-7 text-slate-600">
            131-10 Avery Ave
            <br />
            Flushing, NY 11355
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.04em] text-slate-500">
            Contact
          </div>
          <div className="mt-3 text-sm leading-7 text-slate-600">
            <a
              href="tel:17186612180"
              className="text-[var(--color-primary)] font-medium"
            >
              Call/Text: 718-661-2180
            </a>
            <br />
            <a href="mailto:INFO@ECONOMYRHVAC.COM" className="break-all">
              INFO@ECONOMYRHVAC.COM
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.04em] text-slate-500">
            Store Hours
          </div>
          <div className="mt-3 text-sm leading-7 text-slate-600">
            <div>Monday - Saturday: 7:30 AM - 6:00 PM</div>
            <div>Sunday: 8:00 AM - 3:00 PM</div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {year} Economy RHVAC Supply. All rights reserved.
      </div>
    </footer>
  );
}
