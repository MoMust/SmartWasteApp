import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";
import { React, useState } from "react";
import { icons, images, COLORS, FONTS, SIZES } from "../constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../constants/RegistrationPage/input";
import Button from "../constants/RegistrationPage/button";
import Loader from "../constants/RegistrationPage/loader";
const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  let valid = true;

  // Check validation of user
  const validate = () => {
    Keyboard.dismiss();

    if (!inputs.email) {
      handleError("Var god ange email adress", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Var god ange en giltig email adress", "email");
      valid = false;
    }

    if (!inputs.username) {
      handleError("Var god ange en användarnamn", "username");
      valid = false;
    }

    if (!inputs.fullname) {
      handleError("Var god ange fullständig namn", "fullname");
      valid = false;
    }

    if (!inputs.phone) {
      handleError("Var god ange telefon nummer", "phone");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Var god ange ett lösenord", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("Lösenordet måste innehålla minst 5 tecken", "password");
      valid = false;
    }

    if (valid) {
      applyRegistration();
    }
  };
  // Set inputs to user
  const applyRegistration = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      try {
        // Save user to storage
        AsyncStorage.setItem("user", JSON.stringify(inputs));
        navigation.navigate("Login");
        console.log();
      } catch (error) {
        Alert.alert("Error", "Något gick fel");
      }
    }, 3000);
  };
  // Updates the state of user info in Inputs state, to what the user is typing
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
    console.log("working");
    console.log(text);
  };
  // Updates the state of error in error state, to show error
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ flex: 1, textAlign: "center" }}>
      <ImageBackground
        source={images.pastaSalad}
        resizeMode="contain"
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }}
      >
        {/* Loader */}
        <Loader visible={loading} />
        <ScrollView
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
          }}
        >
          {/* Main header */}
          <Text
            style={{ color: COLORS.white, fontSize: 40, fontWeight: "bold" }}
          >
            Registrera
          </Text>
          {/* Header */}
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Ange dina uppgifter
          </Text>
          {/* Input fields */}
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Input
              placeholder="exempel@hotmail.com"
              iconName={icons.regEmail}
              label="Email"
              error={errors.email}
              onFocus={() => {
                handleError(null, "email");
              }}
              onChangeText={(text) => handleOnChange(text, "email")}
            />
            <Input
              placeholder="Exempel: Spaghettipojken11"
              iconName={icons.regUser}
              label="Användarnamn"
              error={errors.username}
              onFocus={() => {
                handleError(null, "username");
              }}
              onChangeText={(text) => handleOnChange(text, "username")}
            />
            <Input
              placeholder="Namn och efternamn"
              iconName={icons.name}
              label="Namn"
              error={errors.fullname}
              onFocus={() => {
                handleError(null, "fullname");
              }}
              onChangeText={(text) => handleOnChange(text, "fullname")}
            />
            <Input
              keyboardType="numeric"
              placeholder="Exempel: 073 ** 67 110"
              iconName={icons.phone}
              label="Telefonnummer"
              error={errors.phone}
              onFocus={() => {
                handleError(null, "phone");
              }}
              onChangeText={(text) => handleOnChange(text, "phone")}
            />
            <Input
              placeholder="Minst 5 tecken"
              label="Lösenord"
              password
              iconName={icons.lock}
              error={errors.password}
              onFocus={() => {
                handleError(null, "password");
              }}
              onChangeText={(text) => handleOnChange(text, "password")}
            />
            {/* Button signup */}
            <Button
              title="Registrera dig"
              backgroundColor={"rgb(2, 102, 178)"}
              onPress={validate}
            />

            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                fontSize: 17,
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Har du redan ett konto? Logga in
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
// Get the dimension of user screen
const d = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,

    borderRadius: 5,
    marginBottom: 40,
  },
  modalText: {
    // borderBottomWidth: 2,
    color: "black",
    marginBottom: 100,
    fontSize: 30,
    fontWeight: "500",
  },
  backgroundColorGreen: {
    backgroundColor: "#2492FF",
  },
  borderWidth: {
    borderWidth: 0,
  },

  backgroundImage: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    width: d.width,
    height: d.height * 1.09,
  },
});

const Styles = StyleSheet.create({});

export default Register;
