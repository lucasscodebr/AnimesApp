import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Anime, Recent} from '../views'
import {Video} from '../components'

const Stack = createStackNavigator()

export default (props) => (
    <Stack.Navigator
        initialRouteName={'Recentes'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Recentes'} component={Recent} />
        <Stack.Screen name={'Anime'} component={Anime} />
        <Stack.Screen name={'Video'} component={Video} />
    </Stack.Navigator>
)
