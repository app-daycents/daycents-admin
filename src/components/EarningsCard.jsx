import React from 'react';
import { Card, Text, Group, Box, Flex, Divider } from '@mantine/core';

const earningsData = [
  { label: 'Daily Earnings', value: '₹5,200', color: 'green' },
  { label: 'Worker Payments', value: '₹4,000', color: 'blue' },
  { label: 'App Commission', value: '₹800', color: 'orange' },
];

const EarningsCard = () => {
  return (
    <Card withBorder radius="md" p="md" w="100%" bg="#07b862" pb="20px" >
      <Text fw="600" size='18px' mb="sm" c="#fff" >Earnings / Payments</Text>

      
        {earningsData.map((item, index) => (
          <Box>
          <Flex pb="12px" pt="12px" w="100%" key={index} align="center" justify="space-between" py={4}>
            <Text fw="400"  size="16px" c="#fff">{item.label}</Text>
            <Text fw="400" size="16px" c="#fff" weight={500} >
              {item.value}
            </Text>
          </Flex>
          <Divider />
          </Box>
        ))}
    </Card>
  );
};

// 07b862 00fa81

export default EarningsCard;
