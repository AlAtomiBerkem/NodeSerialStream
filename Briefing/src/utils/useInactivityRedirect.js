import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const useInactivityRedirect = (onTimeout) => {
  const timerRef = useRef();
  const onTimeoutRef = useRef(onTimeout);
  const location = useLocation();

  // Обновляем ref при изменении onTimeout
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onTimeoutRef.current();
    }, 120000);
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
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [location.pathname]);
};