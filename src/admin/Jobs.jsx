import { Box, Card, Grid, Image, Modal, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {
  TextInput,
  FileInput,
  Button,
  Group,
  Title,
  Notification,
  Switch
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
  const [isEnabled, setIsEnabled] = useState(false);
    const [resdata, setresdata] = useState([]);
   const [current , setcurrent] = useState('1');
  const [totalpages , settotalpages] = useState("0");
    const [selectedPost, setSelectedUser] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

const fetchjobfeed = async () =>{
        try{
          const response = await apiRequest('GET',`/api/posts/?page=${current}`,null);
           setPosts(prev => {
  const existingIds = new Set(prev.map(post => post.id));
  const newPosts = response.data.data || [];
  const filteredNewPosts = newPosts.filter(post => !existingIds.has(post.id));
  return [...prev, ...filteredNewPosts];
});
           settotalpages(response.data.totalPages)
        }catch(error){
          console.log("error",error.message);
        }
      }
    useEffect(()=>{ 
      fetchjobfeed();
    },[])


     const loadmorepost = () => {
  const nextPage = (parseInt(current) + 1).toString();
  setcurrent(nextPage);
  fetchjobfeed();
}


    useEffect(()=>{
      const fetchishow =async ()=>{
        try{
          const res = await apiRequest('GET','/api/posts/is-show',null);
          setIsEnabled(res.data.data.is_show);
        }catch(error){
          console.log("error",error)
        }      
      }
      fetchishow();
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
  const handleToggle = async (checked)=> {
    setIsEnabled(checked);
    try{
      const statusres = await apiRequest('PATCH','/api/posts/is-show',{
        is_show : checked
      });
      console.log(statusres.data)
    }catch(error){
      console.log("error",error)
    }
  }

  useEffect(()=>{
    const fetchctegory = async ()=>{
      try {
        const res = await apiRequest('GET','/api/categories',null);
        const data = res.data.data;
        setresdata(data);
      }catch(error){
        console.log(error.message)
      }
    }
    fetchctegory();
  },[])

   const handleViewpost = async (postid) => {
      try {
        const res = await apiRequest('GET',`/api/posts/${postid}`,null)
        console.log(res.data.data)
        setSelectedUser(res.data.data);
        setModalOpened(true);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

  
  return (
    <Box py={20} px={40} w="100%" h="100%" bg="#fff"  style={{borderBottomRightRadius:12,borderBottomLeftRadius:12}}>
     <Group position="left" my={15} >
      <Title order={3} >Enable Post Feature</Title>
      <Switch
        checked={isEnabled}
        onChange={(event) => handleToggle(event.currentTarget.checked)}
        color="teal"
        size="md"
      />
      {
        isEnabled ? (<Text>post is turned on</Text>) : (<Text>Post feature is turned off</Text>)
      }
    </Group>
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

<Grid m={20} >
      {resdata.map((category) => (
        <Grid.Col key={category.id} span={2}>
          <Card  shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section m={12} >
              <Image
                src={category.url}
                w={100}
                alt={category.name}
                fit='cover'
              />
            </Card.Section>

            <Text ml={12} fw={500} size="lg" mt="md">
              {category.name.replace(/"/g, "")}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>

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
        <Button onClick={()=>handleViewpost(post.id)} color="blue" variant="light">View</Button>
        <Button color="red" variant="light" >Delete</Button>
      </Group>
    </Box>
    </Card>
  ))
}

<Button color='blue' onClick={loadmorepost} >Load more</Button>
 <Modal
  opened={modalOpened}
  onClose={() => setModalOpened(false)}
  title="User Details"
>
   {selectedPost ? (
    <>
      <Text><b>Title:</b> {selectedPost.title}</Text>
      <Text><b>Description:</b> {selectedPost.description}</Text>
      <Text><b>Status:</b> {selectedPost.status}</Text>
      <Text><b>Amount:</b> ₹{selectedPost.amount}</Text>
      <Text><b>No. of Workers:</b> {selectedPost.no_of_workers}</Text>
      <Text><b>Working Hours:</b> {selectedPost.working_hour}</Text>
      <Text><b>Mobile:</b> {selectedPost.mobile_no}</Text>
      <Text><b>Location:</b> {selectedPost.location_lat}, {selectedPost.location_long}</Text>
      <Text><b>Job Date:</b> {new Date(selectedPost.job_date).toLocaleString()}</Text>
    </>
  ) : (
    <Text>Loading...</Text>
  )}
</Modal>
        
    </Box>
  )
}

export default Jobs
