import React from 'react';
import {  Group, Title, Anchor, Container, Box, Flex } from '@mantine/core';


const TopNavbar = () => {
  return (
    <Box height={60} py="12px" px="md" style={{ backgroundColor: '#1a2a3a', color: 'white',borderRadius:'10px 10px 0 0' }}>
      <Container size="xl" h="100%">
        <Flex align="center" justify="space-between" >
          <Title order={4} color="white">
            Admin Panel
          </Title>

          <Group gap="30px">
          <Anchor
                href='#'
                size="sm"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Dashboard
              </Anchor>
              <Anchor
                href='#'
                size="sm"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Workers
              </Anchor>
              <Anchor
                href='#'
                size="sm"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Owners
              </Anchor>
              <Anchor
                href='#'
                size="sm"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Jobs
              </Anchor>
              <Anchor
                href='#'
                size="sm"
                style={{ color: 'white', textDecoration: 'none' }}
              >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
            </Anchor>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};

export default TopNavbar;
