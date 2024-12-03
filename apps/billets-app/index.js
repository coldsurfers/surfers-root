import messaging from '@react-native-firebase/messaging'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import App from './App'
import { name as appName } from './app.json'

// eslint-disable-next-line no-undef
if (__DEV__) {
  require('./src/lib/reactotronConfig')
}

messaging().setBackgroundMessageHandler(async (message) => {
  console.log(message)
})

AppRegistry.registerComponent(appName, () => App)
