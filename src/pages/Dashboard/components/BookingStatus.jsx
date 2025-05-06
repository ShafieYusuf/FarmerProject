import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt, FaClock, FaTruck } from 'react-icons/fa';

// Mock booking data
const mockBookings = [
  {
    id: 'B5001',
    equipmentId: 'E010',
    equipmentName: 'New Holland T7 Tractor',
    equipmentImage: 'https://placehold.co/100x100?text=NH+Tractor',
    startDate: '2023-11-15',
    endDate: '2023-11-22',
    dailyRate: 245.00,
    totalPrice: 1715.00,
    status: 'confirmed',
    pickupLocation: '2750 Farm Equipment Rd, Des Moines, IA',
    pickupTime: '09:00 AM',
    contactPhone: '(515) 555-7890',
    ownerName: 'Iowa Agri Rentals',
    paymentStatus: 'paid',
    bookingNotes: 'Please bring valid ID and proof of insurance'
  },
  {
    id: 'B5002',
    equipmentId: 'E015',
    equipmentName: 'Grain Auger - Westfield MK130-74',
    equipmentImage: 'https://placehold.co/100x100?text=Auger',
    startDate: '2023-11-25',
    endDate: '2023-12-05',
    dailyRate: 95.00,
    totalPrice: 950.00,
    status: 'pending',
    pickupLocation: '1840 Agriculture Way, Cedar Rapids, IA',
    pickupTime: '10:30 AM',
    contactPhone: '(319) 555-4321',
    ownerName: 'Cedar Valley Equipment',
    paymentStatus: 'awaiting payment',
    bookingNotes: 'Owner approval pending'
  },
  {
    id: 'B5003',
    equipmentId: 'E022',
    equipmentName: 'Disc Harrow - Case IH 330 Turbo',
    equipmentImage: 'https://placehold.co/100x100?text=Disc+Harrow',
    startDate: '2023-12-10',
    endDate: '2023-12-17',
    dailyRate: 175.00,
    totalPrice: 1225.00,
    status: 'cancelled',
    pickupLocation: '5632 Farm Supply Rd, Sioux City, IA',
    pickupTime: '08:00 AM',
    contactPhone: '(712) 555-9876',
    ownerName: 'Western Iowa Implements',
    paymentStatus: 'refunded',
    bookingNotes: 'Cancelled due to equipment maintenance issues'
  },
  {
    id: 'B5004',
    equipmentId: 'E008',
    equipmentName: 'Fertilizer Spreader - New Leader L4330G4',
    equipmentImage: 'https://placehold.co/100x100?text=Spreader',
    startDate: '2023-12-20',
    endDate: '2023-12-27',
    dailyRate: 165.00,
    totalPrice: 1155.00,
    status: 'confirmed',
    pickupLocation: '3421 Rural Route 7, Davenport, IA',
    pickupTime: '09:30 AM',
    contactPhone: '(563) 555-2468',
    ownerName: 'Eastern Iowa Equipment Co.',
    paymentStatus: 'paid',
    bookingNotes: ''
  }
];

const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 800);
  }, []);

  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeFilter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="text-green-500 mr-2" />;
      case 'pending':
        return <FaExclamationTriangle className="text-yellow-500 mr-2" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500 mr-2" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'awaiting payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateDaysRemaining = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const handleBookingClick = (id) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {Array(3).fill().map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const countByStatus = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Status</h1>
      
      {/* Filter Tabs */}
      <div className="flex border-b">
        {[
          { key: 'all', label: 'All Bookings' },
          { key: 'confirmed', label: 'Confirmed' },
          { key: 'pending', label: 'Pending' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-medium text-sm relative ${
              activeFilter === tab.key
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveFilter(tab.key)}
          >
            {tab.label}
            <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
              activeFilter === tab.key ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
            }`}>
              {countByStatus[tab.key]}
            </span>
          </button>
        ))}
      </div>
      
      {/* No Results */}
      {filteredBookings.length === 0 && (
        <div className="bg-white border rounded-lg p-8 text-center">
          <p className="text-lg text-gray-600">No bookings found with the selected status.</p>
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-accent"
          >
            View All Bookings
          </button>
        </div>
      )}
      
      {/* Bookings */}
      {filteredBookings.length > 0 && (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div 
              key={booking.id}
              className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition ${
                expandedBooking === booking.id ? getStatusClass(booking.status) : ''
              }`}
            >
              {/* Booking Summary */}
              <div 
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                onClick={() => handleBookingClick(booking.id)}
              >
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="flex-shrink-0 h-16 w-16 mr-4">
                    <img 
                      src={booking.equipmentImage} 
                      alt={booking.equipmentName} 
                      className="h-16 w-16 rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClass(booking.paymentStatus)}`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-medium text-gray-900">{booking.equipmentName}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xl font-semibold">${booking.totalPrice.toFixed(2)}</div>
                  {booking.status === 'confirmed' && calculateDaysRemaining(booking.startDate) > 0 && (
                    <div className="text-sm text-green-600 mt-1">
                      Starts in {calculateDaysRemaining(booking.startDate)} days
                    </div>
                  )}
                  {booking.status === 'pending' && (
                    <div className="text-sm text-yellow-600 mt-1">Awaiting confirmation</div>
                  )}
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedBooking === booking.id && (
                <div className={`p-4 border-t ${getStatusClass(booking.status)}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Rental Details</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <FaCalendarAlt className="mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Rental Period</div>
                            <div className="text-sm text-gray-600">
                              {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
                            </div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaClock className="mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Pickup Time</div>
                            <div className="text-sm text-gray-600">{booking.pickupTime}</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaMapMarkerAlt className="mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Pickup Location</div>
                            <div className="text-sm text-gray-600">{booking.pickupLocation}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Owner Information</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <FaTruck className="mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Provider</div>
                            <div className="text-sm text-gray-600">{booking.ownerName}</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FaPhoneAlt className="mt-0.5 mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">Contact Phone</div>
                            <div className="text-sm text-gray-600">{booking.contactPhone}</div>
                          </div>
                        </li>
                      </ul>
                      
                      {booking.bookingNotes && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-1">Notes</h4>
                          <p className="text-sm text-gray-600 bg-white bg-opacity-50 p-2 rounded">
                            {booking.bookingNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <div className="text-sm text-gray-600">Daily Rate</div>
                        <div className="font-medium">${booking.dailyRate.toFixed(2)}/day</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Price</div>
                        <div className="font-medium text-lg">${booking.totalPrice.toFixed(2)}</div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex space-x-3">
                        {booking.status === 'confirmed' && (
                          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-accent">
                            Get Directions
                          </button>
                        )}
                        {booking.status === 'pending' && (
                          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            Cancel Booking
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
                            Contact Owner
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingStatus; 