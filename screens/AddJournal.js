import { useContext, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
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
import ImagePicker from "../components/ImagePicker";
import Camera from "../components/Camera";
import { formatTimeTo12Hr } from "../utils/date";

const AddJournal = ({ navigation, route }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(0);
  const [journal, setJournal] = useState("");
  const insets = useSafeAreaInsets();
  const params = route?.params;
  const { theme, setJournals, journals, location } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const handleSubmit = () => {
    if (journal) {
      if (params?.id) {
        setJournals((prev) =>
          prev.map((item) => {
            if (item.id === params.id) {
              return {
                ...item,
                journal: journal.trim(),
                ...(image && { image: image }),
              };
            }
            return item;
          })
        );
      } else {
        setJournals((prev) => [
          ...prev,
          {
            id: Math.random(),
            journal: journal,
            ...(params?.date
              ? { dateAndTime: new Date(params?.date) }
              : { dateAndTime: new Date() }),
            ...(image && { image: image }),
            location: location,
          },
        ]);
      }
    }
    navigation.navigate("TimeLine");
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
      if (journal.image) setImage(journal.image);
    }
    if (params?.image) {
      setImage(params.image);
    }
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const getCurrentJournal = (id) => {
    return journals.find((item) => item.id === id);
  };
  const MenuItems = [
    {
      text: "Move to trash",
      icon: "trash-outline",
      onPress: () => console.log("trash"),
    },
  ];
  console.log(params?.date);
  return (
    <SafeAreaView style={{ paddingTop: insets.top, flex: 1 }}>
      <StatusBar style={theme === "dark" ? "dark" : "light"} />
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <View style={[styles.header]}>
          <Text style={[styles.text]}>
            {params?.date
              ? new Date(params?.date).toDateString()
              : new Date().toDateString()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button title="Done" onPress={() => handleSubmit()} />
          </View>
        </View>
        <KeyboardAvoidingView>
          <ScrollView style={[styles.inputText]} keyboardDismissMode="on-drag">
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
              numberOfLines={10}
              autoFocus
            />
            {image && <Image style={{ height: 300 }} source={{ uri: image }} />}
          </ScrollView>
        </KeyboardAvoidingView>
        {isKeyboardVisible && !journal && (
          <View
            style={[
              {
                borderColor: Colors[theme].color,
                position: "absolute",
                left: 0,
              },
              {
                bottom: Platform.OS === "ios" ? keyBoardHeight - 40 : 0,
                flexDirection: "row",
                paddingBottom: 10,
              },
            ]}
          >
            <View
              style={{
                borderRightWidth: 1,
                borderRightColor: "gray",
                paddingRight: 25,
                paddingLeft: 25,
              }}
            >
              <ImagePicker
                name="images-outline"
                size={50}
                setImage={setImage}
              />
            </View>
            <View>
              <Camera setImage={setImage} />
            </View>
          </View>
        )}
        {journal && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              bottom: Platform.OS === "ios" ? keyBoardHeight - 30 : 0,
            }}
          >
            <Text style={[styles.text, { paddingLeft: 10 }]}>
              {params?.id
                ? formatTimeTo12Hr(getCurrentJournal(params.id).dateAndTime)
                : formatTimeTo12Hr(new Date())}
            </Text>
            {isKeyboardVisible && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    paddingRight: 25,
                    paddingLeft: 25,
                  }}
                >
                  <ImagePicker
                    name="images-outline"
                    size={25}
                    setImage={setImage}
                  />
                </View>
                <View>
                  <Camera setImage={setImage} size={25} />
                </View>
              </View>
            )}
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
