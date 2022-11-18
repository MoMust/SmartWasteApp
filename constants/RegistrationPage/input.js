import { React, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { COLORS } from "../themes";

import { images, icons } from "..";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? "red" : isFocused ? "blue" : COLORS.lightGray,
          },
        ]}
      >
        <Image
          source={iconName}
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
          }}
        />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{ color: COLORS.darkgray, flex: 1 }}
          {...props}
        />
        {password && (
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed");
              setHidePassword(!hidePassword);
            }}
          >
            <Image source={hidePassword ? icons.view : icons.hide} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.darkgray,
  },
  inputContainer: {
    height: 55,
    backgroundColor: "rgb(212, 234, 251)",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 1,
    alignItems: "center",
  },
});

export default Input;