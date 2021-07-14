import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, DateView} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export const Date = () => (
    <Stack.Navigator initialRouteName={'Date'} screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Date'} component={DateView} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
