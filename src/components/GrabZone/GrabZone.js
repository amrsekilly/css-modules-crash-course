import React, { useEffect, useState } from "react";
import { useHover } from "../../Hooks/useHover";
import { Grabber } from "../Grabber/Grabber";
import styles from "./styles.module.scss";
console.log("grabZone: styles", styles);

// GrabZone (The hover trigger zone)
export const GrabZone = ({ cursorGrabbed, gameOver, onCursorGrabbed }) => {
  const [outerRef, outerHovered] = useHover();
  const [innerRef, innerHovered] = useHover();
  const [isExtended, setExtendedArm] = useState(false);

  let state = "waiting";
  if (outerHovered) {
    state = "stalking";
  }
  if (innerHovered) {
    state = "grabbing";
  }
  if (cursorGrabbed) {
    state = "grabbed";
  }
  if (gameOver) {
    state = "shaka";
  }

  // If state is grabbing for a long time, they're being clever!
  useEffect(() => {
    let timer;
    if (state === "grabbing") {
      timer = setTimeout(() => {
        // Not so clever now, are they?
        setExtendedArm(true);
        timer = null;
      }, 2000);
    }
    return () => {
      setExtendedArm(false);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [state]);

  return (
    <div className={styles["grab-zone"]} ref={outerRef}>
      <div className={styles["grab-zone__debug"]}>
        <strong>Debug info:</strong>
        <p>Current state: {state}</p>
        <p>Extended arm: {isExtended ? "Yes" : "No"}</p>
      </div>
      <div className={styles["grab-zone__danger"]} ref={innerRef}>
        <Grabber
          state={state}
          gameOver={gameOver}
          extended={isExtended}
          onCursorGrabbed={onCursorGrabbed}
        />
      </div>
    </div>
  );
};
