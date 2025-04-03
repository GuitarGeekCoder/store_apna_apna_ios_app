// import { useLocalSearchParams } from "expo-router";
// import React, { useState } from "react";
// import { ImageBackground, StyleSheet,Text, View,ScrollView } from "react-native";
// export default function StoreListPage() {
  //   const {name,age} = useLocalSearchParams()
  //   console.log('Url Params: ', name)
  //   return (
    //     <View>
    
    //     </View>
    //   );
    // }
import { router } from "expo-router";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { ImageBackground, StyleSheet,Text, View,ScrollView } from "react-native";
import { Card,Icon,TouchableRipple } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useSession } from "../../context/AuthProvider";
export default function StoreListPage() {
  const {name,age} = useLocalSearchParams()
  console.log('Url Params: ', name)
    const stores = [
      { key: "electronics", label: "Electronics" ,},
      { key: "clothing_fashion", label: "Clothing and Fashion", },
      { key: "food_beverages", label: "Food and Beverages" ,},
      // { key: "health_beauty", label: "Health and Beauty" ,},
      // { key: "home_furniture", label: "Home and Furniture", },
      // { key: "toys_games", label: "Toys and Games", },
      // { key: "books_stationery", label: "Books and Stationery" ,},
      // { key: "sports_outdoors", label: "Sports and Outdoors" ,},
      // { key: "automotive", label: "Automotive" ,},
    ];
    const {signOut} = useSession()
    async function handleLogout(){
      const response = await signOut()
      console.log("response logout",response)
    }
  return (
      <View style={styles.mainContainer}>
        <View style={styles.backimgContainer}>
            <ImageBackground source={require("../../assets/store.png")} style= {styles.imageBackground}></ImageBackground>
        </View>
        <Button mode="text" onPress={()=>handleLogout()} style={styles.textButton} labelStyle={{ color: "#1c3149",fontWeight: "bold", }}>
              logout
            </Button>
        {stores.length > 0 ?(

          <ScrollView contentContainerStyle={styles.scrollContainer}>
              {stores.map((item) => (
              <Card key={item.key} style={styles.card}>
                  <TouchableRipple onPress={() => router.push({
                      pathname:"storelists",
                      params:{
                          name:'shaanil',
                          age:30
                      }
                  })}>
                  <Card.Content style={styles.overlay}>
                  <View style={styles.row}>
                      <Text style={styles.cardText}>{item.label}</Text>
                      <View style={styles.iconCircle}>
                          <Icon source="chevron-right" size={24} color="#e1e4e7" />
                      </View>
                  </View>
                  </Card.Content>
                  </TouchableRipple>
              </Card>
              ))}
          </ScrollView>
        ):(
          <View>
            <Text>No store avail</Text>
          </View>
        )
        }
        
    </View>
  );
}
const styles = StyleSheet.create({
    mainContainer:{
        // marginTop:"13%",
        // height:"100%",
        flex:1,
        backgroundColor : "#a4becd",//"#82c1c7",
       
    },
    imageBackground: {
        // marginTop:"5%",
        width: "100%", // Set width
        height: "100%", // Set height
        position: "absolute",
    },
    backimgContainer:{
        width: "100%",
        height: 400,
    },  
    scrollContainer: { flexGrow: 1, justifyContent: "top", alignItems: "center", paddingVertical: 10, paddingTop: -400},
    card: {width: "90%", padding: 15,  backgroundColor: "transparent", overflow: "hidden",borderRadius: 10 },
    cardText: { fontSize: 18, fontWeight: "200", textAlign: "left" ,color:"#1c3149"},//color:"#ffd95b" },
    cardBackground: { width: "100%", height: 100, justifyContent: "center"},
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    iconCircle: { 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: "#1c3149",//"#e1e4e7",//"1c3149(255, 255, 255, 0.3)", 
        justifyContent: "center", 
        alignItems: "center" 
      },
      infoText: { 
        fontSize: 12, 
        fontWeight: "300", 
        textAlign: "center", 
        color: "white", 
        paddingHorizontal: 20, 
        marginBottom: 15 
      },
    

});
  