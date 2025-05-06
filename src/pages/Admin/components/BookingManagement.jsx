import { useState } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown, FaEye, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

// Mock booking data
const mockBookings = [
  {
    id: 'B1001',
    equipmentId: 'E1001',
    equipmentName: 'John Deere 6155M Tractor',
    farmerName: 'John Smith',
    farmerEmail: 'john.smith@example.com',
    farmerPhone: '(555) 123-4567',
    startDate: '2023-08-15',
    endDate: '2023-08-18',
    totalDays: 3,
    totalAmount: 450,
    status: 'Completed',
    paymentStatus: 'Paid',
    createdAt: '2023-08-10'
  },
  {
    id: 'B1002',
    equipmentId: 'E1002',
    equipmentName: 'Kubota L3901 Compact Tractor',
    farmerName: 'Sarah Johnson',
    farmerEmail: 'sarah.j@example.com',
    farmerPhone: '(555) 987-6543',
    startDate: '2023-08-20',
    endDate: '2023-08-25',
    totalDays: 5,
    totalAmount: 550,
    status: 'Active',
    paymentStatus: 'Paid',
    createdAt: '2023-08-15'
  },
  {
    id: 'B1003',
    equipmentId: 'E1005',
    equipmentName: 'Massey Ferguson 4710 Tractor',
    farmerName: 'Robert Chen',
    farmerEmail: 'r.chen@example.com',
    farmerPhone: '(555) 333-2222',
    startDate: '2023-09-05',
    endDate: '2023-09-10',
    totalDays: 5,
    totalAmount: 675,
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    createdAt: '2023-08-28'
  },
  {
    id: 'B1004',
    equipmentId: 'E1003',
    equipmentName: 'Case IH Combine Harvester',
    farmerName: 'Lisa Martinez',
    farmerEmail: 'lisa.m@example.com',
    farmerPhone: '(555) 444-5555',
    startDate: '2023-10-01',
    endDate: '2023-10-05',
    totalDays: 4,
    totalAmount: 1300,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    createdAt: '2023-09-15'
  },
  {
    id: 'B1005',
    equipmentId: 'E1004',
    equipmentName: 'Kinze 3660 16 Row Planter',
    farmerName: 'David Wilson',
    farmerEmail: 'david.w@example.com',
    farmerPhone: '(555) 777-8888',
    startDate: '2023-10-10',
    endDate: '2023-10-12',
    totalDays: 2,
    totalAmount: 400,
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    createdAt: '2023-09-30'
  }
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Handle booking approval
  const approveBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'Approved' } : booking
    ));
    // Add success notification
    alert("Booking approved successfully");
  };

  // Handle booking rejection
  const rejectBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'Rejected' } : booking
    ));
    // Add success notification
    alert("Booking rejected");
  };

  // Handle view booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  // Handle close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality is applied directly through filtering
  };

  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.farmerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || 
        booking.status.toLowerCase() === statusFilter.toLowerCase();
      
      // Payment status filter
      const matchesPayment = paymentFilter === 'all' || 
        booking.paymentStatus.toLowerCase().includes(paymentFilter.toLowerCase());

      // Date filter (simplified for demonstration)
      let matchesDate = true;
      const today = new Date();
      const bookingStart = new Date(booking.startDate);
      
      if (dateFilter === 'upcoming') {
        matchesDate = bookingStart > today;
      } else if (dateFilter === 'ongoing') {
        const bookingEnd = new Date(booking.endDate);
        matchesDate = bookingStart <= today && bookingEnd >= today;
      } else if (dateFilter === 'past') {
        const bookingEnd = new Date(booking.endDate);
        matchesDate = bookingEnd < today;
      }
      
      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status badge styling
  const getPaymentBadgeClass = (status) => {
    if (status.toLowerCase().includes('paid')) {
      return 'bg-green-100 text-green-800';
    } else if (status.toLowerCase().includes('awaiting')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status.toLowerCase().includes('refunded')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Export Bookings
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Form */}
          <div>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* Status Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          {/* Payment Status Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="awaiting">Awaiting Payment</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          
          {/* Date Filter */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('id')}>
                  <div className="flex items-center">
                    Booking ID
                    {sortConfig.key === 'id' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3">Equipment</th>
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('startDate')}>
                  <div className="flex items-center">
                    Rental Period
                    {sortConfig.key === 'startDate' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('totalAmount')}>
                  <div className="flex items-center">
                    Amount
                    {sortConfig.key === 'totalAmount' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No bookings found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredBookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{booking.id}</td>
                    <td className="px-6 py-4">{booking.equipmentName}</td>
                    <td className="px-6 py-4">{booking.farmerName}</td>
                    <td className="px-6 py-4">
                      {booking.startDate} to {booking.endDate}
                      <div className="text-xs text-gray-500">({booking.totalDays} days)</div>
                    </td>
                    <td className="px-6 py-4">${booking.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          title="View Details"
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => viewBookingDetails(booking)}
                        >
                          <FaEye />
                        </button>
                        
                        {booking.status === 'Pending' && (
                          <>
                            <button 
                              title="Approve Booking"
                              className="text-green-600 hover:text-green-900"
                              onClick={() => approveBooking(booking.id)}
                            >
                              <FaCheck />
                            </button>
                            <button 
                              title="Reject Booking"
                              className="text-red-600 hover:text-red-900"
                              onClick={() => rejectBooking(booking.id)}
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        
                        {booking.paymentStatus === 'Awaiting Payment' && (
                          <span className="text-yellow-500" title="Payment Pending">
                            <FaExclamationTriangle />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeDetailsModal}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Booking Details</h4>
                <p><span className="text-gray-600">Start Date:</span> {selectedBooking.startDate}</p>
                <p><span className="text-gray-600">End Date:</span> {selectedBooking.endDate}</p>
                <p><span className="text-gray-600">Total Days:</span> {selectedBooking.totalDays}</p>
                <p><span className="text-gray-600">Created On:</span> {selectedBooking.createdAt}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Payment Information</h4>
                <p><span className="text-gray-600">Total Amount:</span> ${selectedBooking.totalAmount}</p>
                <p><span className="text-gray-600">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </p>
                <p><span className="text-gray-600">Payment Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadgeClass(selectedBooking.paymentStatus)}`}>
                    {selectedBooking.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-end space-x-3">
              {selectedBooking.status === 'Pending' && (
                <>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => {
                      rejectBooking(selectedBooking.id);
                      closeDetailsModal();
                    }}
                  >
                    Reject Booking
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => {
                      approveBooking(selectedBooking.id);
                      closeDetailsModal();
                    }}
                  >
                    Approve Booking
                  </button>
                </>
              )}
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={closeDetailsModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement; 