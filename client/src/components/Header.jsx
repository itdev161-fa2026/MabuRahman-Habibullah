import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          <h1>My Blog</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <>
              <Link to={`/users/${user.id}`} className="user-link">
                <Avatar src={user.avatarUrl} name={user.name} size={32} />
                <span>{user.name}</span>
              </Link>
              {/* Add Logout Button */}
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
