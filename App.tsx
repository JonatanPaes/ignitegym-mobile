import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'
import { AuthContextProvider } from 'src/context/AuthContext'
import { THEME } from 'src/theme'

import { Loading } from '@components/Loading'

import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
