import React, { PureComponent } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

class DriverInfo extends PureComponent {
  render() {
    console.log(this.props.navigation.state.params.driverInfoUrl, "navigation");

    return (
      <View style={{flex:1}}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: this.props.navigation.state.params.driverInfoUrl }}
        />
      </View>
    );
  }
}

export default DriverInfo;
