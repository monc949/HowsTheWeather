import React from "react";
import { View, Text, Stylesheet } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails() {
  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = Stylesheet.create({
  weatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
});
