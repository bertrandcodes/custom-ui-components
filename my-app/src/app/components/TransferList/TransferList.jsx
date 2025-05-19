"use client";

import { useMemo, useState } from "react";
import "./TransferList.css";

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

// LEARNING POINTS:

// wrap input in form element for native button handling

const LEFT_DEFAULTS = ["HTML", "JavaScript", "CSS", "TypeScript"];
const RIGHT_DEFAULTS = ["React", "Angular", "Vue", "Svelte"];
const LEFT_SIDE = "left";
const RIGHT_SIDE = "right";

const createListContent = (defaults) => defaults.map((el) => [el, false]);

export default function TransferList() {
  // rename map instead of list for clarity
  const [leftList, setLeftList] = useState(new Map(createListContent(LEFT_DEFAULTS)));
  const [rightList, setRightList] = useState(new Map(createListContent(RIGHT_DEFAULTS)));
  const [leftInputVal, setLeftInputVal] = useState("");
  const [rightInputVal, setRightInputVal] = useState("");

  function getNumSelected(list) {
    return Array.from(list).reduce((acc, [_, val]) => {
      return val ? acc + 1 : acc;
    }, 0);
  }

  const leftNumSelected = useMemo(() => {
    return getNumSelected(leftList);
  }, [leftList]);

  const rightNumSelected = useMemo(() => {
    return getNumSelected(rightList);
  }, [rightList]);

  const leftMessage = `${leftNumSelected}/${leftList.size} Selected`;

  const rightMessage = `${rightNumSelected}/${rightList.size} Selected`;

  function toggleCheck(side, list, item) {
    const obj = Object.fromEntries(list);
    obj[item] = !obj[item];

    // don't use switch since there are only 2 options
    switch (side) {
      case LEFT_SIDE:
        setLeftList(new Map(Object.entries(obj)));
        break;
      case RIGHT_SIDE:
        setRightList(new Map(Object.entries(obj)));
        break;
    }
  }

  function updateSide(side, list, otherList) {
    const map = new Map(list);
    const otherMap = new Map(otherList);

    map.forEach((value, key) => {
      if (value === true) {
        otherMap.set(key, value);
        map.delete(key);
      }
    });

    switch (side) {
      case LEFT_SIDE:
        setLeftList(map);
        setRightList(otherMap);
        break;
      case RIGHT_SIDE:
        setLeftList(otherMap);
        setRightList(map);
        break;
    }
  }

  function toggleAll(side, numSelected, list) {
    const checkAll = numSelected !== list.size;
    const newList = Array.from(list).map(([key, _]) => [key, checkAll]);
    const newMap = new Map(newList);
    side === LEFT_SIDE ? setLeftList(newMap) : setRightList(newMap);
  }

  function addElement(e, list, setList, val, setVal) {
    if (list.has(val)) return;
    if (e.key === "Enter") {
      const map = new Map(list);
      map.set(val, false);
      setList(map);
      setVal("");
    }
  }

  function handleInput(e, setVal) {
    setVal(e.target.value);
  }

  return (
    <div className="main-container">
      <div className="left-container">
        <input
          className="add-new"
          onChange={(e) => handleInput(e, setLeftInputVal)}
          onKeyDown={(e) => addElement(e, leftList, setLeftList, leftInputVal, setLeftInputVal)}
          value={leftInputVal}
        />
        <hr className="hr" />
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => toggleAll(LEFT_SIDE, leftNumSelected, leftList)}
          checked={leftNumSelected == leftList.size && leftNumSelected !== 0}
        />
        {leftMessage}
        <hr />
        <ul>
          {Array.from(leftList).map(([el, isChecked]) => (
            <ListItem
              key={el}
              name={el}
              isChecked={isChecked}
              toggleCheck={() => toggleCheck(LEFT_SIDE, leftList, el)}
            />
          ))}
        </ul>
      </div>
      <br />
      <div className="button-container">
        <button
          onClick={() => updateSide(LEFT_SIDE, leftList, rightList)}
          className={`button ${!leftNumSelected ? "hidden" : ""}`}
        >
          {">"}
        </button>
        <button
          onClick={() => updateSide(RIGHT_SIDE, rightList, leftList)}
          className={`button ${!rightNumSelected ? "hidden" : ""}`}
        >
          {"<"}
        </button>
      </div>
      <div className="right-container">
        <input
          className="add-new"
          onChange={(e) => handleInput(e, setRightInputVal)}
          onKeyDown={(e) => addElement(e, rightList, setRightList, rightInputVal, setRightInputVal)}
          value={rightInputVal}
        />
        <hr />
        <input
          type="checkbox"
          className="checkbox"
          onChange={() => toggleAll(RIGHT_SIDE, rightNumSelected, rightList)}
          checked={rightNumSelected == rightList.size && rightNumSelected !== 0}
        />
        {rightMessage}
        <hr />
        <ul>
          {Array.from(rightList).map(([el, isChecked]) => (
            <ListItem
              key={el}
              name={el}
              isChecked={isChecked}
              toggleCheck={() => toggleCheck(RIGHT_SIDE, rightList, el)}
            />
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
  );
}

// Storybook stories
TransferList.stories = {
  title: "Components/TransferList",
  component: TransferList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    leftDefaults: { control: "array" },
    rightDefaults: { control: "array" },
  },
};

// Default transfer list with programming languages
TransferList.Default = {
  args: {
    leftDefaults: ["HTML", "JavaScript", "CSS", "TypeScript"],
    rightDefaults: ["React", "Angular", "Vue", "Svelte"],
  },
};
