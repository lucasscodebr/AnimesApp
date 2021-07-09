import React from 'react'
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import Drawer from '../Router'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.style = StyleSheet.create({back: {backgroundColor: 'rgb(15, 15, 15)', flex: 1}, area: {flex: 1}})
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
