import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Date} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'ForAge'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'ForAge'} component={Date} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
