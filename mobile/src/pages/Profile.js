import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview'


const Profile = ({ navigation }) => {

    const githubUsername = navigation.getParams('github_username')

    return (
        <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }}/>
    )
}

export default Profile