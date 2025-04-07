import moment from "moment/moment";

export const formateDate = timestamp => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};

export const formateDateForText = date => {
  return moment(date).format("ll");
};

export const formatTime = timestamp => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    // hour12: true,
  });
  console.log(`timeString`, timeString);
  return timeString; // 9:00 AM
};
