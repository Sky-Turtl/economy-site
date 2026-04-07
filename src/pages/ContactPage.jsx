export default function ContactPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* LEFT SIDE */}
      <div className="border border-slate-200 bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">
          Contact
        </div>

        <h1 className="mt-3 text-3xl font-semibold">Contact Us</h1>

        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-900">Phone:</span>{" "}
            <a
              href="tel:17186612180"
              className="text-[var(--color-primary)] font-medium"
            >
              718-661-2180
            </a>
          </p>

          <div>
            <span className="font-semibold text-slate-900">Address:</span>
            <div className="mt-1">
              131-18 Avery Ave, Flushing, NY 11355
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-1">
              Store Hours:
            </div>
            <div>Monday - Saturday: 7:30 AM – 6:00 PM</div>
            <div>Sunday: 8:00 AM – 3:00 PM</div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-1">
              Service Area:
            </div>
            <div>Queens, Brooklyn, Manhattan, Nassau County</div>
          </div>

          <div className="text-slate-700">
            • Same-day service available
            <br />
            • Emergency HVAC service available
          </div>
        </div>

        <a
          href="tel:17186612180"
          className="inline-block mt-6 rounded-sm bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
        >
          Call Now
        </a>

        <div className="mt-8 border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-semibold text-slate-900">
            Privacy Policy
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mobile information will not be shared with third parties or
            affiliates for marketing or promotional purposes. Text messaging
            originator opt-in data and consent are excluded from any third-party
            sharing.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="border border-slate-200 bg-white p-8">
        <h2 className="text-lg font-semibold">Our Location</h2>

        <div className="mt-5">
          <iframe
            title="Business Location"
            src="https://www.google.com/maps?q=131-18+Avery+Ave+Flushing+NY+11355&output=embed"
            className="w-full h-80 border-0"
            loading="lazy"
          />
        </div>

        <div className="mt-6 text-sm text-slate-600">
          Visit our store for parts, service inquiries, or expert advice on HVAC systems.
        </div>

        <a
          href="tel:17186612180"
          className="inline-block mt-6 rounded-sm bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
        >
          Call for Assistance
        </a>
      </div>
    </div>
  );
}