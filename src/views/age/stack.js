import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Anime from '../anime'
import Video from '../../componets/video'
import ForAge from '../age'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'ForAge'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'ForAge'} component={ForAge} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
