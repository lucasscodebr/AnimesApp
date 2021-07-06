import React from 'react'
import {RenderCard} from '../components'
import AxiosServices from '../services/AxiosService'

export default class Recent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listAnimes: [],
        }
        this.http = AxiosServices.getInstance()
    }

    async handleGetRecentAnimes() {
        try {
            const result = this.http.findAnimesRecents()
            this.setState({listAnimes: result})
        } catch (error) {
            this.http.saveError('handleGetRecentAnimes', error)
        }
    }

    componentDidMount() {
        this.handleGetRecentAnimes()
    }

    render() {
        return <RenderCard {...this.props} title={'RECENTES'} list={this.state.listAnimes} />
    }
}
