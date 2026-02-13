import React from "react";
import {
View,
Text,
TouchableOpacity,
StyleSheet
} from "react-native";

export default function CustomerDetail({
customer,
onBack,
onMarkVisited
}: any) {

return (

<View style={styles.container}>

<TouchableOpacity onPress={onBack}>
<Text style={styles.back}>← Back</Text>
</TouchableOpacity>

<View style={styles.card}>

<Text style={styles.name}>
{customer.name}
</Text>

<Text>Status: {customer.status}</Text>

<Text>Customer Code: {customer.code}</Text>

<Text>Sector: {customer.sector}</Text>

<Text>Town: {customer.town}</Text>

<Text>Category: {customer.category}</Text>

<Text>Contact: {customer.contact}</Text>

</View>

{customer.status !== "Visited" && (

<TouchableOpacity
style={styles.button}
onPress={() =>
onMarkVisited(customer.code)
}
>

<Text style={styles.buttonText}>
Mark Visit Complete
</Text>

</TouchableOpacity>

)}

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

back:{
color:"#2563eb",
marginBottom:15
},

card:{
backgroundColor:"#fff",
padding:15,
borderRadius:10
},

name:{
fontSize:20,
fontWeight:"bold",
marginBottom:10
},

button:{
marginTop:20,
backgroundColor:"#16a34a",
padding:12,
borderRadius:6
},

buttonText:{
color:"#fff",
textAlign:"center"
}

});
