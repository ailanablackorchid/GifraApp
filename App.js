import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/screens/Main";
import Details from "./src/screens/Details";

export default function App() {
  const StackGIPHY = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StackGIPHY.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackGIPHY.Screen name="Main" component={Main}></StackGIPHY.Screen>
        <StackGIPHY.Screen
          name="Details"
          component={Details}
        ></StackGIPHY.Screen>
      </StackGIPHY.Navigator>
    </NavigationContainer>
  );
}
