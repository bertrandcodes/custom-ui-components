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

  /*
    States:
    - 100 cells: each with a state {
      selected: true/false
    }
    - selection box coordinates: {
      topY,
      topY,
      bottomX,
      bottomY
    }
    - isDragging: true/false

    Actions: 
    - mouseDown - createSelectionBox
      - turn isDragging true
      - update coordinates if isDragging is true
      - change selected state of cells
    - mouseUp - isDragging to false
    - unselectAllCells - happens when we click randomly - resets all cells

    Question:
    - how does a cell know that a selection box is created over it?
      1. useEffect that changes when select box is changing to change the state of each cell
      2. have the cell listen at all times for the select box... not sure how we can accomplish this?
      3. when we change select box coordinates, iterate through the cells and change the ones that are within it? Sounds like an awful lot of calculations...
    
    Notes:
    - I should have used a set to store cells that are selected
    - It's okay to loop over all cells and check them on all mouse overs... that's not dramatically expensive to compute
    - There is mousedown, mouseover, and mouseup... I didn't consider that the coordinates change dynamically when I drag, so I really just need to keep track of the drag origin
    - I can create the select box by creating an element with CSS dynamically
  */

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
