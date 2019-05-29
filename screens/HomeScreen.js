import React from 'react'
import {
  StyleSheet,
  Button,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    location: {},
    fetchingLocation: false
  }

  render() {
    if (this.state.fetchingLocation) {
      return (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.activityIndicator}
        />
      )
    } else {
      const locationExists = Object.keys(this.state.location).length > 0
      return (
        <SafeAreaView style={styles.container}>
          <Button
            onPress={() => this.trackMe}
            style={styles.trackMeButton}
            title="Track Me"
          />
          {locationExists ? (
            <MapView
              style={{ width: '100%', height: 300 }}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              onRegionChange={this._handleMapRegionChange}
            >
              <MapView.Marker
                coordinate={this.state.location.coords}
                title="My Location"
                description="I am here"
              />
            </MapView>
          ) : (
            <Button
              onPress={() => this.locateMe()}
              style={styles.locateMeButton}
              title="Locate Me"
            />
          )}
        </SafeAreaView>
      )
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  trackMe = () => {}
  locateMe = () => {
    this.setState({ fetchingLocation: true })
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: position
        })
        this.setState({ fetchingLocation: false })
      },
      error => {
        Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        this.setState({ fetchingLocation: false })
      }
    )
  }
}

const styles = StyleSheet.create({
  trackMeButtonSection: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trackMeButton: {
    backgroundColor: 'blue',
    color: 'white'
  },
  activityIndicator: {
    marginTop: 200
  },
  container: {
    marginTop: 50,
    width: '100%',
    height: '90%'
  },
  mapContainer: {
    width: '100%',
    height: '70%'
  }
})
