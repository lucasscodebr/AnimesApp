import React from 'react'
import {Platform} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {RenderCard} from '../components'
import {AxiosService} from '../services'

export class DateView extends React.Component {
    constructor(props) {
        super(props)
        this.yearNow = new Date().getFullYear()
        this.state = {list: [], page: 0, animeAge: this.yearNow}
        this.animeAgesList = Array(this.yearNow + 1 - 1980)
            .fill(this.yearNow)
            .map((year, index) => ({label: '' + (year - index), value: '' + (year - index), key: year - index}))
        this.style = {
            width: '100%',
            height: 35,
            inputIOS: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
            inputAndroid: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
        }
        this.http = AxiosService.getInstance()
    }

    async handleGetByYear(code) {
        const response = await this.http.findAnimesByYear(this.state.animeAge, this.state.page)
        if (this.state.list.length === 0 || code === true) {
            this.setState({list: response})
        } else {
            this.setState({list: [...this.state.list, ...response]})
        }
        this.setState({page: this.state.page + 1})
    }

    handleOnPickerChange(year) {
        this.setState({page: 0, animeAge: year})
        if (Platform.OS === 'android') {
            this.handleGetByYear(true)
        }
    }

    componentDidMount() {
        this.handleGetByYear()
    }

    render() {
        return (
            <RenderCard {...this.props} list={this.state.list} method={() => this.handleGetByYear()}>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    doneText={'OK'}
                    style={this.style}
                    placeholder={{label: 'Escolha um ano ...', value: this.yearNow, color: '#000'}}
                    onValueChange={(value) => this.handleOnPickerChange(value)}
                    items={this.animeAgesList}
                    onClose={() => {
                        this.handleGetByYear(true)
                    }}
                />
            </RenderCard>
        )
    }
}
