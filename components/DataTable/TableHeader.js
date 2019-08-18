import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { map } from "lodash";

const TableHeader = ({ tableHeaders }) => {
  return (
    <View style={styles.headerContainer}>
      {map(tableHeaders, (headerItem, index) => {
        return (
          <View
            style={{ width: headerItem.width }}
            key={"tableHeader" + headerItem.title}
          >
            <Text style={styles.headerTitle}>{headerItem.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  headerTitle: {
    fontSize: 17
  }
});

TableHeader.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
};

export default TableHeader;
