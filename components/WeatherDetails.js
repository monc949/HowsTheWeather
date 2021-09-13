import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

export default function WeatherDetails({ weatherData }) {
  const {
    current: { 
      feels_like, 
      humidity, 
      wind_speed, 
      wind_deg,
    },
    daily: [{
        clouds,
        pop,
        sunrise, 
        sunset, 
        moonrise, 
        moonset, 
        moon_phase,
        uvi,
      }]
    } = weatherData;

  const speedKM = wind_speed * 3.6;
  const speedConverted = speedKM.toFixed(2);

  const wind_direction = degToCompass(wind_deg);
  const sunriseConverted = timeConverter(sunrise);
  const sunsetConverted = timeConverter(sunset);

  const moonriseConverted = timeConverter(moonrise);
  const moonsetConverted = timeConverter(moonset);

  const moonPhaseIcon = getMoonPhaseIcon(moon_phase);
  const moonPhaseText = getMoonPhaseText(moon_phase);

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
  
  // UNIX Timestamp to time
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var formattedHour;
    var suffix;
    if (hour > 12) {
        formattedHour = hour - 12;
    } else {
        formattedHour = hour;
    }
    if (hour >= 12) {
        suffix = "PM"
    } else {
        suffix = "AM"
    }
    var time = formattedHour + ':' + min + " " + suffix;
    return time;
  }

  //Get Phase Text
  function getMoonPhaseText(phaseNum) {
    var phaseText;
    if (phaseNum == 0 || phaseNum == 1) {
        phaseText = "New Moon"
    }
    if (phaseNum > 0 && phaseNum < 0.25) {
        phaseText = "Waxing Crescent"
    } 
    if (phaseNum == 0.25) {
        phaseText = "First Quarter"
    }
    if (phaseNum > 0.25 && phaseNum < 0.50) {
      phaseText = "Waxing Gibbious"
    } 
    if (phaseNum == 0.50) {
      phaseText = "Full Moon"
    }
    if (phaseNum > 0.50 && phaseNum < 0.75) {
      phaseText = "Waning Gibbious"
    }
    if (phaseNum == 0.75) {
      phaseText = "Last Quarter"
    }
    if (phaseNum > 0.75 && phaseNum < 1) {
      phaseText = "Waning Crescent"
    }
    return phaseText;
  }

  // Get Phase Icon
  function getMoonPhaseIcon(phaseNum) {
    var phaseIcon;
    if (phaseNum == 0 || phaseNum == 1) {
        phaseIcon = <MaterialCommunityIcons
          name="moon-new"
          size={35}
          color={SECONDARY_COLOR}
        />
    }
    if (phaseNum > 0 && phaseNum < 0.25) {
        phaseIcon = <MaterialCommunityIcons
          name="moon-waxing-crescent"
          size={35}
          color={SECONDARY_COLOR}
        />
    } 
    if (phaseNum == 0.25) {
        phaseIcon = <MaterialCommunityIcons
          name="moon-first-quarter"
          size={35}
          color={SECONDARY_COLOR}
        />
    }
    if (phaseNum > 0.25 && phaseNum < 0.50) {
      phaseIcon = <MaterialCommunityIcons
        name="moon-waxing-gibbous"
        size={35}
        color={SECONDARY_COLOR}
      />
    } 
    if (phaseNum == 0.50) {
      phaseIcon = <MaterialCommunityIcons
        name="moon-full"
        size={35}
        color={SECONDARY_COLOR}
      />
    }
    if (phaseNum > 0.50 && phaseNum < 0.75) {
      phaseIcon = <MaterialCommunityIcons
        name="moon-waning-gibbous"
        size={35}
        color={SECONDARY_COLOR}
      />
    }
    if (phaseNum == 0.75) {
      phaseIcon = <MaterialCommunityIcons
        name="moon-last-quarter"
        size={35}
        color={SECONDARY_COLOR}
      />
    }
    if (phaseNum > 0.75 && phaseNum < 1) {
      phaseIcon = <MaterialCommunityIcons
        name="moon-waning-gibbous"
        size={35}
        color={SECONDARY_COLOR}
      />
    }
    return phaseIcon;
  }

// 
  // 
  // Main Component
  return (
    <View style={styles.weatherDetails}>
      {/* Row */}
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="thermometer"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Real Feel</Text>
              <Text style={styles.textPrimary}>{feels_like} °C</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="water-percent"
              size={35}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Humidity</Text>
              <Text style={styles.textPrimary}>{humidity} %</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Row */}
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Wind Speed</Text>
              <Text style={styles.textPrimary}>{speedConverted} km/h</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="compass"
              size={25}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Wind Direction</Text>
              <Text style={styles.textPrimary}>
                {wind_direction} | {wind_deg} °
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Row */}
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="cloud-outline"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Cloud Cover</Text>
              <Text style={styles.textPrimary}>{clouds} %</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-pouring"
              size={25}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Precipitation Chance</Text>
              <Text style={styles.textPrimary}>
                {pop} %
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Row */}
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-sunset-up"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Sunrise</Text>
              <Text style={styles.textPrimary}>{sunriseConverted}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-sunset-down"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Sunset</Text>
              <Text style={styles.textPrimary}>
                {sunsetConverted}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Row */}
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-sunny"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>UV Index</Text>
              <Text style={styles.textPrimary}>{uvi}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            {moonPhaseIcon}
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Moon Phase</Text>
              <Text style={styles.textPrimary}>
                {moonPhaseText}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Row */}
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: PRIMARY_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="moon-full"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Moonrise</Text>
              <Text style={styles.textPrimary}>{moonriseConverted}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="moon-new"
              size={30}
              color={SECONDARY_COLOR}
            />
            <View style={styles.weatherDetailsItems}>
              <Text style={styles.lightText}>Moonset</Text>
              <Text style={styles.textPrimary}>
                {moonsetConverted}
              </Text>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  lightText: {
    color: colors.PRIMARY_COLOR,
    fontSize: 15,
    fontWeight: "300",
    margin: 0,
  },
  weatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 20,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 8,
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
