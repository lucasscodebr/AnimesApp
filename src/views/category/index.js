import React, { useEffect, useState } from 'react'
import {FlatList, Platform} from 'react-native'
import Header from '../../componets/header'
import { Container } from './style'
import RNPickerSelect from 'react-native-picker-select';
import server from '../../services/api'
import MiniCard from '../../componets/miniCard'
import err from '../../class/Errors'
import url from '../../config/urls/index'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList: [],
            selectedCategory: 'Romance',
            pageNumber: 0,
            listAnimes: []
        }
    }

    async handleGetAllCategory() {
        try{
            const response = await server.get(url.CATEGORY_URL)
            this.setState({categoryList: response.data.map(obj => ({key: obj.id, label: obj.name, value: obj.name}))})
        }catch(error) {
            err.sendPostErrorToApi('handleGetAllCategory', error)
        }
    }

    async handleGetAnimesByCategory() {
        try{
            const response = await server.get(url.ANIMES_URL + `?category=${selectedCategory}&page=${pageNumber}`)
            console.log(response.data)
            this.setState({listAnimes: [...this.state.listAnimes, ...response.data], pageNumber: this.state.pageNumber + 50})
        }catch(error) {
            err.sendPostErrorToApi('handleGetAnimesByCategory', error)
        }
    }

    handlePickerChange(categoryName) {
        this.setState({pageNumber: 0, selectedCategory: categoryName})
        if(Platform.OS =='android') {
            this.handleGetAnimesByCategory()
        }   
    }

    componentDidMount() {
        this.handleGetAllCategory()
    }

    render() {
        return <>
            { !this.state.categoryList.length > 0 ? <Header {...this.props} title={'CATEGORIA'}></Header> :
                <Header {...this.props} >                                 
                        <RNPickerSelect 
                            useNativeAndroidPickerStyle={false}
                            style={{width : '100%' , height : 35}} 
                            doneText={'OK'} 
                            style={{
                                inputIOS: {
                                    fontSize: 18,
                                    color: '#fafafa',
                                    padding : 3,
                                    paddingTop: 10                                                 
                                },  
                                inputAndroid: {
                                    fontSize: 18,
                                    color: '#fafafa',
                                    padding : 3,
                                    paddingTop: 10  
                                }
                            }}
                            placeholder={{
                                label: 'Escolha a Categoria ...',
                                value: 'Romance',
                                color: '#000'
                            }}
                            onValueChange={(value) => this.handlePickerChange(value)}
                            items={this.state.categoryList}
                            onClose={() => this.handleGetAnimesByCategory()}
                        />
               </Header>}
            <Container >
            {this.state.listAnimes &&                       
                        <FlatList
                            data={this.state.listAnimes}
                            keyExtractor={(item, index) =>  item + index}
                            renderItem={({item : anime})=> {
                                return <MiniCard anime={anime}
                                            onPress={ () => this.props.navigation.navigate('Anime', { anime }) } 
                                        />
                            }}
                            numColumns={3}
                            onEndReached={() => this.handleGetAnimesByCategory()}
                            onEndReachedThreshold={0.5}
                        />

                    }
            </Container>
           </>
    }
}

export default Category