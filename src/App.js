import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common/Index';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
    apiKey: "AIzaSyBl1Vhaef_ZQ-T8RhxugOW8ndi6iXxdZ94",
    authDomain: "authentication-d4d03.firebaseapp.com",
    databaseURL: "https://authentication-d4d03.firebaseio.com",
    projectId: "authentication-d4d03",
    storageBucket: "authentication-d4d03.appspot.com",
    messagingSenderId: "405207786909"
  })

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    }
    else {
      this.setState({ loggedIn: false })
    }
  });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View  style={{ height: 50 }} ><Button  onPress={() => firebase.auth().signOut()} >
            Log Out
          </Button></View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column'
      }}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
