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
        const result = await this.http.findAnimesRecents()
        this.setState({list: result})
    }

    componentDidMount() {
        this.handleGetRecentAnimes()
    }

    render() {
        return <RenderCard {...this.props} title={'RECENTES'} list={this.state.list} />
    }
}
