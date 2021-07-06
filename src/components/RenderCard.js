import React from 'react'
import {Header, MiniCard} from './'
import {FlatList} from 'react-native'
import {Container} from '../styles/views/Favorite'

export default class RenderCard extends React.Component {
    render() {
        return (
            <>
                <Header {...this.props} title={this.props.title}>
                    {this.props.children}
                </Header>
                <Container>
                    {this.props.list && (
                        <FlatList
                            data={this.props.list}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item: anime}) => <MiniCard anime={anime} onPress={() => this.props.navigation.navigate('Anime', {anime})} />}
                            numColumns={3}
                            onEndReached={this.props.method}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </Container>
            </>
        )
    }
}
