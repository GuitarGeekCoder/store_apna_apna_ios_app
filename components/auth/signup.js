import { router } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet,Text, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper"; // Import components from React Native Paper
// import { getUniqueId } from "react-native-device-info";
export default function SignupPage() {
    // State for form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [errors,setErrors] = useState({
        email:"",
        city:"",
        password:""
    })
  
    async function handleSignup(){
      if (email && password && city){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear error if email is valid
            // const deviceId = await getUniqueId();
            // console.log("Device ID:", deviceId);
            //here we send the backend flag to set this visible or not?
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address.", city: "", password: "" }));
        }
        
      }else{
        if (!email){
            setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address.", password: "", city: ""  }));
        }else if(!city){
            setErrors((prevErrors) => ({ ...prevErrors, city: "Please choose valid city name.", email: "", password: ""  }));
        }else if(!password){
            setErrors((prevErrors) => ({ ...prevErrors, password: "please enter a valid password", city: "", email: "" }));
        }
      }
    };
return(

    <View style={styles.container}>
      <ImageBackground source={require("../../assets/flog.png")} style={styles.imageBackground}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Register Now!</Text>

          <TextInput
            label="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            left={<TextInput.Icon icon="email"/>} // Optional: Add an icon to the left of the input
            
          />
          {errors.email ? <Text style={[styles.errorText,styles.right40]}>{errors.email}</Text> : null}
          <TextInput
            label="city"
            value={city}
            onChangeText={setCity}
            style={styles.input}
            left={<TextInput.Icon icon="map"/>} // Optional: Add an icon to the left of the input
            
          />
          {errors.city ? <Text style={[styles.errorText,styles.right51]}>{errors.city}</Text> : null}
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            left={<TextInput.Icon icon="eye"/>}
          />
            {errors.password ? <Text style={[styles.errorText,styles.right55]}>{errors.password}</Text> : null}
          <Button icon="arrow-right" mode="contained" onPress={handleSignup} style={styles.button}contentStyle={{ flexDirection: "row-reverse" }}>
            Register
          </Button>
          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={()=>router.navigate("login")} style={styles.textButton} labelStyle={{ color: "#1c3149",fontWeight:"bold"  }}>
              Already have an account?
            </Button>
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderWidth:1,
    },
    imageBackground: {
      width: "100%", // Set width
      height: "100%", // Set height
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
    },
    formContainer: {
      padding: 40,
      borderRadius: 10,
      width: "100%",
      maxWidth: 400, // Optional: limit max width of form
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#1c3149",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      minWidth: 300,
      marginBottom: 20,
      backgroundColor:"None",
    },
    button: {
      marginTop: 20,
      width: "100%",
      backgroundColor : "#1c3149"
    },
    buttonContainer: {
      flexDirection: "row", // Align children horizontally (side by side)
      justifyContent: "space-between", // Distribute space between buttons
      width: "100%", // Take full width of the container
      marginTop: 10, // Add some space above the buttons
    },
    errorText: {
        color: "red",//"#ffd95b",
        fontSize: 14,
        marginTop: -20,
        marginBottom:20,
        right:40,
    },
    marginBottom20 :{
        marginBottom:20,
    },
    right40:{
        right:40,
    },
    right55:{
        right:55,
    },
    right51:{
        right:51,
    }
  });
  