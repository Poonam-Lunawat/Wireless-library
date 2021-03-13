import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SearchScreen from './Screens/SearchScreen'
import TransactionScreen from './Screens/TransactionScreen'
import LoginScreen from './Screens/LoginScreen'

export default class App extends React.Component {
  render(){
  return (
      <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {
    screen :TransactionScreen,
    navigationOptions:{
      tabBarIcon: ()=>(<Image style = {{width :40, height:40} } source = {require ('./assets/book.png')}/>)
    }
  },
  Search : {
    screen: SearchScreen,
    navigationOptions:{
      tabBarIcon: ()=>(<Image style = {{width :40, height:40} } source = {require ('./assets/searchingbook.png')}/>)
    }}
})
 const SwitchNavigator = createSwitchNavigator(
   {
     LoginScreen : {screen : LoginScreen},
     TabNavigator : {screen : TabNavigator}
   }
 )
const AppContainer = createAppContainer(SwitchNavigator);

