import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTractor, 
  FaCalendarAlt, 
  FaUser, 
  FaBell, 
  FaCreditCard, 
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';

// Dashboard Components
import DashboardHome from './components/DashboardHome';
import ActiveRentals from './components/ActiveRentals';
import RentalHistory from './components/RentalHistory';
import UserProfile from './components/UserProfile';
import PaymentMethods from './components/PaymentMethods';
import Notifications from './components/Notifications';
import Settings from './components/Settings';

const FarmerDashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Extract the active tab from the URL
    const path = location.pathname.split('/');
    const currentTab = path[path.length - 1];
    if (currentTab && currentTab !== 'dashboard') {
      setActiveTab(currentTab);
    } else {
      setActiveTab('overview');
    }
  }, [location]);

  const handleLogout = () => {
    // Handle logout logic
    setIsLoggedIn(false);
    navigate('/login');
  };

  // Dashboard navigation items
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: <FaHome />, path: '/dashboard' },
    { id: 'active-rentals', label: 'Active Rentals', icon: <FaTractor />, path: '/dashboard/active-rentals' },
    { id: 'rental-history', label: 'Rental History', icon: <FaHistory />, path: '/dashboard/rental-history' },
    { id: 'profile', label: 'My Profile', icon: <FaUser />, path: '/dashboard/profile' },
    { id: 'payment-methods', label: 'Payment Methods', icon: <FaCreditCard />, path: '/dashboard/payment-methods' },
    { id: 'notifications', label: 'Notifications', icon: <FaBell />, path: '/dashboard/notifications' },
    { id: 'settings', label: 'Settings', icon: <FaCog />, path: '/dashboard/settings' },
  ];

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)]">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-3 p-2 mb-6">
                <div className="bg-primary text-white rounded-full p-2">
                  <FaUser />
                </div>
                <div>
                  <h2 className="font-bold">John Farmer</h2>
                  <p className="text-sm text-gray-600">Farmer Account</p>
                </div>
              </div>

              <nav>
                <ul>
                  {navItems.map((item) => (
                    <li key={item.id} className="mb-1">
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                          activeTab === item.id 
                            ? 'bg-primary text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-3 rounded-md w-full text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/active-rentals" element={<ActiveRentals />} />
                <Route path="/rental-history" element={<RentalHistory />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 