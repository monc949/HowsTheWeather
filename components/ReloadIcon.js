import React from "react";
import { View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReloadIcon() {
  reloadIconName = Platform.OS == "ios" ? "ios-refresh" : "md-refresh";
  return (
    <View>
      <Ionicons name={reloadIconName} size={24} color="black" />
    </View>
  );
}
