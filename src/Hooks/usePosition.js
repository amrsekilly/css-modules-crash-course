import React, { useRef, useState, useLayoutEffect } from "react";

// Element position
export const usePosition = () => {
  const ref = useRef();
  const [position, setPosition] = useState({});

  const handleResize = () => {
    setPosition(ref.current.getBoundingClientRect());
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref.current]);

  return [ref, position];
};
