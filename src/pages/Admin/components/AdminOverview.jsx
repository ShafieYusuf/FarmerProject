import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTractor, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';
import apiService from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';

const AdminOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalEquipment: 0,
    pendingBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
    totalFarmers: 0,
    recentBookings: []
  });
  const toast = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Get all the data we need
      const [equipmentResponse, bookingsResponse, farmersResponse] = await Promise.all([
        apiService.getAllEquipment(),
        apiService.getAllBookings(),
        apiService.getAllFarmers()
      ]);

      if (equipmentResponse.success && bookingsResponse.success && farmersResponse.success) {
        const equipment = equipmentResponse.data;
        const bookings = bookingsResponse.data;
        const farmers = farmersResponse.success ? farmersResponse.data : [];

        // Calculate dashboard metrics
        const pendingBookings = bookings.filter(booking => booking.status === 'Pending').length;
        const activeBookings = bookings.filter(booking => booking.status === 'Confirmed').length;
        
        // Calculate total revenue from completed bookings
        const totalRevenue = bookings
          .filter(booking => booking.paymentStatus === 'Paid')
          .reduce((sum, booking) => sum + booking.totalAmount, 0);

        // Get recent bookings (last 5)
        const recentBookings = bookings
          .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
          .slice(0, 5);

        setDashboardData({
          totalEquipment: equipment.length,
          pendingBookings,
          activeBookings,
          totalRevenue,
          totalFarmers: farmers.length,
          recentBookings
        });
      } else {
        toast.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('An error occurred while loading dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-primary/10">
            <div className="flex items-center">
              <div className="p-2 bg-primary rounded-lg text-white">
                <FaTractor className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase">Total Equipment</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.totalEquipment}</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-2 border-t">
            <Link to="/admin/equipment" className="text-primary text-sm font-medium hover:underline">
              View all equipment
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-yellow-500/10">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500 rounded-lg text-white">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase">Pending Bookings</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.pendingBookings}</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-2 border-t">
            <Link to="/admin/bookings" className="text-yellow-500 text-sm font-medium hover:underline">
              View pending bookings
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-blue-500/10">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <FaUsers className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase">Total Customers</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.totalFarmers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-2 border-t">
            <Link to="/admin/farmers" className="text-blue-500 text-sm font-medium hover:underline">
              Manage customer accounts
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-green-500/10">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg text-white">
                <FaMoneyBillWave className="text-xl" />
              </div>
              <div className="ml-3">
                <h3 className="text-xs font-medium text-gray-500 uppercase">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-800">${dashboardData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-2 border-t">
            <Link to="/admin/settings" className="text-green-500 text-sm font-medium hover:underline">
              View financial reports
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-primary hover:underline text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3">Equipment</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBookings.length === 0 ? (
                <tr className="bg-white border-b">
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No recent bookings found
                  </td>
                </tr>
              ) : (
                dashboardData.recentBookings.map((booking) => (
                  <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{booking.farmerName}</td>
                    <td className="px-6 py-4">{booking.equipmentName}</td>
                    <td className="px-6 py-4">{booking.bookingDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.totalAmount > 0 ? `$${booking.totalAmount}` : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/admin/equipment/add"
            className="bg-primary/10 hover:bg-primary/20 p-4 rounded-lg flex items-center text-primary transition-colors"
          >
            <FaTractor className="mr-2" /> Add New Equipment
          </Link>
          <Link 
            to="/admin/bookings"
            className="bg-yellow-500/10 hover:bg-yellow-500/20 p-4 rounded-lg flex items-center text-yellow-600 transition-colors"
          >
            <FaCalendarAlt className="mr-2" /> Review Pending Bookings
          </Link>
          <Link 
            to="/admin/settings"
            className="bg-blue-500/10 hover:bg-blue-500/20 p-4 rounded-lg flex items-center text-blue-600 transition-colors"
          >
            <FaMoneyBillWave className="mr-2" /> Update Pricing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview; 