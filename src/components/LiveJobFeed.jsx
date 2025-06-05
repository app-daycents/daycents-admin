import React, { useEffect } from 'react';
import { Card, Group, Text, Badge, Stack, Anchor, Box, Flex, Divider } from '@mantine/core';
import { apiRequest } from '../utils/api';

const jobs = [
  {
    title: 'Pipe Installation',
    location: 'Jaipur',
    status: 'In Progress',
    type: 'default',
  },
  {
    title: 'Home Painting',
    location: 'Kolkata',
    status: 'Scheduled',
    type: 'success',
  },
  {
    title: 'Electrical Repair',
    location: 'Hyderabad',
    status: '80%',
    type: 'percent',
  },
];

const getStatusBadge = (status, type) => {
  switch (type) {
    case 'success':
      return <Badge color="green" variant="light">{status}</Badge>;
    case 'percent':
      return <Badge color="yellow" variant="light">{status}</Badge>;
    default:
      return <Badge color="blue" variant="light">{status}</Badge>;
  }
};

const LiveJobFeed = () => {

  return (
    <Card withBorder radius="md" p="md" w="100%" >
      <Flex align="center" justify="space-between" mb="sm">
        <Text weight={600}>LIVE JOB FEED</Text>
        <Anchor c="#000" size="sm" href="#">VIEW</Anchor>
      </Flex>

      <Stack spacing="sm">
        {jobs.map((job, index) => (
          <Box key={index}>
            <Flex mb="8px" justify="space-between" align="flex-start">
              <Box>
                <Text weight={500}>{job.title}</Text>
                <Text size="xs" color="dimmed">{job.location}</Text>
              </Box>
              {getStatusBadge(job.status, job.type)}
            </Flex>
            <Divider />
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

// 00fa81

export default LiveJobFeed;
