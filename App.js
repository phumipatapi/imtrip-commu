import React, { useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Mitr_400Regular, Mitr_600SemiBold } from '@expo-google-fonts/mitr';
import { Kanit_700Bold } from '@expo-google-fonts/kanit';
import BottomTabNavigator from "./navigation/TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from './screens/auth/SignInScreen';
import { AuthStackNavigator } from './navigation/StackNavigator';
import { useAuthentication } from './utils/useAuthentication';


SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [accessToken, setUserToken] = useState(null);

  const { user } = useAuthentication();


  useFonts({ Mitr_400Regular, Mitr_600SemiBold, Kanit_700Bold });


  const getUserToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setUserToken(token);
  }


  useEffect(() => {
    async function prepare() {
      try {
        // Load access token from AsyncStorage


        // Pre-load fonts and wait for 2 seconds
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    getUserToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          {user
            ? (
              <Stack.Screen
                name="Main"
                component={BottomTabNavigator}
                options={{ headerShown: false }}

              />

            ) : (
              <Stack.Screen
                name="Auth"
                component={AuthStackNavigator}
                options={{ headerShown: false }}
              // initialParams={{ setUserToken }}
              />
            )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
