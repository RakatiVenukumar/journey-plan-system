import React, { useState, useEffect } from "react";
import {
View,
Text,
FlatList,
TouchableOpacity,
StyleSheet
} from "react-native";

import journeyPlan from "../../journeyPlan.json";
import Login from "../login";
import CustomerDetail from "../customerDetail";

type Store = {
name:string;
code:string;
contact:string;
status:string;
};

export default function HomeScreen(){

const [user,setUser]=useState<string|null>(null);

const [stores,setStores]=useState<Store[]>([]);

const [tab,setTab]=useState<string>("Pending");

const [selected,setSelected]=useState<Store|null>(null);

useEffect(()=>{

if(user){

const plan=(journeyPlan as any[])
.find(p=>p.assignedUser===user);

if(plan){

setStores(plan.customers);

}

}

},[user]);

const logout=()=>{

setUser(null);

};

const markVisited=(code:string)=>{

const updated=stores.map(s=>

s.code===code
?{...s,status:"Visited"}
:s

);

setStores(updated);

setSelected(null);

};

if(!user){

return <Login onLogin={setUser}/>

}

if(selected){

return(

<CustomerDetail
customer={selected}
onBack={()=>setSelected(null)}
onMarkVisited={markVisited}
/>

);

}

const filtered=stores.filter(
s=>s.status===tab
);

return(

<View style={styles.container}>

<View style={styles.header}>

<Text style={styles.title}>
Journey Plan
</Text>

<TouchableOpacity onPress={logout}>
<Text style={styles.logout}>
Logout
</Text>
</TouchableOpacity>

</View>

<View style={styles.tabs}>

{["Pending","Visited","Missed"].map(t=>(

<TouchableOpacity
key={t}
onPress={()=>setTab(t)}
>

<Text style={
tab===t
?styles.activeTab
:styles.tab
}>
{t}
</Text>

</TouchableOpacity>

))}

</View>

<FlatList
data={filtered}
keyExtractor={item=>item.code}
renderItem={({item})=>(

<TouchableOpacity
onPress={()=>setSelected(item)}
>

<View style={styles.card}>

<Text style={styles.name}>
{item.name}
</Text>

<Text>
Customer Code: {item.code}
</Text>

<Text>
Contact: {item.contact}
</Text>

</View>

</TouchableOpacity>

)}
/>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
padding:15,
backgroundColor:"#f1f5f9"
},

header:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

title:{
fontSize:20,
fontWeight:"bold"
},

logout:{
color:"red"
},

tabs:{
flexDirection:"row",
marginBottom:10
},

tab:{
marginRight:15,
color:"gray"
},

activeTab:{
marginRight:15,
color:"#2563eb",
fontWeight:"bold"
},

card:{
backgroundColor:"#fff",
padding:15,
marginBottom:10,
borderRadius:10
},

name:{
fontWeight:"bold"
}

});
