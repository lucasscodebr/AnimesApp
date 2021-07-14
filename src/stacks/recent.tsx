import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Recent as RecentView} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export const Recent = () => (
    <Stack.Navigator initialRouteName={'Recentes'} screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Recentes'} component={RecentView} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
