import { useContext } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppContext } from "../utils/store";
import { days } from "../constants/days";
import Colors from "../constants/colors.json";
import LineSeperator from "../components/LineSeperator";
import { formatTimeTo12Hr } from "../utils/date";
import { Swipeable } from "react-native-gesture-handler";
import IconButton from "../components/IconButton";

const TimeLine = ({ navigation }) => {
  const { journals, theme, setJournals } = useContext(AppContext);
  const handlePress = (id) => {
    navigation.navigate("AddJournal", {
      id: id,
    });
  };
  const handleSwipe = (direction, id) => {
    const index = journals.findIndex((item) => item.id === id);
    if (direction === "right") {
      journals.splice(index, 1);
      setJournals([...journals]);
    }
  };
  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: "#ccffbd",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#40394a",
            paddingHorizontal: 10,
            fontWeight: "600",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Bookmark
        </Text>
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 100,
        }}
      >
        <IconButton name="trash-outline" size={30} color="black" />
      </View>
    );
  };
  const renderJournal = ({ id, journal, dateAndTime, image, location }) => (
    <Swipeable
      renderLeftActions={LeftSwipeActions}
      renderRightActions={rightSwipeActions}
      onSwipeableOpen={(direction) => handleSwipe(direction, id)}
    >
      <Pressable
        key={id}
        style={[styles.innerContainer]}
        onPress={() => handlePress(id)}
      >
        <View style={[styles.dateCntnr]}>
          <Text style={[{ color: Colors[theme].color }]}>
            {days[new Date(dateAndTime).getDay()]}
          </Text>
          <Text style={[{ color: Colors[theme].color }]}>
            {new Date(dateAndTime).getDate()}
          </Text>
        </View>
        <View style={[styles.journalCntnr]}>
          <Text style={[{ color: Colors[theme].color }]}>{journal}</Text>
          <Text style={[{ color: Colors[theme].color }]}>
            {formatTimeTo12Hr(dateAndTime)}
          </Text>
          <Text style={[{ color: "lightgray" }]}>{location}</Text>
        </View>
        <View>
          <Image style={{ width: 50, height: 50 }} source={{ uri: image }} />
        </View>
      </Pressable>
    </Swipeable>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].background,
          color: Colors[theme].text,
        },
      ]}
    >
      <View style={[styles.headingCntnr]}>
        <Text style={[styles.heading]}>Journal</Text>
      </View>
      <View>
        <FlatList
          data={journals}
          renderItem={({ item }) => renderJournal(item)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <LineSeperator />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headingCntnr: {
    padding: 10,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "skyblue",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  innerContainer: {
    flexDirection: "row",
    padding: 10,
  },
  journalCntnr: {
    marginLeft: 10,
    flexDirection: "column",
    flex: 1,
  },
});
export default TimeLine;
