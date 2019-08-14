import React from "react";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Drivers from "./containers/Drivers";
import Races from "./containers/Races";
import DriverInfo from "./containers/DriverInfo";
const appNavigator = createStackNavigator(
  {
    Drivers: { screen: Drivers },
    DriverInfo: { screen: DriverInfo },
    Races: { screen: Races }
  },
  {
    initialRouteName: "Drivers"
  },
);
export default createAppContainer(appNavigator);
