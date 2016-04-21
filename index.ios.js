import React, {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  } from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';


var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: [],
    }
  },
  render: function() {
    return <View style={styles.container}>
      <View style={[styles.header]}> 
        <View style={[styles.timerWrapper]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer]}>
          {this.laps()}
      </View>
    </View>
  },
  laps: function() {
    return this.state.laps.map(function(time, index) {
      return <View style={styles.lap} >
        <Text style={styles.lapText} >
          Lap #{index + 1} 
        </Text>
        <Text style={styles.lapText} >
          {formatTime(time)}
        </Text>
      </View>
    });
  },

  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight onPress={this.handleStartPress} underlayColor='gray'
            style={[styles.button, style]} >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
  },

  lapButton: function() {
    return <TouchableHighlight onPress={this.handleLapPress} underlayColor='gray' 
            style={styles.button} >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
  },

  handleStartPress: function() {

    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    } 

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      })      
    }, 30);

  },
  handleLapPress: function() {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]),
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1, //Fill the entire screen
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5, //takes up 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonWrapper: {
    flex: 3, //takes up 3/8ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  timer: {
    fontSize: 70,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  lapText : {
    fontSize: 30,
  },


});




AppRegistry.registerComponent('stopwatch1', () => StopWatch);



