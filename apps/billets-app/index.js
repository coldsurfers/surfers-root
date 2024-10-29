/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import {applyConfig} from './src/lib/api/axiosClient';

if (__DEV__) {
  require('./src/lib/reactotronConfig');
}

messaging().setBackgroundMessageHandler(async message => {
  console.log(message);
});

applyConfig();
AppRegistry.registerComponent(appName, () => App);
