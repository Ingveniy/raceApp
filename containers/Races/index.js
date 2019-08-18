import React, { Component } from "react";
import axios from "axios";
import { Text, View, TouchableOpacity } from "react-native";

import Table from "../../components/DataTable/Table";
import PropTypes from 'prop-types';

const TABLE_HEADERS = [
  {
    title: "Season",
    width: "20%"
  },
  {
    title: "Race",
    width: "30%"
  },
  {
    title: "Date",
    width: "20%"
  },
  {
    title: "Circuit",
    width: "30%"
  }
];

class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 15,
      offset: 0,
      preparedRacesList: [],
      rawRacesList: [],
      racesTotalCount: null,
      dataWasLoaded: false,
      driverId: this.props.navigation.state.params.driverId
    };
  }
  static navigationOptions = {};
  componentDidMount() {
    this.getRacesByLimit();
  }

  handleChangePage = newPageNumber => {
    let newOffset = this.prepareOffsetByPageNumberAndLimit(
      newPageNumber,
      this.state.limit
    );
    this.getRacesByLimit(newOffset, this.statelimit, newPageNumber);
  };

  prepareOffsetByPageNumberAndLimit = (pageNumber, limit) => {
    return (pageNumber - 1) * limit;
  };

  getRacesByLimit = (offset = 0, limit = 15, currentPage = 1) => {
    this.setState({ dataWasLoaded: false });
    axios
      .get(
        `http://ergast.com/api/f1/drivers/${
          this.state.driverId
        }/races.json?limit=${limit}&offset=${offset}`
      )
      .then(response => {
        this.setState({
          preparedRacesList: this.prepareRacesForTable(
            response.data.MRData.RaceTable.Races
          ),
          rawRaceList: response.data.MRData.RaceTable.Races,
          racesTotalCount: +response.data.MRData.total,
          dataWasLoaded: true,
          errorMessage: null,
          limit,
          offset,
          currentPage
        });
      })
      .catch(err => {
        console.log(err, "race load");
        this.setState({
          dataWasLoaded: true,
          errorMessage: "Данные о гонках не были загружены"
        });
      });
  };

  prepareRacesForTable = rawRacesList => {
    let preparedRacesList = [];
    rawRacesList.forEach((race, raceIndex) => {
      const { season, raceName, date, Circuit } = race;

      preparedRacesList.push({
        season: (
          <View key={"s" + season + raceName + date} style={{ width: "20%" }}>
            <Text>{season}</Text>
          </View>
        ),
        raceName: (
          <View key={"r" + season + raceName + date} style={{ width: "30%" }}>
            <Text>{raceName}</Text>
          </View>
        ),
        date: (
          <View key={"d" + season + raceName + date} style={{ width: "20%" }}>
            <Text>{date}</Text>
          </View>
        ),
        circuitName: (
          <View key={"c" + season + raceName + date} style={{ width: "30%" }}>
            <Text>{Circuit.circuitName}</Text>
          </View>
        )
      });
    });
    return preparedRacesList;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Table
          tableHeaders={TABLE_HEADERS}
          tableData={this.state.preparedRacesList}
          handleChangePage={this.handleChangePage}
          dataWasLoaded={this.state.dataWasLoaded}
          totalElements={this.state.racesTotalCount}
          countElementsOnPage={this.state.limit}
          currentPage={this.state.currentPage}
          errorMessage={this.state.errorMessage}
        />
      </View>
    );
  }
}
Races.propTypes = {}

export default Races;
