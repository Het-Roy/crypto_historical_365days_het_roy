import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Failed to login. Please check your credentials.');
      }
    } catch (err) {
      if (err?.response?.data) {
        setError(err.response.data.error || err.response.data.message || 'Invalid credentials.');
      } else if (err?.code === 'ERR_NETWORK' || !err?.response) {
        setError('Cannot connect to server. Please make sure the backend is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-md bg-card p-8 rounded-xl border border-border shadow-md">
        <h2 className="text-2xl font-bold text-textMain mb-6 text-center">Log In</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-textMain focus:outline-none focus:border-accentBlue"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-textMain focus:outline-none focus:border-accentBlue"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accentBlue hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-textMuted">
          Don't have an account? <Link to="/register" className="text-accentBlue hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
