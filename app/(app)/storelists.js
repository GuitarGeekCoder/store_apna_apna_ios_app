import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet,Text, View,ScrollView } from "react-native";
import { Button } from "react-native-paper";
import StoreListPage from '../../components/store/storeList.js'

export default function Page() {
  return (
   <StoreListPage></StoreListPage>
  );
}
