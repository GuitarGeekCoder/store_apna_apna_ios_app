import { router } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet,Text, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper"; // Import components from React Native Paper
// import { getUniqueId } from "react-native-device-info";
export default function ForgotPasswordPage() {
    // State for form input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [passwordSection, setPasswordSection] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirm_password: "",
      }); // Single state for handling error messages
    async function handleForgot(){
      if (email){
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear error if email is valid
            // const deviceId = await getUniqueId();
            // console.log("Device ID:", deviceId);
            //here we send the backend flag to set this visible or not?
            setPasswordSection(true);
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address." }));
        }
      }else{
        setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address." }));
      }
    };
    async function handleNewPasswordSetup() {
        // Clear password errors before validation
        setErrors((prevErrors) => ({ ...prevErrors, password: "", confirm_password: "" }));

        // Validate password and confirm_password
        if (!password) {
        setErrors((prevErrors) => ({ ...prevErrors, password: "Password is required." }));
        } else if (password !== confirm_password) {
        setErrors((prevErrors) => ({ ...prevErrors, confirm_password: "Passwords do not match." }));
        } else {
        // Proceed with the password setup logic here
        console.log("Password setup successful");
        router.navigate("login")
        }
    }
return(
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/flog.png")} style={styles.imageBackground}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.title}>Set up New one</Text>
        { !passwordSection &&(
        <>
          <TextInput
            label="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            left={<TextInput.Icon icon="email"/>} // Optional: Add an icon to the left of the input
            keyboardType="email-address"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          <Button mode="contained" onPress={handleForgot} style={styles.button}>
          Request new password
          </Button>
        </>  
        )
        }
        {passwordSection && (<>
        
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            left={<TextInput.Icon icon="eye"/>} // Optional: Add an icon to the left of the input
          />
          {errors.password ? <Text style={[styles.errorText,styles.marginBottom20,styles.right80]}>{errors.password}</Text> : null}
          <TextInput
            label="Confirm Password"
            secureTextEntry
            value={confirm_password}
            onChangeText={setConfirmPassword}
            style={styles.input}
            left={<TextInput.Icon icon="eye"/>}
          />
          {errors.confirm_password ? <Text style={[styles.errorText,styles.marginBottom20,styles.right70]}>{errors.confirm_password}</Text> : null}

          <Button mode="contained" onPress={handleNewPasswordSetup} style={styles.button}>
          Set New Password 
          </Button>
        </>)}

          <View style={styles.buttonContainer}>
            <Button mode="text" onPress={()=>router.navigate("login")} style={styles.textButton} labelStyle={{ color: "#1c3149",fontWeight:"bold" }}>
              Found the old password?
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
  