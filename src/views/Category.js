import React from 'react'
import {Platform} from 'react-native'
import {RenderCard} from '../components'
import RNPickerSelect from 'react-native-picker-select'
import {AxiosServices} from '../services'

export default class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {categories: [], selected: 'Romance', page: 0, list: []}
        this.http = AxiosServices.getInstance()
        this.style = {
            width: '100%',
            height: 35,
            inputIOS: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
            inputAndroid: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
        }
    }

    async handleGetAllCategory() {
        const result = await this.http.findAllCategory()
        this.setState({categories: result.map((obj) => ({key: obj.id, label: obj.name, value: obj.name}))})
    }

    async handleGetAnimesByCategory() {
        const response = await this.http.findAllByCategory(this.state.selected, this.state.page)
        this.setState({list: [...this.state.list, ...response], page: this.state.page + 1})
    }

    handlePickerChange(categoryName) {
        this.setState({page: 0, selected: categoryName, list: []})
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
            <RenderCard {...this.props} list={this.state.list} method={() => this.handleGetAnimesByCategory()}>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    doneText={'OK'}
                    style={this.style}
                    placeholder={{label: 'Escolha a Categoria ...', value: 'Romance', color: '#000'}}
                    onValueChange={(value) => this.handlePickerChange(value)}
                    items={this.state.categories}
                    onClose={() => this.handleGetAnimesByCategory()}
                />
            </RenderCard>
        )
    }
}
