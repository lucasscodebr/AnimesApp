import React from 'react'
import {Platform} from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #1a1a1a;
    width: 100%;
    height: auto;
    flex-direction: row;
`
export const ContainerInput = styled.View`
    background-color: rgb(43, 43, 43);
    width: 100%;
    height: 38px;
    padding: 2px 5px 5px 10px;
    border-radius: 5px;
    flex-direction: row;
    margin-top: 3px;
`
export const Button = styled.TouchableOpacity`
    width: 10%;
    padding: 3px;
`
export const Input = styled.TextInput`
    width: 90%;
    height: 36px;
    font-size: 15px;
    color: #00ff30;
`
