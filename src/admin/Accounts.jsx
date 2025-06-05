import { Box, Button, Notification, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'
import { apiRequest } from '../utils/api';

const Accounts = () => {

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [tokenSent, setTokenSent] = useState(false);
const [accessToken, setAccessToken] = useState('');
const [loading, setLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');
const [successMsg, setSuccessMsg] = useState('');
const handleSendToken = async () => {
  try {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await apiRequest('POST','/api/admins/auth/register', {
      username,
      email,
      password,
    });
    setTokenSent(true);
    setSuccessMsg('Verification token sent to email.');
  } catch (err) {
    console.error(err);
    setErrorMsg(err.response?.data?.message || 'Failed to send token.');
  } finally {
    setLoading(false);
  }
};
const handleVerifyToken = async () => {
  try {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await apiRequest('GET',`/api/admins/auth/verify/${accessToken}`,null);

    setSuccessMsg('Admin user created successfully!');
    setUsername('');
    setEmail('');
    setPassword('');
    setAccessToken('');
    setTokenSent(false);
  } catch (err) {
    setErrorMsg(err.response?.data?.message || 'Token verification failed.');
  } finally {
    setLoading(false);
  }
};

  return (
   <Box py={20} px={40} w="100%" h="100%" bg="#fff"  style={{borderBottomRightRadius:12,borderBottomLeftRadius:12}}>
    <Text style={{fontSize:18,fontWeight:'500'}} >Register new Admin</Text>
  <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
  <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  <Button onClick={handleSendToken} m={10} loading={loading} disabled={!username || !email || !password}>
  Send Verification Token
  </Button>

  {tokenSent && (
  <>
    <TextInput
      label="Enter Access Token from Email"
      value={accessToken}
      onChange={(e) => setAccessToken(e.target.value)}
    />
    <Button onClick={handleVerifyToken} loading={loading} disabled={!accessToken}>
      Verify Token and Create Admin
    </Button>
  </>
)}

  {errorMsg && <Notification color="red">{errorMsg}</Notification>}
  {successMsg && <Notification color="green">{successMsg}</Notification>}
   </Box>
  )
}

export default Accounts
