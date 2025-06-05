import { Anchor, Box, Container, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import '@mantine/core/styles.css'
import TopNavbar from '../components/TopNavbar'
import Numberinglist from '../components/Numberinglist'
import LiveJobFeed from '../components/LiveJobFeed'
import EarningsCard from '../components/EarningsCard'
import Reports from '../components/Reports'
import Analytics from '../components/Analytics'
import Home from '../admin/Home'
import Workers from '../admin/Workers'
import Jobs from '../admin/Jobs'
import Accounts from '../admin/Accounts'
import Owners from '../admin/Owners'
import { AuthContext } from '../context/AuthContext'

const Admin = () => {  

  const [current , setcurrent] = useState('Home');
  

  const rendercontent = ()=>{
    switch (current) {
      case "home":
        return <Home />;
      case "workers":
        return <Workers />;
      case "jobs":
        return <Jobs />;
      case "owners":
        return <Owners />;
      case "accounts":
        return <Accounts />;
      default:
        return <Home />;
    }
  }

  return (
    <Box  bg="#f7f7f7" px="50px" py="50px"  style={{borderRadius:'12px'}} >
      {/* top nav bar */}
      <Box height={60} py="12px" px="md" style={{ backgroundColor: '#1a2a3a', color: 'white',borderRadius:'10px 10px 0 0' }}>
            <Container size="xl" h="100%">
              <Flex align="center" justify="space-between" >
                <Title order={4} color="white">
                  Admin Panel
                </Title>
      
                <Group gap="30px">
                <Anchor
                      onClick={()=>setcurrent('home')}
                      size="sm"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Dashboard
                    </Anchor>
                    <Anchor
                      onClick={()=>setcurrent('workers')}
                      size="sm"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Workers
                    </Anchor>
                    <Anchor
                      onClick={()=>setcurrent('owners')}
                      size="sm"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Owners
                    </Anchor>
                    <Anchor
                      onClick={()=>setcurrent('jobs')}
                      size="sm"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      Jobs
                    </Anchor>
                    <Anchor
                      onClick={()=>setcurrent('accounts')}
                      size="sm"
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  </Anchor>
                </Group>
              </Flex>
            </Container>
          </Box>

          {/*end of nav bar */}
    
    <div>{rendercontent()}</div>
          
               </Box>
  )
}

export default Admin
