import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

class PlaceButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      randomPlace: '',
      places: [],
    }
  }

  _getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  }

  _getPlaces() {
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
      + 'location=' + this.state.latitude + ',' + this.state.longitude + '&radius=9656'
      + '&type=restaurant&key=AIzaSyAqLTCsOOZ8JB_pjTjeadnRieYpZ9LSc4w')
    .then((response) => response.json())
    .then((responseJson) => {
      const placeNames = [];
      for (let i=0; i<responseJson.results.length; i++) {
        placeNames.push(responseJson.results[i].name);
        console.log(responseJson.results[i].name);
      }
      this.setState({
        places: placeNames
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  _randomlySelectAPlace = () => {
    let place = this.state.places[Math.floor(Math.random() * this.state.places.length)];
    this.setState({
      randomPlace: place
    });
  }

  _getLocationFirst() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this._getCurrentLocation()), 200)
    })
  }

  _getPlacesSecond() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this._getPlaces()), 200)
    })
  }

  async _appStartUp() {
    await this._getLocationFirst();
    await this._getPlacesSecond();
  }
  
  componentDidMount() {
    this._appStartUp();
  }

  render() {
    const randomlySelectAPlace = () => { this._randomlySelectAPlace() }
    return(
      <View>
        <Text style={styles.randomPlace}>{this.state.randomPlace}</Text>
        <Button
          onPress={randomlySelectAPlace}
          title="Whats For Dinner?"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = {
  randomPlace: {
    paddingTop: 50,
    paddingBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18,
  }
}

export default PlaceButton;