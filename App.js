import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/screens/Main";
import Details from "./src/screens/Details";

import { Text } from "react-native";

export default function App() {
  const StackGIPHY = createStackNavigator();
  console.log(StackGIPHY);

  return (
    <Main />
    // <NavigationContainer>
    //   <StackGIPHY.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //   >
    //     <StackGIPHY.Screen name="Main" component={Main}></StackGIPHY.Screen>
    //     {/* <StackGIPHY.Screen
    //       name="Details"
    //       component={Details}
    //     ></StackGIPHY.Screen> */}
    //   </StackGIPHY.Navigator>
    // </NavigationContainer>
  );
}
