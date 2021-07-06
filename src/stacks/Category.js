import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Category} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'Categoria'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Categoria'} component={Category} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
