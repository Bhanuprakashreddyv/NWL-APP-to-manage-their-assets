import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AppStyle from './AppStyle';
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper"

function HomeScreen({ navigation }) {
    return (
        <KeyBoardAvoidingWrapper>
            <View style={AppStyle.container}>
                <StatusBar style="dark" />

                <TouchableOpacity style={AppStyle.imgContainer}>
                    <Image style={AppStyle.image} source={require('../assets/sites.png')}></Image>
                    <View style={AppStyle.textContainer}>
                        <Text style={AppStyle.text}>Site</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={AppStyle.imgContainer}>
                    <Image style={AppStyle.image} source={require('../assets/newinspection.png')}></Image>
                    <View style={AppStyle.textContainer}>
                        <Text style={AppStyle.text}>New Inspection</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={AppStyle.imgContainer}>
                    <Image style={AppStyle.image} source={require('../assets/reports.png')}></Image>
                    <View style={AppStyle.textContainer}>
                        <Text style={AppStyle.text}>Report</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyBoardAvoidingWrapper>

    );
}

export default HomeScreen