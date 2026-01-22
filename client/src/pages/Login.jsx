import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/slices/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    const dummyUser = {
      _id: '1',
      name: formData.name || 'User',
      email: formData.email,
    };
    const dummyToken = 'dummy-token-123';

    dispatch(setUser(dummyUser));
    dispatch(setToken(dummyToken));
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-black to-spotify-gray flex items-center justify-center p-4">
      <div className="bg-spotify-light-gray p-8 rounded-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">Spotify Clone</h1>

        <div className="flex mb-6 bg-spotify-black rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              isLogin ? 'bg-spotify-green text-black' : 'text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              !isLogin ? 'bg-spotify-green text-black' : 'text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-spotify-black border border-gray-700 focus:border-spotify-green outline-none transition"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-spotify-black border border-gray-700 focus:border-spotify-green outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-spotify-black border border-gray-700 focus:border-spotify-green outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-spotify-green text-black font-bold py-3 rounded-full hover:scale-105 transition"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;