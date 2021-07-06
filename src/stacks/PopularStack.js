import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Popular} from '../views'
import Video from '../componets/video'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'Popular'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Popular'} component={Popular} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
