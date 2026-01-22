import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { BiChevronLeft, BiChevronRight, BiUser } from 'react-icons/bi';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="bg-spotify-gray bg-opacity-90 backdrop-blur-lg h-16 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={() => navigate(1)}
          className="bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition"
        >
          <BiChevronRight size={24} />
        </button>
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black bg-opacity-70 rounded-full px-4 py-2">
              <BiUser size={20} />
              <span className="text-sm font-semibold">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-300 font-semibold hover:text-white transition"
            >
              Sign up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;