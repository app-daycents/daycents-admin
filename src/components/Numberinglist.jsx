import React, { useEffect, useState } from 'react';
import { Card, SimpleGrid, Text, Title } from '@mantine/core';
import { apiRequest } from '../utils/api';



const Numberinglist = () => {

  const [workersnos , setworkernos] = useState('');
  const [jobcount,setjobcount] = useState('')

const stats = [
  { title: 'TOTAL REGISTR: WORKERS', value: workersnos, color: '#04537d' },
  { title: 'ACTIVE JOBS TODAY', value: jobcount, color: '#02a193' },
  { title: 'COMPLETED JOBS', value: '25', color: 'cyan.7' },
  { title: 'OVERALL COMPLETED', value: '500', color: 'green.7' },
];

useEffect(()=>{
  const fetchworkercounts = async ()=>{
    try{
      const workerres = await apiRequest('GET','/api/admins/users/count',null)
      setworkernos(workerres.data.count)
    }catch(error){
      console.log("error",error.message)
    }
  }
  const fetchjobcount = async ()=>{
    try{
      const jobres = await apiRequest('GET','/api/admins/jobs/count',null)
      setjobcount(jobres.data.job_count);
    }catch(error){
      console.log("error",error.message)
    }
  }
  fetchworkercounts();
  fetchjobcount();
})


  return (
    <SimpleGrid  cols={4} spacing="lg" mt="md" px="xl" mb="md" >
      {stats.map((stat, index) => (
        <Card key={index} radius="md" p="lg" bg={stat.color}  style={{ backgroundColor: `var(--mantine-color-${stat.color})` }} withBorder>
          <Text my="10px" size="16px" fw="400" color="#fff" transform="uppercase">
            {stat.title}
          </Text>
          <Text mb="10px" size='28px' fw="500" color="#fff" >{stat.value}</Text>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Numberinglist;
