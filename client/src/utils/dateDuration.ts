import moment from "moment";
export const findDuration = (startDate: Date) => {
  const start = startDate;
  const currDate = moment();
  const duration = moment.duration(currDate.diff(start));

  return duration;
};

const formatDate = (date: moment.Duration) => {
  const yrs = date.years();
  const months = date.months();
  const days = date.days();

  if (days) return `${days} days ago`;
  if (months) return `${months} months ago`;
  if (yrs) return `${yrs} years and ${months} mos`;
  return `Just a moment ago`;
};

export default formatDate;
