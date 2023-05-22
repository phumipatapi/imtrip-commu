import * as React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
interface Props {
  navigation: any;
  route: any;
}

export default function TermAndConditionsScreen(prop: Props) {
  const termandcondition = {
    uri: "https://drive.google.com/file/d/1Q_aDEw-OTlIzLY69cITBPLqXAzKTBINk/view?usp=share_link",
    cache: true,
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={termandcondition}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
      />
    </View>
  );
}
