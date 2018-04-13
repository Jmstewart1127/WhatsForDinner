import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';

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
    console.log(this.state.places);
    console.log(this.state.randomPlace);
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  }

  _getOne() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this._getCurrentLocation()), 200)
    })
  }

  _getTwo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this._getPlaces()), 200)
    })
  }

  async _appStartUp() {
    await this._getOne();
    await this._getTwo();
  }
  
  componentDidMount() {
    // Promise.resolve(this._getCurrentLocation())
    // .then(() => Promise.resolve(this._getPlaces()))
    // this._getCurrentLocation();
    this._appStartUp();
    console.log(this.state.places);
    console.log(this.state.randomPlace);
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  }

  render() {
    const randomlySelectAPlace = () => { this._randomlySelectAPlace() }
    return(
      <View>
        <Text>{this.state.randomPlace}</Text>
        <Button
          onPress={randomlySelectAPlace}
          title="Whats For Dinner?"
          color="#841584"
        />
      </View>
    );
  }
}

export default PlaceButton;