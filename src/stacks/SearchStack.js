import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Search, Anime} from '../views'
import Video from '../componets/video'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'Pesquisa'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Pesquisa'} component={Search} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
