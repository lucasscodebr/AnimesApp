import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Favorite as FavoriteView} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export const Favorite = () => (
    <Stack.Navigator initialRouteName={'Favorites'} screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Favorites'} component={FavoriteView} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
