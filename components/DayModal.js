import { useContext } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Card, List } from "react-native-paper";
import { AppContext } from "../utils/store";
import { formatDate, formatTimeTo12Hr } from "../utils/date";
import IconButton from "./IconButton";
import Button from "./Button";

const DayModal = ({ navigation, route }) => {
  const { journals, theme } = useContext(AppContext);
  const { day } = route?.params;

  const selectedJournals = journals.filter((item) => {
    const currDate = formatDate(new Date(item.dateAndTime));

    return currDate === day.dateString;
  });
  const handleSubmit = () => {
    navigation.navigate("TimeLine");
  };
  const renderDescription = (dateAndTime) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.text]}>{formatTimeTo12Hr(dateAndTime)}</Text>
        <Text style={[styles.text, { paddingLeft: 10 }]}>
          {new Date(dateAndTime).toDateString()}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <IconButton
          size={30}
          name="add-outline"
          onPress={() =>
            navigation.navigate("AddJournal", { date: day.dateString })
          }
        />
        <Text style={[styles.text, { fontSize: 25 }]}>Journal</Text>
        <Button title="Done" onPress={() => handleSubmit()} />
      </View>
      <View style={{ color: "white", margin: 10, backgroundColor: "black" }}>
        <Card
          mode="outlined"
          theme={{ roundness: 3 }}
          style={{ backgroundColor: "#333333" }}
        >
          <List.Section>
            <List.Accordion
              style={{ backgroundColor: "#333333" }}
              title={`${selectedJournals.length} Entries`}
              titleStyle={{ color: "white" }}
            >
              {selectedJournals.map((item) => {
                return (
                  <List.Item
                    key={item.id}
                    titleStyle={{ color: "white" }}
                    title={item.journal}
                    style={{ paddinTop: 10 }}
                    onPress={() =>
                      navigation.navigate("AddJournal", { id: item.id })
                    }
                    description={() => renderDescription(item.dateAndTime)}
                  />
                );
              })}
            </List.Accordion>
          </List.Section>
        </Card>
      </View>
    </View>
  );
};
export default DayModal;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
