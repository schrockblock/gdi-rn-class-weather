/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, Container, Content, Input, InputGroup, Spinner } from 'native-base';

export default class Weather extends Component {
  constructor(props){
    super(props)

    this.state = { text: '2459115', temp: "--" }

    this.fetchWeather = this.fetchWeather.bind(this)
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.content}>
              {this.state.temp}
            </Text>
            <InputGroup style={{margin: 10}}>
              <Input style={{height: 40, alignSelf: 'center'}} 
                     value={this.state.text}
                     onChangeText={(text) => this.setState({text: text})}/>
            </InputGroup>
            <Button style={{alignSelf: 'center'}} onPress={this.fetchWeather}>
              <Text style={{color: "#FFFFFF"}}>Fetch Temp</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  fetchWeather(){
    const url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20=%20" + this.state.text + "&format=json"
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let temp = responseJson.query.results.channel.item.condition.temp
        this.setState({temp: temp.toString()})
      })
      .catch((error) => alert(JSON.stringify(error)))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color: "#FFFFFF",
  }
});

AppRegistry.registerComponent('Weather', () => Weather);
