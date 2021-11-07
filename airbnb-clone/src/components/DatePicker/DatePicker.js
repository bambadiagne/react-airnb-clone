import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TDatePicker({today,setStartDate}) {
 
 return (
   <DatePicker  selected={today} onChange={date => setStartDate(date)} />
 );
}