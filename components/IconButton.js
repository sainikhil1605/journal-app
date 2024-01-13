import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors.json";
import { AppContext } from "../utils/store";
import { useContext } from "react";
const IconButton = ({ name, size, color, style, onPress }) => {
  const { theme } = useContext(AppContext);
  console.log(theme);
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        style={style}
        name={name}
        size={size}
        color={color || Colors[theme].color}
      />
    </Pressable>
  );
};

export default IconButton;
