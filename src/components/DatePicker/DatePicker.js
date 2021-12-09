import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TDatePicker({ selected, setStartDate }) {
  return (
    <DatePicker selected={selected} onChange={(date) => setStartDate(date)} />
  );
}
