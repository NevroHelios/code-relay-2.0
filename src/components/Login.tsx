import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  role: 'admin' | 'user';
}

const Login: React.FC<LoginProps> = ({ role }) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use hardcoded passwords for this demo.
    if (role === 'admin') {
      if (password === 'admin123') {
        login('admin');
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      if (password === 'user123') {
        login('user');
      } else {
        alert('Invalid user credentials');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center">{role === 'admin' ? 'Admin Login' : 'User Login'}</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;