import React from 'react';
import { Card, Group, Text, Stack, Badge, Box, Divider, Flex } from '@mantine/core';

const insights = [
  {
    label: 'Total Users',
    value: '6,400',
    badge: '+8.2% this month',
    color: 'green',
  },
  {
    label: 'Monthly Job Growth',
    value: '1,280',
    badge: '+5.1% vs last month',
    color: 'blue',
  },
  {
    label: 'Avg Completion Time',
    value: '2.3 hrs',
    badge: '↓ 0.4 hrs',
    color: 'yellow',
  },
];

const Analytics = () => {
  return (
    <Card withBorder radius="md" p="md">
      <Text weight={600} mb="sm">Analytics & Insights</Text>
      <Divider mb="sm" />

      <Stack spacing="sm">
        {insights.map((item, index) => (
          <Box key={index}>
            <Flex align="center" justify="space-between">
              <Box>
                <Text weight={500}>{item.label}</Text>
                <Text size="sm" color="dimmed">{item.value}</Text>
              </Box>
              <Badge color={item.color} variant="light">
                {item.badge}
              </Badge>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default Analytics;
