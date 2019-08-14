import React, { PureComponent } from "react";
import { View } from "react-native";

import NavigationButtons from "./NavigationButtons";
import map from "lodash";

const TableFooter = ({
  handleChangePage = () => {},
  totalElements,
  countElementsOnPage,
  currentPage
}) => {
  return (
      <NavigationButtons
        handleChangePage={handleChangePage}
        totalElements={totalElements}
        countElementsOnPage={countElementsOnPage}
        currentPage={currentPage}
      />
  );
};

export default TableFooter;
