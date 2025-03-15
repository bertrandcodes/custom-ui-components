"use client";

import { useMemo, useEffect, useState } from "react";
import "./SelectCells.css";

export default function SelectCells() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedArea, setSelectedArea] = useState({
    leftX: null,
    rightX: null,
    topY: null,
    bottomY: null,
  });

  // useEffect(() => {
  //   const screen = document.getElementsByClassName("draggable-area");
  //   screen.addEventListener("onmousedown", () => {
  //     if (!isDragging) {
  //       setIsDragging(true);
  //       console.log("turned on");
  //     }
  //   });
  //   screen.addEventListener("onmouseup", () => {
  //     if (isDragging) {
  //       setIsDragging(false);
  //       console.log("turned off");
  //     }
  //   });
  //   return () => {
  //     screen.removeEventListener();
  //   };
  // }, []);

  return (
    <div className="draggable-area">
      <div className="grid">
        {Array(100)
          .fill()
          .map((_, i) => (
            <div className="cell" key={i}>
              cell
            </div>
          ))}
      </div>
    </div>
  );
}
