import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import { AddContacts } from './components/AddContacts';
import { EditContacts } from './components/EditContacts';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddContacts />} />
          <Route path="/edit/:id" element={<EditContacts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
