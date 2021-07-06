import React from 'react'
import {FlatList, Platform} from 'react-native'
import {Header, MiniCard} from '../components'
import {Container} from '../styles/views/Category'
import RNPickerSelect from 'react-native-picker-select'
import AxiosServices from '../services/AxiosService'

export default class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            selected: 'romance',
            page: 0,
            list: [],
        }
        this.http = AxiosServices.getInstance()
        this.style = {
            width: '100%',
            height: 35,
            inputIOS: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
            inputAndroid: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
        }
    }

    async handleGetAllCategory() {
        try {
            const result = await this.http.findAllCategory()
            this.setState({
                categories: result.map((obj) => ({key: obj.id, label: obj.name, value: obj.slugify})),
            })
        } catch (error) {
            this.http.saveError('handleGetAllCategory', error)
        }
    }

    async handleGetAnimesByCategory() {
        try {
            const response = await this.http.findAllByCategory(this.state.selected, this.state.page)
            this.setState({
                list: response,
                page: this.state.page + 50,
            })
        } catch (error) {
            this.http.saveError('handleGetAnimesByCategory', error)
        }
    }

    handlePickerChange(categoryName) {
        this.setState({pageNumber: 0, selected: categoryName})
        if (Platform.OS === 'android') {
            this.handleGetAnimesByCategory()
        }
    }

    componentDidMount() {
        this.handleGetAllCategory()
        this.handleGetAnimesByCategory()
    }

    render() {
        return (
            <>
                {!this.state.categories.length > 0 ? (
                    <Header {...this.props} title={'CATEGORIA'} />
                ) : (
                    <Header {...this.props}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            doneText={'OK'}
                            style={this.style}
                            placeholder={{
                                label: 'Escolha a Categoria ...',
                                value: 'Romance',
                                color: '#000',
                            }}
                            onValueChange={(value) => this.handlePickerChange(value)}
                            items={this.state.categories}
                            onClose={() => this.handleGetAnimesByCategory()}
                        />
                    </Header>
                )}
                <Container>
                    {this.state.list && (
                        <FlatList
                            data={this.state.list}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item: anime}) => <MiniCard anime={anime} onPress={() => this.props.navigation.navigate('Anime', {anime})} />}
                            numColumns={3}
                            onEndReached={() => this.handleGetAnimesByCategory()}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </Container>
            </>
        )
    }
}
