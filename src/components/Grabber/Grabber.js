import React from "react";
import { useMousePosition } from "../../Hooks/useMousePosition";
import { usePosition } from "../../Hooks/usePosition";
import { ASSETS } from "../../configs/configs";
import styles from "./styles.module.scss";
console.log("TCL: grabber styles", styles);

// Grabber (The graphic)
export const Grabber = ({ state, gameOver, extended, onCursorGrabbed }) => {
  const mousePos = useMousePosition();
  const [ref, position] = usePosition();

  // Calculate rotation of armWrapper
  const x = position.left + position.width * 0.5;
  const y = position.top + position.height * 0.5;
  const angle = gameOver
    ? 0
    : Math.atan2(mousePos.x - x, -(mousePos.y - y)) * (180 / Math.PI);

  // Ensure value is within acceptable range (-75 to 75)
  const rotation = Math.min(Math.max(parseInt(angle), -79), 79);

  const grabberClass = `grabber grabber--${state} ${extended &&
    "grabber--extended"}`;
  const wrapperStyle = { transform: `rotate(${rotation}deg)` };

  let handImageSrc = ASSETS[state];

  return (
    <div className={grabberClass}>
      <div className={styles["grabber__body"]}></div>
      <img className={styles["grabber__face"]} src={ASSETS.head} />
      <div
        className={styles["grabber__arm-wrapper"]}
        ref={ref}
        style={wrapperStyle}
      >
        <div className={styles["grabber__arm"]}>
          <img
            className={styles["grabber__hand"]}
            src={handImageSrc}
            onMouseEnter={onCursorGrabbed}
          />
        </div>
      </div>
    </div>
  );
};
