import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTractor, FaCalendarAlt, FaInfoCircle, FaBell, FaArrowRight } from 'react-icons/fa';

// Mock data
const mockStats = {
  activeRentals: 2,
  completedRentals: 8,
  upcomingRentals: 1,
  pendingApprovals: 2,
  totalSpent: 2450,
  notifications: 3
};

const mockRecentRentals = [
  {
    id: 1,
    equipmentName: 'John Deere 6150M Tractor',
    startDate: '2023-08-15',
    endDate: '2023-08-20',
    status: 'active',
    image: 'https://placehold.co/100x100?text=Tractor'
  },
  {
    id: 2,
    equipmentName: 'Valley Irrigation System',
    startDate: '2023-09-05',
    endDate: '2023-09-15',
    status: 'upcoming',
    image: 'https://placehold.co/100x100?text=Irrigation'
  },
  {
    id: 3,
    equipmentName: 'Seed Drill Machine',
    startDate: '2023-07-10',
    endDate: '2023-07-15',
    status: 'completed',
    image: 'https://placehold.co/100x100?text=Seeder'
  }
];

const mockNotifications = [
  {
    id: 1,
    message: 'Your booking for Valley Irrigation System has been confirmed',
    date: '2023-08-28',
    isRead: false
  },
  {
    id: 2,
    message: 'Reminder: Your rental for John Deere 6150M Tractor ends tomorrow',
    date: '2023-08-19',
    isRead: false
  },
  {
    id: 3,
    message: 'Special offer: 10% off on all irrigation equipment this week!',
    date: '2023-08-15',
    isRead: true
  }
];

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [recentRentals, setRecentRentals] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setRecentRentals(mockRecentRentals);
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return 'text-green-600';
      case 'upcoming':
        return 'text-blue-600';
      case 'completed':
        return 'text-gray-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-48 bg-gray-200 rounded mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Active Rentals</p>
              <p className="text-3xl font-bold text-green-700">{stats.activeRentals}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full text-green-700">
              <FaTractor />
            </div>
          </div>
          <Link to="/dashboard/active-rentals" className="text-sm text-green-700 hover:underline mt-2 inline-flex items-center">
            View all active rentals <FaArrowRight className="ml-1" size={12} />
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Rentals</p>
              <p className="text-3xl font-bold text-blue-700">{stats.completedRentals + stats.activeRentals}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full text-blue-700">
              <FaCalendarAlt />
            </div>
          </div>
          <Link to="/dashboard/rental-history" className="text-sm text-blue-700 hover:underline mt-2 inline-flex items-center">
            View rental history <FaArrowRight className="ml-1" size={12} />
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pendingApprovals}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-full text-yellow-700">
              <FaInfoCircle />
            </div>
          </div>
          <Link to="/dashboard/active-rentals" className="text-sm text-yellow-700 hover:underline mt-2 inline-flex items-center">
            View pending requests <FaArrowRight className="ml-1" size={12} />
          </Link>
        </div>
      </div>
      
      {/* Recent Rentals */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Rentals</h2>
          <Link to="/dashboard/rental-history" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rental Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRentals.map(rental => (
                <tr key={rental.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={rental.image} 
                          alt={rental.equipmentName} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {rental.equipmentName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`capitalize ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/bookings/${rental.id}`} 
                      className="text-primary hover:text-accent"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent Notifications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Notifications</h2>
          <Link to="/dashboard/notifications" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        
        <div className="space-y-3">
          {notifications.slice(0, 3).map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 border rounded-lg ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="flex justify-between">
                <p className={`text-sm ${notification.isRead ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 