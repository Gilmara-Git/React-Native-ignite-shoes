import OneSignal from "react-native-onesignal";


export const tagUserEmailCreate = (email: string) =>{
    OneSignal.sendTag('user_email', email)

};

export const tagUserEmailDelete = () =>{
    OneSignal.deleteTag('user_email')
};

export const tagsForDynamicMessages = (userName: string, appName: string, userEmail: string)=>{
    OneSignal.sendTags({
        user_name: userName,
        app_name: appName,
        user_email: userEmail
    })
};

export const tagForUpdatingAbandonedCart = (cartItemCount: string)=>{
    OneSignal.sendTag('cart_Items_count', cartItemCount);

};