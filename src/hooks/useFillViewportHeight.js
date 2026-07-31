import { useEffect, useRef, useState } from "react";

// Measures the distance from the top of the viewport to `ref`'s element and
// returns a height that fills the rest of the screen, so the element (and
// anything above it) never needs the whole page to scroll — only the
// element's own internal overflow does.
export default function useFillViewportHeight({
  minHeight = 320,
  bottomGap = 24,
  breakpoint = 768,
} = {}) {
  const ref = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const isDesktop = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
      if (!isDesktop) {
        setHeight(null);
        return;
      }
      const top = ref.current.getBoundingClientRect().top;
      setHeight(Math.max(minHeight, window.innerHeight - top - bottomGap));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [minHeight, bottomGap, breakpoint]);

  return [ref, height];
}
