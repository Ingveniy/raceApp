import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ErrorMessageScreen = ({ errorMessage = "Something was crash" }) => {
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

ErrorMessageScreen.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorMessageScreen;
