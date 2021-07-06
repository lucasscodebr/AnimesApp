import React from 'react'
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import Drawer from './routes/drawer.js'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.style = StyleSheet.create({
            back: {
                backgroundColor: '#1a1a1a',
                flex: 1,
            },
            area: {
                flex: 1,
            },
        })
    }

    render() {
        return (
            <View style={this.style.back}>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={this.style.area}>
                    <NavigationContainer>
                        <Drawer />
                    </NavigationContainer>
                </SafeAreaView>
            </View>
        )
    }
}
