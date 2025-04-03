// import { Slot } from "expo-router";
// import Page from "./(app)";
// import { Text } from "react-native";
// import { PaperProvider } from 'react-native-paper';
// export default function RootLayout(){
//     return<>
//     <PaperProvider>
//         <Slot/>
//     </PaperProvider>
    
//     </>
// }
import { Slot, Stack } from 'expo-router';
import store from '../redux/store.js'
import { Provider } from 'react-redux';
// import LogoContainer from '../components/Dashboard/LogoContainer.js';
// import { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SessionProvider } from '../context/AuthProvider.js';
export default function MainLayout() {

  return  (
        <Provider store={store}>
              <PaperProvider>
                    <SessionProvider>
                        {/* <LogoContainer orientation={orientation}/> */}
                        <Slot/>
                    </SessionProvider>
              </PaperProvider>
         </Provider>
  )
  
}
