import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { map } from "lodash";

const TableRow = ({ rowFields }) => {
  return (
    <View style={styles.rowContainer}>
      {map(rowFields, (field, indexRowField) => {
        return field;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  }
});

TableRow.propTypes = {
  rowFields: PropTypes.object.isRequired,
};

export default TableRow;
