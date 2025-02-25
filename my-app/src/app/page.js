// Rename from Home...

"use client"

import { useState } from "react";

// start with 2 default lists

// clicking checkbox will set that checked state to true
// we will use javascript map
// function for switching sides
// we go through the list where items are leaving
// if checked, add to the other map
// delete item from current map

// how do we get the 2/4 number?
// we can store separately, but that can get out of sync
// need to just have a function that tells us num selected

// on clicking checkbox, if some are highlighted, highlight res. else, unhighlight all

// button disabled state has to do with num selected

// input creates a new item, prevent duplicate

const LEFT_DEFAULTS = ["HTML", "JavaScript", "CSS", "TypeScript"]
const RIGHT_DEFAULTS = ["React", "Angular", "Vue", "Svelte"]
const LEFT_SIDE = "left"
const RIGHT_SIDE = "right"

const createListContent = (defaults) => defaults.map(el => (
  [el, false]))

export default function Home() {
  const [leftList, setLeftList] = useState(new Map(createListContent(LEFT_DEFAULTS)))
  const [rightList, setRightList] = useState(new Map(createListContent(RIGHT_DEFAULTS)))

  function toggleCheck(side, list, item) {
    const obj = Object.fromEntries(list)
    obj[item] = !obj[item]
    switch (side) {
      case LEFT_SIDE:
        setLeftList(new Map(Object.entries(obj)))
        break
      case RIGHT_SIDE:
        setRightList(new Map(Object.entries(obj)))
        break
    }
  }

  function updateSide(side, list, otherList) {
    const map = new Map(list)
    const otherMap = new Map(otherList)

    map.forEach((value, key) => {
      if (value === true) {
        otherMap.set(key, value)
        map.delete(key)
      }
    })

    switch (side) {
      case LEFT_SIDE:
        setLeftList(map)
        setRightList(otherMap)
        break
      case RIGHT_SIDE:
        setLeftList(otherMap)
        setRightList(map)
        break
    }
  }

  return (
    <div className="main-container">
      <div className="left-container">
        {/* make this into it's own component, we don't want the top level component to be concerned with mapping */}
        <ul>
          {Array.from(leftList).map(([el, isChecked]) => (
            <ListItem key={el} name={el} isChecked={isChecked} toggleCheck={() => toggleCheck(LEFT_SIDE, leftList, el)} />
          ))}
        </ul>
      </div>
      <br />
      <div className="button-container">
        <button onClick={() => updateSide(LEFT_SIDE, leftList, rightList)} className="button">{">"}</button>
        <button onClick={() => updateSide(RIGHT_SIDE, rightList, leftList)} className="button">{"<"}</button>
      </div>
      <br />
      <div className="right-container">
        <ul>
          {Array.from(rightList).map(([el, isChecked]) => (
            <ListItem key={el} name={el} isChecked={isChecked} toggleCheck={() => toggleCheck(RIGHT_SIDE, rightList, el)} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ListItem({ name, isChecked, toggleCheck }) {
  return (
    <li>
      <input type="checkbox" className="checkbox" checked={isChecked} onChange={toggleCheck} />
      <span>{name}</span>
    </li>
  )
}

// const itemList = {
//   "HTML": {
//     onLeft: true,
//   },
//   "JavaScript": {
//     onLeft: true,
//   },
//   "CSS": {
//     onLeft: true,
//   },
//   "TypeScript": {
//     onLeft: true,
//   },
//   "React": {
//     onLeft: false,
//   },
//   "Angular": {
//     onLeft: false,
//   },
//   "Vue": {
//     onLeft: false,
//   },
//   "Svelte": {
//     onLeft: false,
//   },
// }

// export default function Home() {
//   const [items, setItems] = useState(itemList)
//   const [selectedItems, setSelectedItems] = useState(new Set())

//   const switchSides = (target) => {
//     const switchToLeft = target === "left"
//     const newObj = { ...items }
//     Object.keys(newObj).forEach(item => items[item].onLeft = switchToLeft)
//     setItems(newObj)
//   }

//   const updateSelected = (name) => {
//     const newSet = new Set(selectedItems)
//     if (newSet.has(name)) {
//       newSet.delete(name)
//     } else {
//       newSet.add(name)
//     }
//     setSelectedItems(newSet)
//   }

//   const swap = (target) => {
//     const switchToLeft = target === "left"
//     const newObj = { ...items }
//     const newSet = new Set(selectedItems)

//     Array.from(selectedItems).forEach(item => {
//       if ((switchToLeft && !items[item].onLeft) || (!switchToLeft && items[item].onLeft)) {
//         newSet.delete(item)
//       }
//       if (switchToLeft) {
//         newObj[item].onLeft = true
//       } else {
//         newObj[item].onLeft = false
//       }
//     })
//     setSelectedItems(newSet)
//     setItems(newObj)
//   }

//   return (
//     <div className="main-container">
//       {console.log(selectedItems, 'selected')}
//       <div className="left-container">
//         <ul>
//           {Object.keys(items).filter((itemKey) => items[itemKey].onLeft).map((name) => (
//             <ListItem name={name} key={name} isSelected={selectedItems.has(name)} updateSelected={updateSelected} />
//           ))}
//         </ul>
//       </div>
//       <br />
//       <div className="button-container">
//         <button onClick={() => switchSides("right")} className="button">{">>"}</button>
//         <button onClick={() => swap("right")} className="button">{">"}</button>
//         <button onClick={() => swap("left")} className="button">{"<"}</button>
//         <button onClick={() => switchSides("left")} className="button">{"<<"}</button>
//       </div>
//       <br />
//       <div className="right-container">
//         <ul>
//           {Object.keys(items).filter((itemKey) => !items[itemKey].onLeft).map((name) => (
//             <ListItem name={name} key={name} isSelected={selectedItems.has(name)} updateSelected={updateSelected} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function ListItem({ name, isSelected, updateSelected }) {
//   return (
//     <li>
//       <input type="checkbox" className="checkbox" checked={isSelected} onChange={() => { updateSelected(name) }} />
//       <span>{name}</span>
//     </li>
//   )
// }