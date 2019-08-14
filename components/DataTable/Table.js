import React, { Component } from "React";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

import LoadingDataScreen from "./LoadingDataScreen";
import ErrorMessageScreen from "./ErrorMessageScreen";

import { map } from "lodash";

class Table extends Component {
  tableRenderController = ({
    tableHeaders,
    tableData,
    handleChangePage,
    totalElements,
    countElementsOnPage,
    currentPage,
    dataWasLoaded,
    errorMessage
  }) => {
    if (dataWasLoaded && errorMessage) {
      return <ErrorMessageScreen errorMessage={errorMessage} />;
    }
    if (!dataWasLoaded) {
      return <LoadingDataScreen />;
    }
    if (dataWasLoaded && !errorMessage) {
      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableBlock}>
            <TableHeader tableHeaders={tableHeaders} />
            <ScrollView style={{maxHeight: '80%'}}>
              {map(tableData, (rowItem, index) => {
                return (
                  <TableRow key={"rowContainer" + index} rowFields={rowItem} />
                );
              })}
            </ScrollView>
          </View>
          <TableFooter
            handleChangePage={handleChangePage}
            totalElements={totalElements}
            countElementsOnPage={countElementsOnPage}
            currentPage={currentPage}
          />
        </View>
      );
    }
  };
  render() {
    return this.tableRenderController(this.props);
  }
}

const styles = StyleSheet.create({
  tableBlock: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  tableContainer:{
    justifyContent: "space-between",
  }
});

export default Table;
