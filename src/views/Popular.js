import React from 'react'
import {RenderCard} from '../components'
import AxiosServices from '../services/AxiosService'

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.initialState = {listAnimes: [], pageNumber: 0}
        this.state = {...this.initialState}
        this.http = AxiosServices.getInstance()
    }

    async handleGetPopularAnimes() {
        try {
            const response = this.http.findAnimesRecents()
            if (this.state.listAnimes.length === 0) {
                this.setState({listAnimes: response})
            } else {
                this.setState({
                    listAnimes: [...this.state.listAnimes, ...response],
                })
            }
            this.setState({pageNumber: this.state.pageNumber + 50})
        } catch (error) {
            this.http.saveError('handleGetPopularAnimes', error)
        }
    }

    componentDidMount() {
        this.handleGetPopularAnimes()
    }

    render() {
        return <RenderCard {...this.props} title={'POPULAR'} list={this.state.listAnimes} method={() => this.handleGetPopularAnimes()} />
    }
}

export default Popular
