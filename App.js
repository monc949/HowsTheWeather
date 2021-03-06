import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import ReloadIcon from "./components/ReloadIcon";
import WeatherDetails from "./components/WeatherDetails";
import { colors } from "./utils/index";

const WEATHER_API_KEY = "ed1f0a4494214da7420897696de55b30";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall?";

export default function App() {
  setStatusBarStyle('light')
  const [errorMessage, setErrorMessage] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    load();
  }, []);
  async function load() {
    setWeatherData(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run this app!");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl);
      const result = await response.json();

      if (response.ok) {
        setWeatherData(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  if (weatherData) {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <ReloadIcon load={load} />
          <WeatherInfo weatherData={weatherData} />
        </View>
        <WeatherDetails weatherData={weatherData} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Getting accurate location...</Text>
        <ActivityIndicator size="large" color={colors.SECONDARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.BACKGROUND_COLOR,
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
    padding: 30,
    fontSize: 18,
    justifyContent: "center",
    color: colors.SECONDARY_COLOR,
  },
});
