import { Box, Button, Card, Group, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { apiRequest } from '../utils/api'
import dayjs from 'dayjs';

const Workers = () => {
  const [users,setusers] = useState([]);
  useEffect(()=>{
    const fetchusers = async () =>{
      try{
        const res = await apiRequest("GET",'/api/users',null);
        setusers(res.data.data)
      }catch(error){
        console.log("error",error.message)
      }
    }
    fetchusers();
  },[])

  return (
    <Box py={20} px={40} w="100%" h="100%" bg="#fff"  style={{borderBottomRightRadius:12,borderBottomLeftRadius:12}}>
        <Title order={3} mb="md">User List</Title>
      {users.map(user => (
        <Card withBorder radius={10} mx={10} my={10} >
        <Box
          key={user.id}
          p="md"
          mb="md"
          shadow="sm"
          radius="md"
          sx={{ border: '1px solid #ccc', borderRadius: '12px' }}
        >
          <Text><strong>Name:</strong> {user.name || 'N/A'}</Text>
          <Text><strong>Phone No:</strong> {user.phone_no}</Text>
          <Text><strong>Email ID:</strong> {user.email_id || 'N/A'}</Text>
          <Text><strong>Role:</strong> {user.role}</Text>
          <Text><strong>Location Lat:</strong> {user.location_lat || 'N/A'}</Text>
          <Text><strong>Location Long:</strong> {user.location_long || 'N/A'}</Text>
          <Text><strong>Created At:</strong> {dayjs(user.createdAt).format('DD MMM YYYY, hh:mm A')}</Text>
        </Box>
        <Group mt="sm">
                <Button color="blue" variant="light">View</Button>
                <Button color="red" variant="light">Delete</Button>
              </Group>
        </Card>
      ))}
      
    </Box>
  )
}

export default Workers
