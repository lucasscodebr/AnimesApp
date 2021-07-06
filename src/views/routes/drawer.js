import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Search, Recent, Popular, Favorite, Category} from '../../stacks/'
import ForAge from '../age/stack'

const Drawer = createDrawerNavigator()

const DrawerComponent = (props) => {
    return (
        <Drawer.Navigator initialRouteName={'PESQUISA'}>
            <Drawer.Screen name={'PESQUISA'} component={Search} />
            <Drawer.Screen name={'RECENTES'} component={Recent} />
            <Drawer.Screen name={'POPULAR'} component={Popular} />
            <Drawer.Screen name={'CATEGORIA'} component={Category} />
            <Drawer.Screen name={'ANO DE LANCAMENTO'} component={ForAge} />
            <Drawer.Screen name={'MINHA LISTA'} component={Favorite} />
        </Drawer.Navigator>
    )
}

export default DrawerComponent
