import { Button, Flex, Paper, Stack } from '@mantine/core'
import React, { useEffect } from 'react'
import TopNavbar from '../components/TopNavbar'
import Numberinglist from '../components/Numberinglist'
import LiveJobFeed from '../components/LiveJobFeed'
import Reports from '../components/Reports'
import EarningsCard from '../components/EarningsCard'
import Analytics from '../components/Analytics'
import axios from 'axios'

const Home = () => {
  
  return (
    <Paper py={20} w="100%" h="100%" bg="#fff"  style={{borderBottomRightRadius:12,borderBottomLeftRadius:12}}  >
     <Numberinglist />
     <Flex  px="xl" gap="15"  >
       <Stack w="100%" >
        <LiveJobFeed />
        <Reports />
       </Stack>
       <Stack w="100%" >
       <EarningsCard />
       <Analytics />
       </Stack>
     </Flex>
     </Paper>
  )
}

export default Home
