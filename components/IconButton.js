import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors.json";
import { AppContext } from "../utils/store";
import { useContext } from "react";
const IconButton = ({ name, size, color, style, onPress }) => {
  const { theme } = useContext(AppContext);
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        style={style}
        name={name}
        size={size}
        color={Colors[theme].color}
      />
    </Pressable>
  );
};

export default IconButton;
