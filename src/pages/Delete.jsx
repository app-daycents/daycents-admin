import React, { useState } from 'react'
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Stack,
  Paper,
  Alert,
} from '@mantine/core';
import axios from 'axios';


const Delete = () => {
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');
     
      
const handleLogin = async (phone_no, password) => {
  // Basic validation
  if (!phone_no || !password) {
    alert('phone number and password is required')
    return { success: false, message: 'Phone number and password are required.' };
  }

  if (!/^\d+$/.test(phone_no)) {
    alert('Phone number must be numeric.')
    return { success: false, message: 'Phone number must be numeric.' };
  }
else{
    try {
    const response = await axios.post(
      'https://api-daycents-backend.vercel.app/api/users/auth/login',
      {
        phone_no,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

      return {
      token: response.data.token.access_token,
      userId: response.data.user_id,
    };

  } catch (error) {
    const errMsg = error.message;
    console.error(errMsg);
    return { success: false, message: errMsg };
  }
}
  
};
      const handledelete = async () => {
  const authData = await handleLogin(email, password);
  if (!authData) return;

  try {
    const response = await axios.delete(
      `https://api-daycents-backend.vercel.app/api/users/${authData.userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.token}`,
        },
      }
    );
    console.log('Delete successful:', response.data);
    alert('User deleted successfully');
  } catch (error) {
    console.error('Delete failed:', error);
    alert('Delete failed. Try again.');
  }
};
    
  return (
     <Box maw={400} mx="auto" mt={150}>
          <Paper shadow="md" radius="md" p="xl" withBorder>
            <Title order={2} mb="md" align="center">Delete</Title>
            <Stack>
              <TextInput
                label="Phone"
                placeholder="+91 9876543210"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
              <Button fullWidth mt="md" color='#000' c="#fff" onClick={handledelete} >
                Delete
              </Button>
            </Stack>
          </Paper>
        </Box>
  )
}

export default Delete
