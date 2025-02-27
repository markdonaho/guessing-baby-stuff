import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FiHome, FiEdit, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md py-2' 
          : 'bg-primary-600 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled ? 'text-primary-600' : 'text-white'
          }`}>
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
              {/* Baby icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-8 h-8 mr-2"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                <path d="M13 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM11 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                <path d="M12 14c-2 0-3 1.5-3 2h6c0-.5-1-2-3-2z"/>
              </svg>
              <span>Guessing Baby Stuff</span>
            </Link>
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1">
              <li>
                <NavLink to="/" active={isActive('/')} scrolled={scrolled}>
                  <FiHome className="mr-1.5" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/predict" active={isActive('/predict')} scrolled={scrolled}>
                  <FiEdit className="mr-1.5" />
                  Make Prediction
                </NavLink>
              </li>
              
              {currentUser ? (
                <>
                  <li>
                    <NavLink to="/admin" active={isActive('/admin')} scrolled={scrolled}>
                      <FiUser className="mr-1.5" />
                      Admin Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className={`ml-2 flex items-center px-4 py-1.5 rounded-full ${
                        scrolled 
                          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200' 
                          : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                      } transition-all duration-200`}
                    >
                      <FiLogOut className="mr-1.5" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/login"
                    className={`ml-2 flex items-center px-4 py-1.5 rounded-full ${
                      scrolled 
                        ? 'bg-primary-600 text-white hover:bg-primary-700' 
                        : 'bg-white text-primary-600 hover:bg-opacity-90'
                    } transition-all duration-200 font-medium`}
                  >
                    <FiUser className="mr-1.5" />
                    Admin Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`${scrolled ? 'text-primary-600' : 'text-white'}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className={`flex flex-col space-y-2 pb-4 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            <MobileNavLink to="/" active={isActive('/')} onClick={() => setMobileMenuOpen(false)}>
              <FiHome className="mr-2" /> Home
            </MobileNavLink>
            <MobileNavLink to="/predict" active={isActive('/predict')} onClick={() => setMobileMenuOpen(false)}>
              <FiEdit className="mr-2" /> Make Prediction
            </MobileNavLink>
            
            {currentUser ? (
              <>
                <MobileNavLink to="/admin" active={isActive('/admin')} onClick={() => setMobileMenuOpen(false)}>
                  <FiUser className="mr-2" /> Admin Dashboard
                </MobileNavLink>
                <li>
                  <button 
                    onClick={handleLogout}
                    className={`w-full flex items-center px-4 py-2 rounded-md ${
                      scrolled 
                        ? 'bg-primary-100 text-primary-600 hover:bg-primary-200' 
                        : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                    }`}
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login"
                  className={`flex items-center px-4 py-2 rounded-md ${
                    scrolled 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-white text-primary-600 hover:bg-opacity-90'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUser className="mr-2" /> Admin Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

// Desktop navigation link component
const NavLink = ({ to, children, active, scrolled }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-1.5 rounded-md transition-all duration-200 ${
      active
        ? scrolled
          ? 'bg-primary-50 text-primary-700 font-medium'
          : 'bg-white bg-opacity-20 text-white font-medium'
        : scrolled
          ? 'text-gray-700 hover:bg-gray-100'
          : 'text-white hover:bg-white hover:bg-opacity-10'
    }`}
  >
    {children}
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, children, active, onClick }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-md ${
        active 
          ? 'bg-white bg-opacity-20 font-medium' 
          : 'hover:bg-white hover:bg-opacity-10'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  </li>
);

export default Header;