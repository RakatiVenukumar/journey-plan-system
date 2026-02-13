import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

export default function StoreDetail({
  store,
  onBack,
  onMarkVisited
}: any) {

  return (

    <View style={styles.container}>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {store.name}
      </Text>

      <Text>Code: {store.code}</Text>

      <Text>
        Address: {store.address}
      </Text>

      <Text>
        Phone: {store.phone}
      </Text>

      <Text>
        Status: {store.status}
      </Text>

      <Text>
        Notes: {store.notes}
      </Text>

      {

        store.status !== "Visited" && (

          <TouchableOpacity
            style={styles.button}
            onPress={() => {

              onMarkVisited(store.code);

              Alert.alert(
                "Visit Completed"
              );

            }}
          >

            <Text style={styles.buttonText}>
              Mark Visit Complete
            </Text>

          </TouchableOpacity>

        )

      }

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  back: {
    color: "blue",
    marginBottom: 10
  },

  button: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 10
  },

  buttonText: {
    color: "white",
    textAlign: "center"
  }

});
