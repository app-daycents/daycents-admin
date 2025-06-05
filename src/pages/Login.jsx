// src/auth/Login.jsx
import { useContext, useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Stack,
  Paper,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async() => {
    try {
      const response = await apiRequest('POST','/api/admins/auth/login',{
	email:email,
	password:password
})
      const accessToken = response.data.token;      
      login(accessToken);
      alert("successfully logged in...now reload this page...")

    }catch(error){
      console.log("error",error.message)
    }
  };

  return (
    <Box maw={400} mx="auto" mt={150}>
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Title order={2} mb="md" align="center">Login</Title>
        <Stack>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Username"
            placeholder="your username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <Button fullWidth mt="md" color='#000' c="#fff" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
