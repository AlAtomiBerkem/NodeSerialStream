import { useEffect, useRef } from "react";

export const useInactivityRedirect = (onTimeout) => {
  const timerRef = useRef();

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onTimeout();
    }, 120000);
  };

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "touchstart", "click"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [onTimeout]);
};
