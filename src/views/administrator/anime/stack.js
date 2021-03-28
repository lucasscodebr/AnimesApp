import React from 'react'
import AddAnimes from '../../administrator/anime'
import { createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default props => <Stack.Navigator initialRouteName={'AddAnimes'} screenOptions={ {headerShown : false} }>
                            <Stack.Screen name={'AddAnimes'} component={AddAnimes} />
                        </Stack.Navigator>