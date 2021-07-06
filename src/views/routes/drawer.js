import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Search, Recent, Popular} from '../../stacks/'
import ForAge from '../age/stack'
import Category from '../category/stack'
import Favorites from '../favorites/stack'

const Drawer = createDrawerNavigator()

const DrawerComponent = (props) => {
    return (
        <Drawer.Navigator initialRouteName={'PESQUISA'}>
            <Drawer.Screen name={'PESQUISA'} component={Search} />
            <Drawer.Screen name={'RECENTES'} component={Recent} />
            <Drawer.Screen name={'POPULAR'} component={Popular} />
            <Drawer.Screen name={'CATEGORIA'} component={Category} />
            <Drawer.Screen name={'ANO DE LANCAMENTO'} component={ForAge} />
            <Drawer.Screen name={'MINHA LISTA'} component={Favorites} />
        </Drawer.Navigator>
    )
}

export default DrawerComponent
