import moment from "moment/moment";

export const formateDate = timestamp => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};

export const formateDateForText = date => {
  return moment(date).format("L");
};
