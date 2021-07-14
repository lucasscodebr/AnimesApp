import React from 'react'
import {ContainerVideo} from '../styles/components/videos'
import VideoPlayer from 'react-native-video-controls'

export class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {array: props.route.params.array}
        this.episode = props.route.params.episode
    }

    render() {
        console.log(this.episode, this.state.array[0].url)
        return (
            <ContainerVideo>
                <VideoPlayer source={{uri: this.state.array[0].url}} onBack={() => this.props.navigation.goBack()} onError={() => console.log('error')} />
            </ContainerVideo>
        )
    }
}
