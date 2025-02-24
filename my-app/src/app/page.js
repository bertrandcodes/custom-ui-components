// Rename from Home...

"use client"

import { useState } from "react";

// Format with css
// get buttons down

// one state to hold both sides, each el is an obj: key = title : val = {
// state:
// selected: 
// }

// we render on one sider by filtering. but we need to make 2 passes

// instead we can have 2 states, representing each side, but then bring each side over is a pain.

// lets do one state
// each list item is it's own component which a checkbox thats controlled by state

// on button click, we change state

// disable buttons accordingly

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
        items[item].onLeft = true
      } else {
        items[item].onLeft = false
      }
      console.log(switchToLeft, items[item], item, 'item')
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