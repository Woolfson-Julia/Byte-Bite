import { useState, useEffect } from "react";

export const useIsMobileOrTablet = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileOrTablet;
};
