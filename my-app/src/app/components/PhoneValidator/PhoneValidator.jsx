"use client";

import { useState } from "react";
import "./PhoneValidator.css";

const PhoneValidator = ({}) => {
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    let val = e.target.value;
    let strippedVal = "";
    for (const digit of val) {
      if (0 <= digit && digit <= 9) strippedVal += digit;
    }
    if (strippedVal.length > 10) return;
    let firstThreeDigits = strippedVal.slice(0, 3);
    let nextThreeDigits = strippedVal.slice(3, 6);
    let lastFourDigits = strippedVal.slice(6);
    if (strippedVal.length < 4) {
      setValue(firstThreeDigits);
    } else if (strippedVal.length >= 4 && strippedVal.length < 7) {
      setValue(`(${firstThreeDigits})-${nextThreeDigits}`);
    } else if (strippedVal.length >= 7) {
      setValue(`(${firstThreeDigits})-${nextThreeDigits}-${lastFourDigits}`);
    }
  };

  return <input className="phone-validator__input" value={value} onChange={handleValueChange} />;
};

export default PhoneValidator;
