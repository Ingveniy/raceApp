import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { map } from "lodash";
import Button from "../Button";
import PropTypes from "prop-types";

class NavigationButtons extends PureComponent {
  renderNavigationButtons = (
    handleChangePage,
    totalElements,
    countElementsOnPage,
    currentPage
  ) => {
    const buttons = this.prepareNavigationButtons(
      totalElements,
      countElementsOnPage,
      currentPage
    );
    return map(buttons, (buttonTitle, index) => {
      return (
        <Button
          style={{
            width: 45,
            height: 45,
            backgroundColor:
              buttonTitle === currentPage ? "#ffffff" : "#0082c3",
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
            borderColor:
              buttonTitle === currentPage ? "#0082c3" : "rgba(0, 0, 0, 0.1)",
            borderWidth: buttonTitle === currentPage ? 1 : 0
          }}
          key={"navigation" + index}
          onPress={() => handleChangePage(buttonTitle)}
          title={buttonTitle}
          color={buttonTitle === currentPage ? "#0082c3" : "#ffffff"}
        />
      );
    });
  };

  prepareNavigationButtons = (
    totalElements,
    countElementsOnPage,
    currentPage
  ) => {
    let lastPageNumber = Math.ceil(totalElements / countElementsOnPage);
    let prevPrevPage = currentPage - 2;
    let prevPage = currentPage - 1;

    let nextPage = currentPage + 1;
    let nextNextPage = currentPage + 2;

    let firstPage = 1;

    let buttons = [
      firstPage != currentPage ? firstPage : null,
      firstPage < prevPrevPage && nextPage > lastPageNumber
        ? prevPrevPage
        : null,
      firstPage < prevPage ? prevPage : null,
      currentPage,
      nextPage < lastPageNumber ? nextPage : null,
      nextPage < lastPageNumber && firstPage > prevPage ? nextNextPage : null,
      lastPageNumber != currentPage ? lastPageNumber : null
    ];

    return (buttons = buttons.filter(el => el !== null));
  };

  render() {
    const {
      totalElements,
      countElementsOnPage,
      currentPage,
      handleChangePage
    } = this.props;
    return (
      <View style={styles.navContainer}>
        {this.renderNavigationButtons(
          handleChangePage,
          totalElements,
          countElementsOnPage,
          currentPage
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  }
});

NavigationButtons.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  totalElements: PropTypes.number,
  countElementsOnPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default NavigationButtons;
