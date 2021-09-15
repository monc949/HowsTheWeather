import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({ weatherData }) {
  const {
    current: {
      temp,
      weather: [{ main, description, icon }],
    },
    daily: [{
      temp: {min, max},
    }]
  } = weatherData;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  let low = Math.round(min);
  let high = Math.round(max);


  return (
    <View style={styles.weatherInfo}>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />

      <Text style={styles.textPrimary}>{temp}°C</Text>

      <Text style={styles.lightText}>
        {high} ° / {low} °
      </Text>

      <Text style={styles.textSecondary}>{main}</Text>

      <Text style={styles.weatherDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lightText: {
    color: PRIMARY_COLOR,
  },
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 200,
    height: 100,
    padding: 40,
  },
  weatherDescription: {
    textTransform: "capitalize",
    color: colors.PRIMARY_COLOR,
  },
  textPrimary: {
    fontSize: 35,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 25,
    color: SECONDARY_COLOR,
    fontWeight: "500",
    margin: 10,
  },
  location: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.GLASS,
    borderColor: colors.GLASS,
    padding: 8,
    alignContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
});
