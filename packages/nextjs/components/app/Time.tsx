import React, { useState } from "react";

type Props = {
  timestamp: any;
};

export const TimeUnix = ({ timestamp }: Props) => {
  const [date, setDate] = useState<any>();
  const myDate = new Date(timestamp * 1000);
  setDate(myDate);
  return <>{date}</>;
};
