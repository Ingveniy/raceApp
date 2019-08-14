import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";

const ErrorMessageScreen = ({ errorMessage = "" }) => {
  return (
    <View style={styles.errorMessageContainer}>
      <Text>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ErrorMessageScreen;
