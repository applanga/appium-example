import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, View, Button, NativeModules, ActivityIndicator} from 'react-native';
import {Applanga} from 'applanga-react-native';
import {initLocalisations,getString} from './LocalisationManager.js';

const styles = StyleSheet.create({

  buttonHolder: {
   	flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3199D5',
    height: 400
  },
  baseText: {
    fontFamily: 'Cochin',
    color: 'white',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },
  
});

export default class App extends Component {

	constructor(){
		super();
		this.state = {
      		applangaInitialized: false,
			  recreateViews:true,
			  page2:false
			  
		}
		
		initLocalisations(() =>{
			this.page1Text = getString("label-1")
			this.page2Text = getString("label-2")
			this.buttonText = getString("button-text")
			this.setState({applangaInitialized: true});		   
    	});
	}

  	render() {
		if(this.state.applangaInitialized)
		{
			if(!this.state.page2)
			{
				return(
					<View style={styles.buttonHolder}>
						<Text style={styles.titleText}>
							{this.page1Text}
						</Text>
						<Button
							title={this.buttonText}
							onPress={() => this.setState({page2: true})	}
						/>
					</View>
				);
			}
			else
			{
				return(
					<View style={styles.buttonHolder}>
						<Text style={styles.titleText}>
							{this.page2Text}
						</Text>
					</View>
				);
			}
		}
		else
		{
			return(
	      		<View style={styles.buttonHolder}>
			      	<Text style={styles.titleText}>
			          	"Waiting for applanga to init"
			        </Text>		             
	      		</View>
      		);
		}
  	}
}
