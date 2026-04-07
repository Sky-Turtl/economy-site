import { useEffect, useRef, useState } from "react";

const partnerLogos = [
  { name: "Mitsubishi Electric", src: `${import.meta.env.BASE_URL}logos/mitsubishi.svg` },
  { name: "Fujitsu", src: `${import.meta.env.BASE_URL}logos/fujitsu.svg` },
  { name: "York", src: `${import.meta.env.BASE_URL}logos/york.jpg` },
  { name: "Carrier", src: `${import.meta.env.BASE_URL}logos/carrier.svg` },
  { name: "Rheem", src: `${import.meta.env.BASE_URL}logos/rheem.svg` },
  { name: "Sporlan", src: `${import.meta.env.BASE_URL}logos/sporlan.jpg` },
  { name: "Tecumseh", src: `${import.meta.env.BASE_URL}logos/tecumseh.svg` },
  { name: "CT Morley", src: `${import.meta.env.BASE_URL}logos/CTM.png` },
  { name: "Robertshaw", src: `${import.meta.env.BASE_URL}logos/robertshaw.svg` },
  { name: "Embraco", src: `${import.meta.env.BASE_URL}logos/embraco.svg` },
  { name: "Solstice", src: `${import.meta.env.BASE_URL}logos/solstice.svg` },
  { name: "Mueller Streamline", src: `${import.meta.env.BASE_URL}logos/mueller.jpg` },
  { name: "PennBarry", src: `${import.meta.env.BASE_URL}logos/pennbarry.jpg` },
  { name: "Canarm", src: `${import.meta.env.BASE_URL}logos/canarm.jpg` },
];

function LogoCarousel() {
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(0.45);
  const currentSpeedRef = useRef(0.45);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let frameId;

    const animate = () => {
      const track = trackRef.current;
      const firstSet = firstSetRef.current;

      if (!track || !firstSet) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const singleSetWidth = firstSet.offsetWidth;

      currentSpeedRef.current +=
        (speedRef.current - currentSpeedRef.current) * 0.06;

      offsetRef.current += currentSpeedRef.current;

      if (singleSetWidth > 0) {
        offsetRef.current = offsetRef.current % singleSetWidth;
      }

      track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        speedRef.current = 0.225;
      }}
      onMouseLeave={() => {
        speedRef.current = 0.45;
        setHoveredIndex(null);
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
      >
        <div
          ref={firstSetRef}
          className="flex items-center gap-10 pr-10"
        >
          {partnerLogos.map((logo, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={`${logo.name}-first-${index}`}
                className="flex h-32 w-48 shrink-0 items-center justify-center"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`max-h-24 w-full object-contain transition duration-300 ${
                    isHovered ? "grayscale-0 opacity-100" : "grayscale opacity-70"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-10 pr-10">
          {partnerLogos.map((logo, index) => {
            const duplicatedIndex = index + partnerLogos.length;
            const isHovered = hoveredIndex === duplicatedIndex;

            return (
              <div
                key={`${logo.name}-second-${index}`}
                className="flex h-32 w-48 shrink-0 items-center justify-center"
                onMouseEnter={() => setHoveredIndex(duplicatedIndex)}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`max-h-24 w-full object-contain transition duration-300 ${
                    isHovered ? "grayscale-0 opacity-100" : "grayscale opacity-70"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ setPage }) {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="border border-slate-200 bg-white p-8">
          <div className="inline-flex rounded-sm bg-red-50 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
            Economy RHVAC Supply LLC
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Refrigeration and HVAC supply for contractors in New York City.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Economy RHVAC Supply provides refrigeration and HVAC products with a
            fully stocked supply house, knowledgeable salespeople, and
            professional service.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setPage("contact")}
              className="rounded-sm bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
            >
              Contact Us
            </button>
            <button
              onClick={() => setPage("about")}
              className="rounded-sm border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
            Quick Contact
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-400">
                Phone
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                718-661-2180
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-400">
                Email
              </div>
              <div className="mt-1 break-all text-lg font-semibold text-slate-900">
                INFO@ECONOMYRHVAC.COM
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-400">
                Store Hours
              </div>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <div>Monday - Saturday: 7:30 AM - 6:00 PM</div>
                <div>Sunday: 8:00 AM - 3:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Phone and email contact information are available directly on the
            homepage for quick access.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Store Hours</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Open Monday through Saturday from 7:30 AM to 6:00 PM and Sunday
            from 8:00 AM to 3:00 PM.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Privacy</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mobile information and text-message opt-in data are not shared with
            third parties for marketing or promotional purposes.
          </p>
        </div>
      </section>

      <section className="border border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
              Authorized Distributor for Leading Brands
            </div>
          </div>

          <LogoCarousel />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          <div className="bg-slate-50 p-8">
            <div className="text-sm font-semibold tracking-[0.04em] text-[var(--color-primary)]">
              Where to Buy
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Visit Our Location
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Economy RHVAC Supply products are available directly through our
              Flushing, NY location. Whether you're a contractor or homeowner,
              our team can help you find the right equipment and support your
              project.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Visit us in person or contact our team to get assistance with
              product selection, availability, and purchase coordination.
            </p>

            <div className="mt-6 border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-900">
                Economy RHVAC Supply
              </div>
              <div className="mt-2 text-sm leading-7 text-slate-600">
                131-18 Avery Ave
                <br />
                Flushing, NY 11355
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => setPage("contact")}
                className="rounded-sm bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="overflow-hidden bg-white">
            <iframe
              title="Economy RHVAC location map"
              src="https://www.google.com/maps?q=131-18%20Avery%20Ave%2C%20Flushing%2C%20NY%2011355&z=14&output=embed"
              className="h-full min-h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}