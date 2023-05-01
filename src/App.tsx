import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UsersDashboard from './pages/UsersDashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Welcome from 'pages/Welcome';
import { AppLayout } from 'pages/AppLayout';
import Login from 'pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<Welcome/>}/>
        <Route path='/users-dashboard' element={<UsersDashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
