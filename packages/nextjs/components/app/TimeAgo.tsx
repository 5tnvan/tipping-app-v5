import React from "react";

export const TimeAgo = ({ timestamp }) => {
  const currentTimestamp = new Date().getTime();
  const yourTimestampString = timestamp;
  const yourTimestamp = new Date(yourTimestampString).getTime();

  const timeDifference = currentTimestamp - yourTimestamp;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursAgo = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div>
      {daysAgo} days and {hoursAgo} hours ago
    </div>
  );
};