import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppContext } from "../utils/store";
import Colors from "../constants/colors.json";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { StatusBar } from "expo-status-bar";

const AddJournal = ({ navigation, route }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(0);
  const [journal, setJournal] = useState("");
  const insets = useSafeAreaInsets();
  const params = route?.params;
  const { theme, setJournals, journals } = useContext(AppContext);
  const handleSubmit = () => {
    if (journal) {
      if (params?.id) {
        setJournals((prev) =>
          prev.map((item) => {
            if (item.id === params.id) {
              return {
                ...item,
                journal: journal,
              };
            }
            return item;
          })
        );
      } else {
        setJournals((prev) => [
          ...prev,
          { id: Math.random(), journal: journal, dateAndTime: new Date() },
        ]);
      }
    }
    navigation.goBack();
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardVisible(true); // Keyboard is open
        setKeyBoardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Keyboard is closed
      }
    );
    if (params?.id) {
      const journal = journals.find((item) => item.id === params.id);
      setJournal(journal.journal);
    }
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: insets.top, flex: 1 }}>
      <StatusBar style={theme === "dark" ? "dark" : "light"} />
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <View
          style={[styles.header, { backgroundColor: Colors[theme].header }]}
        >
          <Text style={[styles.text]}>{new Date().toDateString()}</Text>
          <Button title="Done" onPress={() => handleSubmit()} />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView style={styles.inputText} keyboardDismissMode="on-drag">
            <TextInput
              style={[
                styles.text,
                styles.multiLine,
                {
                  color: Colors[theme].color,
                },
              ]}
              value={journal}
              onChangeText={(e) => setJournal(e)}
              multiline={true}
              numberOfLines={100}
              autoFocus
            />
          </ScrollView>
        </KeyboardAvoidingView>
        {isKeyboardVisible && (
          <View
            style={[
              {
                borderColor: Colors[theme].color,
                position: "absolute",
                // left: 0,
              },
              {
                bottom: 1,
              },
            ]}
          >
            <IconButton name="images-outline" size={28} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddJournal;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#333333",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  multiLine: {
    flex: 1,
    fontWeight: "normal",
    fontSize: 20,
    textAlignVertical: "top",
  },
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
});
