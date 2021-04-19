import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import FavoriteList from '../screens/FavoriteList';

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Shopping List" component={CurrentList} />
            <Stack.Screen 
                name="ItemDetails"
                component={ItemDetails}
                options={({ route }) => {
                    return {
                        headerTitle: () => {
                            return <Text>{route.params.item.name}</Text>
                        }
                    }
                }}
            />
        </Stack.Navigator>
    )
}

const FavoritesListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorites List" component={FavoriteList} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ color, focused }) => {
                    let image;

                    if (route.name === "Shopping List") {
                        image = Platform.select({
                            ios: require('../assets/icons/ios-list.png'),
                            android: require('../assets/icons/md-list.png')
                        })
                    } else if (route.name === "Favorites List") {
                        image = Platform.select({
                            ios: focused
                            ? require('../assets/icons/ios-star.png')
                            : require('../assets/icons/ios-star-outline.png'),
                            android: focused
                            ? require('../assets/icons/md-star.png')
                            : require('../assets/icons/md-star-outline.png')
                        })
                    }

                    return (
                        <Image 
                            source={image}
                            resizeMode="contain"
                            style={{ width: 25, tintColor: color }}
                        />
                    )
                }
            })}
        >
          <Tab.Screen name="Shopping List" component={CurrentListStack} />
          <Tab.Screen name="Favorites List" component={FavoritesListStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

export default Tabs;