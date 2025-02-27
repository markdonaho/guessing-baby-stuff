import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if using the hardcoded admin credentials
      if (email === 'admin' && password === 'password') {
        // Use a valid email format for Firebase
        await signInWithEmailAndPassword(auth, 'admin@example.com', password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      toast.success('Login successful');
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      
      // If the hardcoded admin doesn't exist yet, create it
      if (email === 'admin' && password === 'password' && 
          (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential')) {
        try {
          await createUserWithEmailAndPassword(auth, 'admin@example.com', password);
          toast.success('Admin account created and logged in');
          navigate('/admin');
          return;
        } catch (createError) {
          console.error('Error creating admin account:', createError);
          toast.error('Could not create admin account. Please try again.');
        }
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              placeholder="Use 'admin@app.com' for the default account"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              placeholder="Use 'password' for the default account"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Default credentials: admin@app.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;