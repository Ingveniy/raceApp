import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

const LoadingDataScreen = ({
  message = "Загрузка данных, пожалуйста ожидайте",
  size = "large",
  color = "#0082c3"
}) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <View>
        <ActivityIndicator
          style={styles.activityIndicator}
          size={size}
          color={color}
        />
      </View>
      <View>
        <Text>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10
  },
  activityIndicator: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  },

});

LoadingDataScreen.propTypes = {
  message: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default LoadingDataScreen;
