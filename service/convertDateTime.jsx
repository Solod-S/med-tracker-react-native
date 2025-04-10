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
  return timeString; // 9:00 AM
};

export const getDatesRange = (startDate, endDate) => {
  const start = moment(new Date(startDate), "MM/DD/YYYY");
  const end = moment(new Date(endDate), "MM/DD/YYYY");

  const dates = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1, "days");
  }
  return dates;
};

export const getDateRangeToDisplay = () => {
  const dateList = [];
  for (let index = 0; index <= 7; index++) {
    dateList.push({
      date: moment().add(index, "days").format("DD"), // 28
      day: moment().add(index, "days").format("dd"), // Tue
      formattedDate: moment().add(index, "days").format("L"), // 12/27/2025
    });
  }
  return dateList;
};

export const getPrevDateRangeToDisplay = () => {
  const dateList = [];
  for (let index = 0; index <= 7; index++) {
    dateList.push({
      date: moment().subtract(index, "days").format("DD"), // 08
      day: moment().subtract(index, "days").format("dd"), // Tue
      formattedDate: moment().subtract(index, "days").format("L"), // 04/08/2025
    });
  }
  return dateList;
};
