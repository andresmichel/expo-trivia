import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar, LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/redux";
import { setColorScheme } from "./src/redux/settings/actions";
import HomeScreen from "./src/screens/home";
import QuizScreen from "./src/screens/quiz";
import ResultsScreen from "./src/screens/results";

LogBox.ignoreLogs(["Switch: `onTintColor`"]);

const Stack = createStackNavigator();

const cacheAssetsAsync = () => {
    const images = [require("./assets/images/logo.png")];
    const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
    });
    const checkStorageForSettings = async (key, callback) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) store.dispatch(callback(value));
        } catch (error) {
            //
        }
    };
    return Promise.all([
        ...cacheImages,
        checkStorageForSettings("colorScheme", (value) =>
            setColorScheme(value)
        ),
    ]);
};

function App() {
    const [isReady, setIsReady] = useState(process.env.NODE_ENV === "test");
    if (!isReady)
        return (
            <AppLoading
                startAsync={async () => {
                    cacheAssetsAsync();
                }}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    return (
        <Provider store={store}>
            <StatusBar hidden />
            <NavigationContainer>
                <Stack.Navigator
                    headerMode={"none"}
                    screenOptions={{ gestureEnabled: false }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Quiz" component={QuizScreen} />
                    <Stack.Screen name="Results" component={ResultsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
