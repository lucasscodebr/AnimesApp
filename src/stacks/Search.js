import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {SearchView, Anime} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export const Search = () => (
    <Stack.Navigator initialRouteName={'Pesquisa'} screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Pesquisa'} component={SearchView} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
