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
  const desktopTrackRef = useRef(null);
  const desktopFirstSetRef = useRef(null);
  const desktopOffsetRef = useRef(0);
  const desktopSpeedRef = useRef(0.45);
  const desktopCurrentSpeedRef = useRef(0.45);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const mobileViewportRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const mobileFirstSetRef = useRef(null);
  const mobileOffsetRef = useRef(0);
  const mobileCurrentVelocityRef = useRef(0.45);
  const mobileTargetVelocityRef = useRef(0.45);
  const mobilePausedRef = useRef(false);
  const mobileLogoRefs = useRef([]);
  const [mobileVisibleMap, setMobileVisibleMap] = useState({});

  const pointerDownRef = useRef(false);
  const holdTimeoutRef = useRef(null);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const movedRef = useRef(false);

  const MOBILE_BASE_SPEED = 0.45;
  const MOBILE_MAX_SPEED = 2.2;
  const MOBILE_MIN_SPEED = -1.6;
  const HOLD_DELAY = 180;
  const DRAG_MULTIPLIER = 0.035;
  const VELOCITY_BLEND = 0.35;
  const DECAY_TO_BASE = 0.025;
  const MOBILE_VISIBILITY_THRESHOLD = 0.5;

  useEffect(() => {
    let desktopFrameId;
    let mobileFrameId;

    const updateMobileVisibility = () => {
      const viewport = mobileViewportRef.current;
      if (!viewport) return;

      const viewportRect = viewport.getBoundingClientRect();

      const centerLeft =
        viewportRect.left + viewportRect.width * 0.25;
      const centerRight =
        viewportRect.left + viewportRect.width * 0.75;

      const nextMap = {};

      mobileLogoRefs.current.forEach((el, index) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();

        const overlapWidth =
          Math.min(rect.right, centerRight) -
          Math.max(rect.left, centerLeft);

        const visibleInCenterRatio =
          Math.max(0, overlapWidth) / Math.max(rect.width, 1);

        nextMap[index] = visibleInCenterRatio > 0.5;
      });

      setMobileVisibleMap((prev) => {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(nextMap);

        if (prevKeys.length !== nextKeys.length) return nextMap;

        for (const key of nextKeys) {
          if (prev[key] !== nextMap[key]) return nextMap;
        }

        return prev;
      });
    };

    const animateDesktop = () => {
      const track = desktopTrackRef.current;
      const firstSet = desktopFirstSetRef.current;

      if (!track || !firstSet) {
        desktopFrameId = requestAnimationFrame(animateDesktop);
        return;
      }

      const singleSetWidth = firstSet.offsetWidth;

      desktopCurrentSpeedRef.current +=
        (desktopSpeedRef.current - desktopCurrentSpeedRef.current) * 0.06;

      desktopOffsetRef.current += desktopCurrentSpeedRef.current;

      if (singleSetWidth > 0) {
        desktopOffsetRef.current =
          ((desktopOffsetRef.current % singleSetWidth) + singleSetWidth) %
          singleSetWidth;
      }

      track.style.transform = `translate3d(-${desktopOffsetRef.current}px, 0, 0)`;
      desktopFrameId = requestAnimationFrame(animateDesktop);
    };

    const animateMobile = () => {
      const track = mobileTrackRef.current;
      const firstSet = mobileFirstSetRef.current;

      if (!track || !firstSet) {
        mobileFrameId = requestAnimationFrame(animateMobile);
        return;
      }

      const singleSetWidth = firstSet.offsetWidth;

      if (!mobilePausedRef.current) {
        mobileTargetVelocityRef.current +=
          (MOBILE_BASE_SPEED - mobileTargetVelocityRef.current) * DECAY_TO_BASE;

        mobileCurrentVelocityRef.current +=
          (mobileTargetVelocityRef.current - mobileCurrentVelocityRef.current) *
          0.08;

        mobileOffsetRef.current += mobileCurrentVelocityRef.current;
      }

      if (singleSetWidth > 0) {
        mobileOffsetRef.current =
          ((mobileOffsetRef.current % singleSetWidth) + singleSetWidth) %
          singleSetWidth;
      }

      track.style.transform = `translate3d(-${mobileOffsetRef.current}px, 0, 0)`;

      updateMobileVisibility();
      mobileFrameId = requestAnimationFrame(animateMobile);
    };

    desktopFrameId = requestAnimationFrame(animateDesktop);
    mobileFrameId = requestAnimationFrame(animateMobile);

    const handleResize = () => updateMobileVisibility();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(desktopFrameId);
      cancelAnimationFrame(mobileFrameId);
      window.removeEventListener("resize", handleResize);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
    };
  }, []);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const clearHoldTimeout = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const handleMobilePointerDown = (e) => {
    pointerDownRef.current = true;
    movedRef.current = false;
    mobilePausedRef.current = false;

    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();

    clearHoldTimeout();
    holdTimeoutRef.current = setTimeout(() => {
      if (pointerDownRef.current && !movedRef.current) {
        mobilePausedRef.current = true;
      }
    }, HOLD_DELAY);
  };

  const handleMobilePointerMove = (e) => {
    if (!pointerDownRef.current) return;

    const now = performance.now();
    const currentX = e.clientX;
    const dx = currentX - lastXRef.current;
    const totalDx = currentX - startXRef.current;
    const dt = Math.max(now - lastTimeRef.current, 1);

    if (Math.abs(totalDx) > 4) {
      movedRef.current = true;
      clearHoldTimeout();
      mobilePausedRef.current = false;
    }

    if (movedRef.current) {
      mobileOffsetRef.current -= dx;

      const swipeVelocity = (-dx / dt) * 16 * DRAG_MULTIPLIER * 10;
      const nextTarget =
        mobileTargetVelocityRef.current * (1 - VELOCITY_BLEND) +
        swipeVelocity * VELOCITY_BLEND;

      mobileTargetVelocityRef.current = clamp(
        nextTarget,
        MOBILE_MIN_SPEED,
        MOBILE_MAX_SPEED
      );
    }

    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handleMobilePointerUp = () => {
    pointerDownRef.current = false;
    clearHoldTimeout();
    mobilePausedRef.current = false;
  };

  const handleMobilePointerCancel = () => {
    pointerDownRef.current = false;
    clearHoldTimeout();
    mobilePausedRef.current = false;
  };

  return (
    <>
      <div
        ref={mobileViewportRef}
        className="overflow-hidden md:hidden"
        onPointerDown={handleMobilePointerDown}
        onPointerMove={handleMobilePointerMove}
        onPointerUp={handleMobilePointerUp}
        onPointerCancel={handleMobilePointerCancel}
        onPointerLeave={handleMobilePointerCancel}
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={mobileTrackRef}
          className="flex w-max items-center will-change-transform select-none"
        >
          <div ref={mobileFirstSetRef} className="flex items-center gap-6 pr-6">
            {partnerLogos.map((logo, index) => (
              <div
                key={`${logo.name}-mobile-first-${index}`}
                ref={(el) => {
                  mobileLogoRefs.current[index] = el;
                }}
                className="flex h-28 w-40 shrink-0 items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  draggable={false}
                  className={`max-h-20 w-full object-contain transition duration-600 ${
                    mobileVisibleMap[index]
                      ? "grayscale-0 opacity-100"
                      : "grayscale opacity-60"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 pr-6">
            {partnerLogos.map((logo, index) => {
              const duplicateIndex = index + partnerLogos.length;

              return (
                <div
                  key={`${logo.name}-mobile-second-${index}`}
                  ref={(el) => {
                    mobileLogoRefs.current[duplicateIndex] = el;
                  }}
                  className="flex h-28 w-40 shrink-0 items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    draggable={false}
                    className={`max-h-20 w-full object-contain transition duration-300 ${
                      mobileVisibleMap[duplicateIndex]
                        ? "grayscale-0 opacity-100"
                        : "grayscale opacity-60"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="hidden overflow-hidden md:block"
        onMouseEnter={() => {
          desktopSpeedRef.current = 0.225;
        }}
        onMouseLeave={() => {
          desktopSpeedRef.current = 0.45;
          setHoveredIndex(null);
        }}
      >
        <div
          ref={desktopTrackRef}
          className="flex w-max items-center will-change-transform"
        >
          <div
            ref={desktopFirstSetRef}
            className="flex items-center gap-10 pr-10"
          >
            {partnerLogos.map((logo, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={`${logo.name}-first-${index}`}
                  className="flex h-32 w-48 shrink-0 items-center justify-center"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
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
                  onMouseEnter={() => {
                    setHoveredIndex(duplicatedIndex);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
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
    </>
  );
}

export default LogoCarousel;