import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppContext } from "../utils/store";
import Colors from "../constants/colors.json";
import Button from "../components/Button";
import IconButton from "../components/IconButton";

const AddJournal = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(0);
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

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  console.log(keyBoardHeight);
  const { theme } = useContext(AppContext);
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <View style={[styles.header, { backgroundColor: Colors[theme].header }]}>
        <Text style={[styles.text]}>{new Date().toDateString()}</Text>
        <Button title="Done" onPress={() => navigation.goBack()} />
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
            multiline={true}
            numberOfLines={10}
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
              bottom: keyBoardHeight,
            },
          ]}
        >
          <IconButton name="images-outline" size={28} />
        </View>
      )}
    </View>
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
  inputText: {
    backgroundColor: "red",
  },
});
