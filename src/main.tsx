import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/vendors/bootstrap-icons/bootstrap-icons.css';
import './assets/js/bootstrap.bundle.min.js';

import { AuthProvider } from './contexts/AuthContext';

import HomeRoute from './components/auth/HomeRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

import DashboardHome from './pages/DashboardHome';
import Login from './pages/Login';
import Register from './pages/Register';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<HomeRoute />} />

          <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<Register />} />

          {/* Rotas autenticadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
