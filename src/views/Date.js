import React from 'react'
import {Platform} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import {RenderCard} from '../components'
import AxiosServices from '../services/AxiosService'

export default class AnimeYear extends React.Component {
    constructor(props) {
        super(props)
        this.yearNow = new Date().getFullYear()
        this.state = {
            listAnimes: [],
            pageNumber: 0,
            animeAge: this.yearNow,
        }
        this.ageList = Array(this.yearNow + 1 - 1980)
            .fill(this.yearNow)
            .map((year, index) => ({
                label: `${year - index}`,
                value: `${year - index}`,
                key: year - index,
            }))
        this.style = {
            width: '100%',
            height: 35,
            inputIOS: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
            inputAndroid: {fontSize: 18, color: '#fafafa', padding: 3, paddingTop: 10},
        }
        this.http = AxiosServices.getInstance()
    }

    async handleGetByYear(code) {
        try {
            const response = await this.http.findAnimesByYear(this.state.animeAge, this.state.pageNumber)
            if (this.state.listAnimes.length === 0 || code === true) {
                this.setState({listAnimes: response})
            } else {
                this.setState({
                    listAnimes: [...this.state.listAnimes, ...response],
                })
            }
            this.setState({pageNumber: this.state.pageNumber + 50})
        } catch (error) {
            this.http.saveError('handleGetByYear', error)
        }
    }

    handleOnPickerChange(year) {
        this.setState({pageNumber: 0, animeAge: year})
        if (Platform.OS === 'android') {
            this.handleGetByYear(true)
        }
    }

    componentDidMount() {
        this.handleGetByYear()
    }

    render() {
        return (
            <RenderCard {...this.props} list={this.state.listAnimes} method={() => this.handleGetByYear()}>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    doneText={'OK'}
                    style={this.style}
                    placeholder={{
                        label: 'Escolha um ano ...',
                        value: 2020,
                        color: '#000',
                    }}
                    onValueChange={(value) => this.handleOnPickerChange(value)}
                    items={this.ageList}
                    onClose={() => {
                        this.handleGetByYear(true)
                    }}
                />
            </RenderCard>
        )
    }
}
