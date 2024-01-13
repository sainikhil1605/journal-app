function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
const formatTimeTo12Hr = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
const formatDateToUS = (date) => {
  const parsedDate = new Date(date);
  return (
    parsedDate.getYear() +
    "-" +
    parsedDate.getMonth() +
    "-" +
    parsedDate.getDay()
  );
};
export { formatDate, formatTimeTo12Hr, formatDateToUS };
