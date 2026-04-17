import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      handleLogin(data.user, data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Login Admin</h2>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;
