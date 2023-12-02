import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { AppContext } from "../utils/store";
import Colors from "../constants/colors.json";
const Button = ({ title, onPress }) => {
  const { theme } = useContext(AppContext);
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text
        style={[styles.buttonText, { color: Colors[theme].buttonTextColor }]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
export default Button;

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
  },
  button: {
    padding: 10,
  },
});
