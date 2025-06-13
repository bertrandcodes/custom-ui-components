"use client";

import { useState, useMemo } from "react";
import "./TransactionList.css";

const transactions = [
  { id: "t_01", customer: "Rose Roberts", amount: 84 },
  { id: "t_02", customer: "Chris Cook", amount: 30 },
  { id: "t_03", customer: "Mary Martin", amount: 42 },
  { id: "t_04", customer: "Susan Smith", amount: 26 },
  { id: "t_05", customer: "Rose Roberts", amount: -84 },
  { id: "t_06", customer: "Rose Roberts", amount: 48 },
  { id: "t_07", customer: "Susan Smith", amount: 104 },
  { id: "t_08", customer: "Larry Lewis", amount: 140 },
  { id: "t_09", customer: "Mary Martin", amount: 10 },
  { id: "t_10", customer: "Chris Cook", amount: 60 },
  { id: "t_11", customer: "Susan Smith", amount: -26 },
  { id: "t_12", customer: "Larry Lewis", amount: -140 },
  { id: "t_13", customer: "Rose Roberts", amount: 26 },
  { id: "t_14", customer: "Ryan Roberts", amount: 44 },
];

const transactionsObj = transactions.reduce((acc, transaction) => {
  acc[transaction.customer] = acc[transaction.customer] || 0;
  acc[transaction.customer] += transaction.amount;
  return acc;
}, {});

const TransactionList = ({}) => {
  const [searchVal, setSearchVal] = useState("");

  const filteredList = useMemo(
    () =>
      Object.entries(transactionsObj).filter(([name, _]) =>
        name.toLowerCase().includes(searchVal.toLowerCase()),
      ),
    [searchVal],
  );

  const highestSpender = filteredList.reduce(
    (acc, [name, amount]) => {
      if (amount >= acc[1]) return [name, amount];
      return acc;
    },
    [null, 0],
  )[0];

  return (
    <>
      <input
        className="transaction-list__input"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <ul>
        {filteredList.map(([name, amount], index) => (
          <li
            key={index}
            className={`${highestSpender === name ? "transaction-list__li--active" : ""}`}
          >
            {name} {amount}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
