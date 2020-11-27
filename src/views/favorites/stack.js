import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Favorites from './index'
import Anime from '../anime'
import Video from '../../componets/video'

const Stack = createStackNavigator()

export default props => <Stack.Navigator initialRouteName={'Favoritos'} screenOptions={{headerShown : false}} >
                            <Stack.Screen name={'Favoritos'} component={Favorites} />
                            <Stack.Screen name={'Anime'} component={Anime} />
                            <Stack.Screen name={'Video'} component={Video} />
                        </Stack.Navigator>