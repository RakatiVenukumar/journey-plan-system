import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

const USERS = [

  { username: "vansales01", password: "test123" },
  { username: "vansales02", password: "test123" },
  { username: "vansales03", password: "test123" },
  { username: "vansales04", password: "test123" }

];

export default function Login({ onLogin }: any) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    const user =
      USERS.find(
        u =>
          u.username === username &&
          u.password === password
      );

    if (user) {

      onLogin(username);

    } else {

      Alert.alert(
        "Invalid credentials"
      );

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Van Sales Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f1f5f9"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 6
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});
