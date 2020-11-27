import React from 'react'
import {View, SafeAreaView, StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import Drawer from './routes/drawer.js'

const MainStart = (props) => {

    return  <View style={ {backgroundColor : '#1a1a1a', flex : 1} } >
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{flex : 1}} >
                    <NavigationContainer>
                        <Drawer />
                    </NavigationContainer>
                </SafeAreaView>
            </View>
}

export default MainStart;