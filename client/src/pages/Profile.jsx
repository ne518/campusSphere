import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    if (window.confirm('Delete account permanently?')) {
      try {
        await api.delete('/auth/me');
        logout();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="profile">
      <h1>{user?.email}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
      <button 
        onClick={handleDeleteAccount}
        className="text-red-500"
      >
        Delete Account
      </button>
    </div>
  );
}