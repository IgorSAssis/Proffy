import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { AppLoading } from "expo"

import { Archivo_400Regular, Archivo_700Bold, useFonts } from "@expo-google-fonts/archivo"
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins"

import AppStack from './src/routes/AppStack';

export default function App() {

  let [isFontLoaded] = useFonts({
    Archivo_400Regular, Archivo_700Bold,
    Poppins_400Regular, Poppins_600SemiBold
  })

  if (!isFontLoaded) {
    return <AppLoading />
  } 

  else {
    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}