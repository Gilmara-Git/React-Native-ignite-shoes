import { HStack, Text, IconButton, CloseIcon, Icon , Pressable} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { OSNotification } from 'react-native-onesignal';
import * as Linking from 'expo-linking';

type Props = {
  data: OSNotification;
  onClose: () => void;
}

//All commented lines are about additionalData that we are replacing by DeepLinking
// type additionalDataProps = {
//   route?: string;
//   product_id?: string
// }

export function Notification({ data, onClose }: Props) {
  // const {navigate} = useNavigation();



  const handleOnPress = ()=>{
    // verify if inside data there is a launchURl (which is our Launch URL coming from OneSignal)
    if(data.launchURL){
      Linking.openURL(data.launchURL);
      onClose()
    }


  // if(data.additionalData === null){
  //  return  onClose();
  // }

  // const {route, product_id } = data.additionalData as additionalDataProps;
  // console.log(route, product_id)

  // if(route === 'details' && product_id){
  //   navigate('details', { productId: product_id});
  //   onClose();

  // }
};

  return (
    <Pressable  
        w="full"   
        p={4}  
        pt={12}  
        justifyContent="space-between" 
        alignItems="center"     
        bgColor="gray.200"
        position="absolute"
        top={0}
        onPress={handleOnPress}
        >
      <HStack  
      >
          <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2}/>

          <Text fontSize="md" color="black" flex={1}>
            {data.title}
          </Text>

        <IconButton 
          variant="unstyled" 
          _focus={{ borderWidth: 0 }} 
          icon={<CloseIcon size="3" />} 
          _icon={{ color: "coolGray.600"}} 
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}