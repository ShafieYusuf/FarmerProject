import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaTractor } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ isLoggedIn, isAdmin, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeMenu();
    // In a real app, you would also handle token removal, API logout, etc.
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2" onClick={closeMenu}>
            <FaTractor className="text-primary text-2xl" />
            <span className="text-2xl font-bold text-primary">FarmRent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/equipment" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
            >
              Equipment
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
            >
              Contact
            </NavLink>
            {isLoggedIn && !isAdmin && (
              <NavLink 
                to="/bookings" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }
              >
                My Bookings
              </NavLink>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout}
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-3 z-50">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/equipment" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              Equipment
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>
            {isLoggedIn && !isAdmin && (
              <NavLink 
                to="/bookings" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }
                onClick={closeMenu}
              >
                My Bookings
              </NavLink>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                }
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}
            {!isLoggedIn ? (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="btn-primary text-center py-2"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 text-center rounded" 
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 