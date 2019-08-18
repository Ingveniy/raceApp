import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from 'react-native';
import NavigationButtons from "./NavigationButtons";

const TableFooter = ({
  handleChangePage = () => {},
  totalElements,
  countElementsOnPage,
  currentPage
}) => {
  if (totalElements > countElementsOnPage) {
    return (
      <NavigationButtons
        handleChangePage={handleChangePage}
        totalElements={totalElements}
        countElementsOnPage={countElementsOnPage}
        currentPage={currentPage}
      />
    );
  } 
  return <View/>
};

TableFooter.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  totalElements: PropTypes.number,
  countElementsOnPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};
export default TableFooter;
