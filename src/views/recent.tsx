import React from 'react'
import {RenderCard} from '../components'
import {AxiosService} from '../services'

export class Recent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {list: []}
        this.http = AxiosService.getInstance()
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
