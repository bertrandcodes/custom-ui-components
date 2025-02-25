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


const itemList = {
  "HTML": {
    onLeft: true,
  },
  "JavaScript": {
    onLeft: true,
  },
  "CSS": {
    onLeft: true,
  },
  "TypeScript": {
    onLeft: true,
  },
  "React": {
    onLeft: false,
  },
  "Angular": {
    onLeft: false,
  },
  "Vue": {
    onLeft: false,
  },
  "Svelte": {
    onLeft: false,
  },
}

export default function Home() {
  const [items, setItems] = useState(itemList)
  const [selectedItems, setSelectedItems] = useState(new Set())

  const switchSides = (target) => {
    const switchToLeft = target === "left"
    const newObj = { ...items }
    Object.keys(newObj).forEach(item => items[item].onLeft = switchToLeft)
    setItems(newObj)
  }

  const updateSelected = (name) => {
    const newSet = new Set(selectedItems)
    if (newSet.has(name)) {
      newSet.delete(name)
    } else {
      newSet.add(name)
    }
    setSelectedItems(newSet)
  }

  const swap = (target) => {
    const switchToLeft = target === "left"
    const newObj = { ...items }
    const newSet = new Set(selectedItems)

    Array.from(selectedItems).forEach(item => {
      if ((switchToLeft && !items[item].onLeft) || (!switchToLeft && items[item].onLeft)) {
        newSet.delete(item)
      }
      if (switchToLeft) {
        newObj[item].onLeft = true
      } else {
        newObj[item].onLeft = false
      }
    })
    setSelectedItems(newSet)
    setItems(newObj)
  }

  return (
    <div className="main-container">
      {console.log(selectedItems, 'selected')}
      <div className="left-container">
        <ul>
          {Object.keys(items).filter((itemKey) => items[itemKey].onLeft).map((name) => (
            <ListItem name={name} key={name} isSelected={selectedItems.has(name)} updateSelected={updateSelected} />
          ))}
        </ul>
      </div>
      <br />
      <div className="button-container">
        <button onClick={() => switchSides("right")} className="button">{">>"}</button>
        <button onClick={() => swap("right")} className="button">{">"}</button>
        <button onClick={() => swap("left")} className="button">{"<"}</button>
        <button onClick={() => switchSides("left")} className="button">{"<<"}</button>
      </div>
      <br />
      <div className="right-container">
        <ul>
          {Object.keys(items).filter((itemKey) => !items[itemKey].onLeft).map((name) => (
            <ListItem name={name} key={name} isSelected={selectedItems.has(name)} updateSelected={updateSelected} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ListItem({ name, isSelected, updateSelected }) {
  return (
    <li>
      <input type="checkbox" className="checkbox" checked={isSelected} onChange={() => { updateSelected(name) }} />
      <span>{name}</span>
    </li>
  )
}