import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import mapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

const Main = ({ navigation }) => {

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, [])

    if(!currentRegion) {
        return null;
    }


    return (
        <mapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={currentRegion}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/31252029?s=460&v=4' }} />

                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'AndreVTavares' })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>André Tavares</Text>
                        <Text style={styles.devBio}>Tentando programar desde que me formei.</Text>
                        <Text style={styles.devTechs}>ReactJS, Node.js, React Native</Text>
                    </View>
                </Callout>
            </Marker>
        </mapView>
    )
}

const styles = StyleSheet.create({

    map: {
        flex: 1,
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: "#666",
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5
    },

})

export default Main

