import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Anime from '../views/anime'
import Video from '../componets/video'
import Caregory from '../views/CategoryView'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'Categoria'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Categoria'} component={Caregory} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)