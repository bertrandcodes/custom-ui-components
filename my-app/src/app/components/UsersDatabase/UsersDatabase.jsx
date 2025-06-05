"use client";

import { useRef, useState } from "react";
import "./UsersDatabase.css";
/*
Components
- UsersDatabase
  - DataTable
  - NameInputs

State
- {id: name}
- searchbar value
- selectedId
- firstNameVal
- lastNameVal

Plan
1. render with dummy data
2. add filtering
4. handle creating
5. handle updating
6. handle deleting
*/

const UsersDatabase = () => {
  const [names, setNames] = useState({ 1: "Bertrand Shao", 2: "Joei Sumiller" });
  const [searchVal, setSearchVal] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const ref = useRef(3);

  const disableCreate = selectedId === null && firstName.length === 0 && lastName.length === 0;

  const createUser = () => {
    setNames((prevState) => ({
      ...prevState,
      [ref.current]: `${firstName} ${lastName}`,
    }));
    ref.current += 1;
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="users-database">
      <input
        className="users-database--search"
        onChange={(e) => setSearchVal(e.target.value)}
        value={searchVal}
        placeholder="Search"
      />
      <div className="users-database__data-table">
        <ul>
          {Object.entries(names)
            .filter(([_, name]) => name.includes(searchVal))
            .map(([id, name]) => (
              <li
                key={id}
                onClick={() => setSelectedId(id)}
                className={`${selectedId === id ? "selected" : ""}`}
              >
                {name}
              </li>
            ))}
        </ul>
      </div>
      <div className="users-database__name-inputs">
        <label htmlFor="users-database__first-name">First Name</label>
        <input
          id="users-database__first-name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <label htmlFor="users-database__last-name">Last Name</label>
        <input
          id="users-database__last-name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>
      <div className="users-database__buttons">
        <button disabled={disableCreate} onClick={createUser}>
          Create
        </button>
        <button>Update</button>
        <button>Delete</button>
        <button onClick={() => setSelectedId(null)}>Cancel</button>
      </div>
    </div>
  );
};

export default UsersDatabase;
