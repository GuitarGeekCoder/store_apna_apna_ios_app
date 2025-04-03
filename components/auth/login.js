import { router } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet,Text, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper"; // Import components from React Native Paper
import { useSession } from '../../context/AuthProvider';
export default function LoginPage() {
  const {signIn} = useSession()
    // State for form input values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setErrors] = useState({
        username:"",
        password:""
    });
    
    async function handleLogin() {
      if (username && password){
        setErrors((prevErrors) => ({ ...prevErrors, username: "", password: "" }));
        let response = await signIn(username,password)
        console.log("Respon:",response)
        if(response.status == 200){
          router.replace('/')
        }else{
          console.log("i am in else")
        }
        // router.navigate("dashboard")
        // login request will called
      }else{
            if (!username) {
                setErrors((prevErrors) => ({ ...prevErrors, username: "Username is required.", password: "" }));
            }else if (!password) {
                setErrors((prevErrors) => ({ ...prevErrors, username: "", password: "Password is required." }));
            }
        }
    };
return(

    <View style={styles.container}>

      <ImageBackground source={require("../../assets/flog.png")} style= {styles.imageBackground}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          {/* <ImageBackground source={require("../../assets/apna_logo.png")} style={styles.imageBackground}></ImageBackground> */}

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            left={<TextInput.Icon icon="account"/>} // Optional: Add an icon to the left of the input
            
          />
          {error.username ? <Text style={[styles.errorText,styles.right80,styles.marginBottom20]}>{error.username}</Text> : null}
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            left={<TextInput.Icon icon="eye"/>}
          />
            {error.password ? <Text style={[styles.errorText,styles.right80]}>{error.password}</Text> : null}
          <Button icon="arrow-right" mode="contained" onPress={handleLogin} style={styles.button} contentStyle={{ flexDirection: "row-reverse" }}>
            Log In
          </Button>
          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={()=>router.navigate("forgetpassword")} style={styles.textButton} labelStyle={{ color: "#1c3149",fontWeight: "bold", }}>
              Forgot Password?
            </Button>
            <Button mode="text" onPress={()=>router.navigate("signup")} style={styles.textButton} labelStyle={{ color: "#1c3149",fontWeight: "bold", }}>
            Register Now
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
      // backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background to enhance visibility
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
      backgroundColor : "#1c3149"//"#5aaefe",//"#007bff"
    },
    buttonContainer: {
      flexDirection: "row", // Align children horizontally (side by side)
      justifyContent: "space-between", // Distribute space between buttons
      width: "100%", // Take full width of the container
      marginTop: 20, // Add some space above the buttons
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: -20,
        right:40,
    },
    marginBottom20 :{
        marginBottom:20,
    },
    right70:{
        right:70,
    },
    right80:{
        right:80,
    }
  });
  