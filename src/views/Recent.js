import React from 'react'
import {RenderCard} from '../components'
import AxiosServices from '../services/AxiosService'

export default class Recent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {list: []}
        this.http = AxiosServices.getInstance()
    }

    async handleGetRecentAnimes() {
        try {
            const result = await this.http.findAnimesRecents()
            console.log('aqiui', result)
            this.setState({list: result})
        } catch (error) {
            this.http.saveError('handleGetRecentAnimes', error)
        }
    }

    componentDidMount() {
        this.handleGetRecentAnimes()
    }

    render() {
        return <RenderCard {...this.props} title={'RECENTES'} list={this.state.list} />
    }
}
