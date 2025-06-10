"use client";

import { useEffect, useState, useRef } from "react";
import "./PhoneValidator.css";

const PhoneValidator = ({}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const cursorLocation = useRef(0);

  const handleValueChange = (e) => {
    let val = e.target.value;
    const cursor = e.target.selectionStart;
    let strippedVal = "";
    for (const digit of val) {
      if (0 <= digit && digit <= 9) strippedVal += digit;
    }
    if (strippedVal.length > 10) return;
    let firstThreeDigits = strippedVal.slice(0, 3);
    let nextThreeDigits = strippedVal.slice(3, 6);
    let lastFourDigits = strippedVal.slice(6);
    let formattedVal = "";
    if (strippedVal.length < 4) {
      formattedVal = firstThreeDigits;
    } else if (strippedVal.length >= 4 && strippedVal.length < 7) {
      formattedVal = `(${firstThreeDigits})-${nextThreeDigits}`;
    } else if (strippedVal.length >= 7) {
      formattedVal = `(${firstThreeDigits})-${nextThreeDigits}-${lastFourDigits}`;
    }
    cursorLocation.current = cursor + (formattedVal.length - val.length);
    setValue(formattedVal);
  };

  useEffect(() => {
    if (cursorLocation.current) {
      inputRef.current.setSelectionRange(cursorLocation.current, cursorLocation.current);
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      className="phone-validator__input"
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default PhoneValidator;
