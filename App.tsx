import { StatusBar, View } from 'react-native'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'

import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* {fontsLoaded ? <View /> : <Loading />} */}
      <Loading />
    </NativeBaseProvider>
  )
}
