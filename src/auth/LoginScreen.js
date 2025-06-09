import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
//import { auth, db } from '../../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const logincheck = async () => {
  try {
    var url="https://www.dcdealz.com/MobileApi/mobile-check";
    const response = await fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },body: JSON.stringify({
     uname: email,
    pass: password
    
  })
});
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
  const handleLogin = async () => {
    setLoading(true);
    //if (!email || !password) return Alert.alert('Missing fields');
    
    try {
        var result=await logincheck();
        console.log(result);
        if (!result.user) return Alert.alert(result.message);
        Alert.alert(result.message +" "+result.user.name);

    //   if (userData.role === 'admin') navigation.navigate('AdminDashboard');
    //   else if (userData.role === 'consultancy') navigation.navigate('ConsultancyDashboard');
    //   else if (userData.role === 'candidate') navigation.navigate('CandidateDashboard');
    //   else Alert.alert('Unknown user role');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }finally {
   // hide loader
    setLoading(false); 
  }
  
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Login</Text>      
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Don't have an account? Register
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
