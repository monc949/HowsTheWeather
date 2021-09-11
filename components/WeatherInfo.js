import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({ currentWeather }) {
  const {
    main: { temp, temp_min, temp_max },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const low = temp_min;
  const high = temp_max;

  const lowTruncated = low.toFixed();
  const highTruncated = high.toFixed();

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.location}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°C</Text>
      <Text>
        H:{highTruncated} L:{lowTruncated}
      </Text>
      <Text style={styles.textSecondary}>{main}</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: "500",
    margin: 10,
  },
  location: {
    fontSize: 40,
    paddingBottom: 50,
    color: SECONDARY_COLOR,
  },
});
