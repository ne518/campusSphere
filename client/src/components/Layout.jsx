import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app-container">
      <header>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}