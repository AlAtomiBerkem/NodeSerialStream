import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useInactivityRedirect = (onTimeout) => {
  const timerRef = useRef();
  const location = useLocation();

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onTimeout();
    }, 120000); // 120 000
  };

  useEffect(() => {
    if (location.pathname === "/") {
      return;
    }
    const events = ["mousedown", "mousemove", "keydown", "touchstart", "click"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [onTimeout, location.pathname]);
};