import { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import Auth from './auth/Auth';
import { ModalsProvider } from '@mantine/modals';
import Delete from './pages/Delete';


function App() {
  return (
    <BrowserRouter>
    <MantineProvider>
    <ModalsProvider>
    <Routes>
      <Route path='/' element={<Auth />} /> 
      <Route path='/delete' element={<Delete />} />
    </Routes>
    </ModalsProvider>
    </MantineProvider>
    </BrowserRouter>
  )
}

export default App
