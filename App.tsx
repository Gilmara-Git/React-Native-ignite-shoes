import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';


import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserEmailCreate , tagUserEmailDelete, tagsForDynamicMessages } from './src/notifications/notificationsTags';

// Colocar isso em variavel de ambiente e adicionar no gitignore

OneSignal.setAppId('31673c23-6859-4574-9e54-a942d1e712e6');
OneSignal.promptForPushNotificationsWithUserResponse();


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  
  tagUserEmailCreate('gilmara@gmail.com');
  tagUserEmailDelete();
  tagsForDynamicMessages('Gilmara', 'IgniteShoes', 'gilmara@gmail.com'); 


 useEffect(()=>{
  // This OneSignal method shows when user clicked on the notification when App is in background
  const subscription = OneSignal.setNotificationOpenedHandler(response=>{
  
    if(response.action){
      const { actionId}  =  response.action as any;
      console.log(actionId)

      switch(actionId){
        case '1':
          return console.log('Take me to my order, as I clicked in View order');
        case '2':
          return console.log('Take me to all orders, as I clicked in View all orders');
        default:  return console.log('None of the buttons were clicked')
          
      }
    }


  });

  return ()=> subscription; 

 },[]);
  
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

    </NativeBaseProvider>
  );
}