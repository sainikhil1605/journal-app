import { useContext, useEffect, useState } from "react";
import { Button, Modal, SafeAreaView, Text, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { AppContext } from "../utils/store";
import { formatDate } from "../utils/date";

const Calendar = ({ navigation }) => {
  const { journals, theme } = useContext(AppContext);
  const markedDates = {};
  const [showModal, setShowModal] = useState(false);
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
  const handleSubmit = () => {
    setShowModal(false);
  };

  return (
    <View>
      <CalendarList
        onDayPress={(day) =>
          navigation.navigate("JournalDayModal", { day: day })
        }
        markedDates={{
          ...markedDates,
        }}
      />
    </View>
  );
};
export default Calendar;
