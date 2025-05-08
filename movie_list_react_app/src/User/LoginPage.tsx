import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  interface LocationState {
    from?: string;
  }
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from || '/';

  const { setUser } = useUser();

  useEffect(() => {
    async function checkAuth() {
      try {
        await ky.get('/api/current-user', { credentials: 'include' });
        navigate(from, { replace: true });
      } catch {
        // Not authenticated, do nothing
      }
    }
    checkAuth();
  }, [navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await ky.post('/api/login', {
        json: { email, password },
        credentials: 'include',
      });
      const { user } = await ky.get('/api/current-user', { credentials: 'include' }).json<{ user: { email: string } }>();
      setUser(user);
      setError('');
      navigate(from, { replace: true });
    } catch {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 border border-gray-300 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign in</h1>
        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
            placeholder="Your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
