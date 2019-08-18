import React, { Component } from "react";
import axios from "axios";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Table from "../../components/DataTable/Table";

const TABLE_HEADERS = [
  {
    title: "Name",
    width: "30%"
  },
  {
    title: "Nationality",
    width: "30%"
  },
  {
    title: "Number",
    width: "20%"
  },
  {
    title: "Races",
    width: "20%"
  }
];

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 15,
      offset: 0,
      selectedDriver: null,
      preparedDriversList: [],
      rawDriversList: [],
      driverTotalCount: null,
      dataWasLoaded: false
    };
  }
  static navigationOptions = {
    title: "Drivers"
  };
  componentDidMount() {
    console.log(this.props, "props");
    this.getDriversByLimit();
  }

  handleChangePage = newPageNumber => {
    console.log("newPageNumber", newPageNumber);
    let newOffset = this.prepareOffsetByPageNumberAndLimit(
      newPageNumber,
      this.state.limit
    );
    this.getDriversByLimit(newOffset, this.statelimit, newPageNumber);
  };

  prepareOffsetByPageNumberAndLimit = (pageNumber, limit) => {
    return (pageNumber - 1) * limit;
  };

  getDriversByLimit = (offset = 0, limit = 15, currentPage = 1) => {
    this.setState({ dataWasLoaded: false });
    axios
      .get(
        `http://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`
      )
      .then(response => {
        this.setState(
          {
            preparedDriversList: this.prepareDriversForTable(
              response.data.MRData.DriverTable.Drivers
            ),
            rawDriversList: response.data.MRData.DriverTable.Drivers,
            driverTotalCount: +response.data.MRData.total,
            dataWasLoaded: true,
            errorMessage: null,
            limit,
            offset,
            currentPage
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log(err, "drivers load");
        this.setState({
          dataWasLoaded: true,
          errorMessage: "Данные о водителях не были загружены"
        });
      });
  };
  prepareDriversForTable = rawDriversList => {
    let preparedDriversList = [];

    rawDriversList.forEach((driver, driverIndex) => {
      const {
        givenName,
        familyName,
        permanentNumber,
        nationality,
        url,
        driverId
      } = driver;

      preparedDriversList.push({
        name: (
          <TouchableOpacity
            style={{ width: "30%", paddingRight: 5 }}
            key={"name" + familyName + driverIndex}
            onPress={() =>
              this.props.navigation.navigate("DriverInfo", {
                driverInfoUrl: url
              })
            }
          >
            <Text style={{ textDecorationLine: "underline" }}>
              {givenName + " " + familyName}
            </Text>
          </TouchableOpacity>
        ),
        nationality: (
          <Text
            style={{ width: "30%" }}
            key={"nation" + familyName + driverIndex}
          >
            {nationality}
          </Text>
        ),
        permanentNumber: (
          <Text style={{ width: "20%" }} key={"pn" + familyName + driverIndex}>
            {permanentNumber}
          </Text>
        ),
        races: (
          <TouchableOpacity
            style={{ width: "20%" }}
            key={"race" + familyName + driverIndex}
            onPress={() =>
              this.props.navigation.navigate("Races", { driverId: driverId })
            }
          >
            <Text style={{ textDecorationLine: "underline" }}>Races</Text>
          </TouchableOpacity>
        )
      });
    });
    return preparedDriversList;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Table
          tableHeaders={TABLE_HEADERS}
          tableData={this.state.preparedDriversList}
          handleChangePage={this.handleChangePage}
          dataWasLoaded={this.state.dataWasLoaded}
          totalElements={this.state.driverTotalCount}
          countElementsOnPage={this.state.limit}
          currentPage={this.state.currentPage}
          errorMessage={this.state.errorMessage}
        />
      </View>
    );
  }
}

Drivers.propTypes = {}

export default Drivers;
