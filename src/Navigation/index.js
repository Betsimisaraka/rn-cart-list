import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CurrentList from '../screens/CurrentList';

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CurrentListStack;


// import { createStackNavigation, creatAppContainer } from 'react-navigation';


// const CurrentListStack = createStackNavigation({
//     CurrentList: {
//         screen: CurrentList,
//     },
//     // ItemDetails: {

//     // }
// })

// export default creatAppContainer(CurrentListStack);