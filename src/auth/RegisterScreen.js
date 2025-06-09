import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
//import { auth, db } from '../../firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [Cname, setCname] = useState(''); // default role
    const [loading, setLoading] = useState(false);
 
const registernewuser = async () => {
  try {
    var url="https://www.dcdealz.com/MobileApi/mobile-check-add";
    const response = await fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
     uname: email,
    pass: password,
    role:role,
    name:Cname
  }),
})
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }finally {
   // hide loader
    setLoading(false); 
  }
};
    
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

  const handleRegister = async () => {
   
setLoading(true);
    //if (!email || !password || !role) return Alert.alert('Missing fields');
    //if (!validateEmail()) return Alert.alert('User name is invalid');
    var result=await registernewuser();
    navigation.navigate('Login');
    //console.log(result);
    Alert.alert(result.message);
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   const uid = userCredential.user.uid;

    //   // Save role to Firestore
    //   await setDoc(doc(db, 'users', uid), {
    //     email,
    //     role,
    //     isVerified: role === 'consultancy' ? false : true, // only verify consultancy
    //   });

    //   Alert.alert('Registration Successful');
    //   navigation.navigate('Login');
    // } catch (error) {
    //   Alert.alert('Error', error.message);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput placeholder="User Name" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      
      <TextInput placeholder="Full Name"  value={Cname} onChangeText={setCname} style={styles.input} />
      {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (<Button title="Register" onPress={handleRegister} />)}
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Login 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { color: 'blue', marginTop: 15 },
});
