import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({
  title,
  onPress,
  style = styles.button,
  color = "#fff",
  fontSize = 13,
  fontWeight = "400",
  fontStyle = "normal",
  fontFamily = "Roboto Condensed",
  disabled = false
}) => {
  return (
    <TouchableOpacity onPress={disabled ? () => false : onPress}>
      <View style={[style, disabled ? styles.disabled : {}]}>
        <Text
          style={{
            color,
            fontSize,
            fontWeight,
            fontStyle,
            fontStyle,
            fontFamily
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0082c3",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  disabled: {
    backgroundColor: "#a8a6a5",
    borderColor: "#a8a6a5"
  }
});

export default Button;
