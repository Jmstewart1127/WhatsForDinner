import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import PlaceButton from './components/PlaceButton';

const store = configureStore({});

export default class App extends React.Component {
  render() {
    const store = configureStore({});
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <PlaceButton/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
