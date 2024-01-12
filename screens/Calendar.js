import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { AppContext } from "../utils/store";
import { formatDate } from "../utils/date";

const Calendar = () => {
  const { journals, theme } = useContext(AppContext);
  const markedDates = {};

  journals.forEach((item) => {
    markedDates[formatDate(new Date(item.dateAndTime))] = {
      selected: true,
      selectedColor: "skyblue",
      color: "blue",
      elevation: 2,
      marking: "rectangle",
      customStyles: {
        container: {
          border: 0,
        },
      },
    };
  });
  return (
    <View>
      <CalendarList
        markedDates={{
          ...markedDates,
        }}
      />
    </View>
  );
};
export default Calendar;
