// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './pages/LoginForm';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import MainLayout from './layout/MainLayout';
import Pricing from './pages/Pricing';
import Mentors from './pages/Mentors';
import Markets from './pages/Markets';
import Userz from './pages/Userz';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Profile1 from './pages/Profile1';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <LoginForm />
            </>
          } />
          <Route path="/signup" element={
            <>
              <SignUp />
            </>
          } />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile1" element={<Profile1 />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/userz" element={<Userz />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
