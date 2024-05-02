import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firebase from '../config/firebase';

const LoginComponent = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Para mostrar ou esconder a senha
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      if (email === '' || password === '') {
        alert("Preencha os campos");
        return;
      }

      // Autenticação com Firebase
      await firebase.auth().signInWithEmailAndPassword(email, password);
      
      // Se o login for bem-sucedido, navegue para a tela Home
      navigation.navigate('Home');
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={require('../../assets/logo-plus.png')}
      />
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder='Email'
        onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        value={password}
        placeholder='Sua senha'
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon
          icon={showPassword ? 'eye-off' : 'eye'}
          onPress={togglePasswordVisibility}
         />}
      />
      <Text
        style={styles.forgotPassword} onPress={() => navigation.navigate('EsqueceuSenha')}>
        Esqueceu a senha ?
      </Text>
      <Button
        style={styles.button}
        mode="contained" onPress={handleSignIn}>
        Entrar
      </Button>
      <View style={styles.footer}>
        <Text
          style={styles.createAccount}>
          Não tem uma Conta? <Text style={styles.textLink} onPress={() => navigation.navigate('Cadastro')}>Cadastre-se</Text>
        </Text>
      </View>
      
    </ View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingTop: '25%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1fb6ff',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 3,
  },
  Logo: {
    width: 250,
    height: 250,
  },
  button: {
    marginTop: 10,
    paddingVertical: 3,
    borderRadius: 20,
    width: '50%',
    backgroundColor: '#1fb6ff',
  },
  forgotPassword: {
    marginRight: '37.5%',
    fontSize: 17,
    color: '#1fb6ff',
    marginBottom: 20
  },
  createAccount: {
    fontSize: 17,
    marginVertical: 20
  },
  textLink: {
    color: '#1fb6ff',
  },
  input: {
    width: '75%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  }
});

export default LoginComponent;