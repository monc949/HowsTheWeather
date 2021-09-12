import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherInfo({ currentWeather }) {
  const {
    main: { temp, temp_min, temp_max },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  let low = Math.round(temp_min);
  let high = Math.round(temp_max);

  const locationIcon = (
    <MaterialCommunityIcons
      name="map-marker-outline"
      size={25}
      color={PRIMARY_COLOR}
    />
  );

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.location}>
        {locationIcon} {name}
      </Text>

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
    height: 120,
  },
  weatherDescription: {
    textTransform: "capitalize",
    color: colors.PRIMARY_COLOR,
  },
  textPrimary: {
    fontSize: 40,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
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
