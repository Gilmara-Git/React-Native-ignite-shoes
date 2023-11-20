import { useEffect, useState} from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Notification  } from '../components/Notification';
import OneSignal,  { NotificationReceivedEvent, OSNotification} from 'react-native-onesignal';
// import * as Linking from 'expo-linking';

import { AppRoutes } from './app.routes';

const linking  = {
  prefixes : ['com.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details:{
        path: 'details/:productId',
        parse: {
          productId: (productId: string)=> productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [ notification, setNotification ] = useState<OSNotification>();
 
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  // const deepLinking = Linking.createURL('details',{
  //   queryParams: {
  //   productId: '7' 
  // }
  // }
  // );

  // console.log(deepLinking)

  useEffect(()=>{
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent)=>{
      const notificationContent = notificationReceivedEvent.getNotification();
      setNotification(notificationContent);
    })
    
    return () => unsubscribe;

  },[]);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {
      notification?.title &&
        <Notification data={notification}  onClose={()=>setNotification(undefined)}/>
    }
    </NavigationContainer>
  );
}