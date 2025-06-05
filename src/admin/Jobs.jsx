import { Box, Card, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {
  TextInput,
  FileInput,
  Button,
  Group,
  Title,
  Notification,
} from '@mantine/core';
import { apiRequest } from '../utils/api';
import axios from 'axios';
import dayjs from 'dayjs';

const Jobs = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
const [posts, setPosts] = useState([]);

    useEffect(()=>{
      const fetchjobfeed = async () =>{
        try{
          const res = await apiRequest('GET','/api/posts',null);
          setPosts(res.data.posts);
          
        }catch(error){
          console.log("error",error.message);
        }
      }
      fetchjobfeed();
    },[])
  
  const handleSubmit = async () => {
    if (!categoryName || !image) {
      setErrorMsg("Please provide both category name and image");
      return;
    }

     const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('image', image); 

    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const token = await localStorage.getItem('accesstoken');

    const response = await axios.post('https://api-daycents-backend.vercel.app/api/categories', formData, {
      headers: {
        'Authorization': `Bearer ${token}`, // if required
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
    });
      console.log(response.data)
      setSuccessMsg('Category added successfully!');
      setCategoryName('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) =>{

  }
  return (
    <Box py={20} px={40} w="100%" h="100%" bg="#fff"  style={{borderBottomRightRadius:12,borderBottomLeftRadius:12}}>
       <Title order={3} mb="md">Add New Category</Title>

      {successMsg && (
        <Notification color="green" mb="sm">
          {successMsg}
        </Notification>
      )}

      {errorMsg && (
        <Notification color="red" mb="sm">
          {errorMsg}
        </Notification>
      )}

      <TextInput
        label="Category Name"
        placeholder="e.g. Electrician"
        value={categoryName}
        onChange={(e) => setCategoryName(e.currentTarget.value)}
        required
        mb="sm"
      />

      <FileInput
        label="Category Image"
        placeholder="Upload image"
        value={image}
        onChange={setImage}
        required
        mb="sm"
      />

      <Group position="right">
        <Button loading={loading} onClick={handleSubmit}>
          Add Category
        </Button>
      </Group>
      {
  posts?.map((post) => (
    <Card withBorder radius={10} my={10} >
    <Box  key={post.id} p="md" shadow="sm" withBorder mb="md" radius="md" sx={{
    border: '1px solid #ccc',
    borderRadius: '12px', // override if you want a custom radius
  }}>
      <Title order={5}>{post.title}</Title>
      <Text><strong>Description:</strong> {post.description}</Text>
      <Text><strong>Pincode:</strong> {post.pincode}</Text>
      <Text><strong>Amount:</strong> ₹{post.amount}</Text>
      <Text><strong>Mobile No:</strong> {post.mobile_no}</Text>
      <Text><strong>Working Hours:</strong> {post.working_hour}</Text>
      <Text><strong>No. of Workers:</strong> {post.no_of_workers}</Text>
      <Text><strong>Created At:</strong> {dayjs(post.createdAt).format('DD MMM YYYY, hh:mm A')}</Text>

      <Group mt="sm">
        <Button color="blue" variant="light">View</Button>
        <Button color="red" variant="light" onClick={() => handleDelete(post.id)}>Delete</Button>
      </Group>
    </Box>
    </Card>
  ))
}

        
    </Box>
  )
}

export default Jobs
