import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Category as CategoryView} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export const Category = () => (
    <Stack.Navigator initialRouteName={'Categoria'} screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Categoria'} component={CategoryView} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
