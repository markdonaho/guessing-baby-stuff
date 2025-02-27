import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/shared/Header';
import ToastContext from './contexts/ToastContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Home from './pages/Home';
import PredictionForm from './pages/PredictionForm';
import Success from './pages/Success';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContext />
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<PredictionForm />} />
              <Route path="/success" element={<Success />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;