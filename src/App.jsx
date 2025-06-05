import { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import Auth from './auth/auth';


function App() {
  return (
    <BrowserRouter>
    <MantineProvider>
    <Routes>
      <Route path='/' element={<Auth />} /> 
    </Routes>
    </MantineProvider>
    </BrowserRouter>
  )
}

export default App
