import React, { PureComponent } from "React";
import { View, ScrollView, StyleSheet } from "react-native";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";
import PropTypes from "prop-types";

import LoadingDataScreen from "./LoadingDataScreen";
import ErrorMessageScreen from "./ErrorMessageScreen";

import { map } from "lodash";

class Table extends PureComponent {
  renderTable = ({
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

    if (!errorMessage) {
      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableBlock}>
            <TableHeader tableHeaders={tableHeaders} />
            <ScrollView style={{ maxHeight: "85%" }}>
              {!dataWasLoaded ? (
                <LoadingDataScreen />
              ) : (
                map(tableData, (rowItem, index) => {
                  return (
                    <TableRow
                      key={"rowContainer" + index}
                      rowFields={rowItem}
                    />
                  );
                })
              )}
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
    return this.renderTable(this.props);
  }
}

const styles = StyleSheet.create({
  tableBlock: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  tableContainer: {
    flex: 1,
    justifyContent: "space-between",
  }
});



Table.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  dataWasLoaded: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  handleChangePage: PropTypes.func.isRequired,
  totalElements: PropTypes.number,
  countElementsOnPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};


export default Table;
