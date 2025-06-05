import React from 'react';
import { Card, Group, Text, Stack, Button, Box, Divider, Flex } from '@mantine/core';

const reports = [
  {
    user: 'Ramesh Kumar',
    type: 'Service Delay',
  },
  {
    user: 'Anjali Mehta',
    type: 'Incorrect Charges',
  },
  {
    user: 'Mohit Sharma',
    type: 'Worker Misbehavior',
  },
];

const Reports = () => {
  return (
    <Card withBorder radius="md" p="md">
      <Flex align="center" justify="space-between" mb="sm">
        <Text weight={600}>Reports & Complaints</Text>
        <Text>Resolve</Text>
      </Flex>
      <Divider mb="sm" />

      <Stack spacing="sm">
        {reports.map((report, index) => (
          <Box key={index}>
            <Flex align="center" justify="space-between">
              <Box>
                <Text weight={500}>{report.user}</Text>
                <Text size="xs" color="dimmed">{report.type}</Text>
              </Box>
              <Button size="xs"  color="#e0dcc5" radius="4px" c="#000" fw="500" h="25px" px="10px"  >
                Resolve
              </Button>
            </Flex>
            <Divider />
          </Box>
        ))}
      </Stack>
    </Card>
  );
};
//c9c5b1   e0dcc5

export default Reports;
