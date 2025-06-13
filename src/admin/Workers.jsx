import { Box, Button, Card, Group, Modal, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { apiRequest } from '../utils/api'
import dayjs from 'dayjs';
import {modals} from '@mantine/modals'

const Workers = () => {
  const [users,setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

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
  const handleViewUser = async (userId) => {
    try {
      const res = await apiRequest('GET',`/api/users/${userId}`,null)
      setSelectedUser(res.data.data[0]);
      setModalOpened(true);
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

const handleDeleteUser = (userId) => {
  modals.openConfirmModal({
    title: 'Confirm Deletion',
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete this user? This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: async () => {           
      try {
        const res = await apiRequest('DELETE',`/api/users/${userId}`,null)
        // Optionally remove user from local state to update UI
        setusers((prev) => prev.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user", error);
      }
    },
  });
};


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
                <Button onClick={()=>handleViewUser(user.id)} color="blue" variant="light">View</Button>
                <Button onClick={()=>handleDeleteUser(user.id)} color="red" variant="light">Delete</Button>
              </Group>
        </Card>
      ))}
      <Modal
  opened={modalOpened}
  onClose={() => setModalOpened(false)}
  title="User Details"
>
  {selectedUser ? (
    <div>
      <Text><strong>Name:</strong> {selectedUser.name}</Text>
      <Text><strong>Email:</strong> {selectedUser.email_id}</Text>
      <Text><strong>Phone:</strong> {selectedUser.phone_no}</Text>
      <Text><strong>Verified:</strong> {selectedUser.is_verified ? "Yes" : "No"}</Text>
      <Text><strong>Active:</strong> {selectedUser.is_active ? "Yes" : "No"}</Text>
      <Text><strong>Allow Notification:</strong> {selectedUser.isAllowNotification ? "Yes" : "No"}</Text>
      <Text><strong>Favorite Category:</strong> {selectedUser.favourite_category?.join(", ") || "None"}</Text>
      <Text><strong>Location:</strong> {selectedUser.location_lat}, {selectedUser.location_long}</Text>
      <Text><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</Text>
    </div>
  ) : (
    <Text>Loading...</Text>
  )}
</Modal>


      
    </Box>
  )
}

export default Workers
