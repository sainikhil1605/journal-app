import { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../utils/store";
import days from "../constants/days";
import Colors from "../constants/colors.json";
import LineSeperator from "../components/LineSeperator";

const TimeLine = ({ navigation }) => {
  const { journals, theme } = useContext(AppContext);
  const handlePress = (id) => {
    navigation.navigate("AddJournal", {
      id: id,
    });
  };
  const renderJournal = ({ id, journal, dateAndTime }) => (
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
          {new Date(dateAndTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>
    </Pressable>
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
  },
});
export default TimeLine;
