import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

export default function WeatherDetails({ currentWeather }) {
  const {
    main: { feels_like, humidity, temp_min, temp_max },
  } = currentWeather;

  const {
    wind: { speed, deg },
  } = currentWeather;

  const speedKM = speed * 3.6;
  const speedConverted = speedKM.toFixed(2);

  const wind_direction = degToCompass(deg);

  // Degree to direction function
  function degToCompass(num) {
    var val = Math.floor(num / 22.5 + 0.5);
    var arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  }
  // Main Component
  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="thermometer"
              size={35}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Real Feel </Text>
              <Text style={styles.textPrimary}>{feels_like} °C</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="water-percent"
              size={40}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Humidity </Text>
              <Text style={styles.textPrimary}>{humidity} %</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: BORDER_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={35}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Wind Speed </Text>
              <Text style={styles.textPrimary}>{speedConverted} km/h</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="compass"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Wind Direction</Text>
              <Text style={styles.textPrimary}>
                {wind_direction} | {deg} °
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textPrimary: {
    fontSize: 15,
    color: PRIMARY_COLOR,
    fontWeight: "700",
    margin: 7,
  },
});
