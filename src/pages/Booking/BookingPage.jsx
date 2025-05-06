import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaTractor, FaClock, FaCheck, FaTimes, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import equipmentImages from '../../assets/images/equipment/equipmentImages';

// Mock booking data
const mockBookings = [
  {
    id: 1,
    equipmentId: 1,
    equipmentName: 'John Deere 6150M Tractor',
    equipmentImage: equipmentImages.johnDeereTractor.main,
    startDate: '2023-06-20',
    endDate: '2023-06-25',
    rentalPeriod: 'daily',
    totalPrice: 900,
    status: 'confirmed',
    location: 'Central Farm Depot'
  },
  {
    id: 2,
    equipmentId: 3,
    equipmentName: 'Valley Irrigation System',
    equipmentImage: equipmentImages.irrigation.main,
    startDate: '2023-07-10',
    endDate: '2023-07-20',
    rentalPeriod: 'daily',
    totalPrice: 900,
    status: 'pending',
    location: 'Central Farm Depot'
  },
  {
    id: 3,
    equipmentId: 5,
    equipmentName: 'Kubota L3301 Compact Tractor',
    equipmentImage: equipmentImages.kubotaTractor.main,
    startDate: '2023-05-15',
    endDate: '2023-05-20',
    rentalPeriod: 'weekly',
    totalPrice: 600,
    status: 'completed',
    location: 'Eastern Equipment Center'
  }
];

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, completed, pending

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 500);
  }, []);

  const cancelBooking = (bookingId) => {
    // In a real app, this would call an API to cancel the booking
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    
    if (confirmed) {
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? {...booking, status: 'cancelled'} 
            : booking
        )
      );
    }
  };

  const getFilteredBookings = () => {
    switch(filter) {
      case 'upcoming':
        return bookings.filter(b => 
          (b.status === 'confirmed' || b.status === 'pending') && 
          new Date(b.endDate) >= new Date()
        );
      case 'completed':
        return bookings.filter(b => b.status === 'completed');
      case 'pending':
        return bookings.filter(b => b.status === 'pending');
      case 'cancelled':
        return bookings.filter(b => b.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Link to="/home" className="inline-flex items-center text-primary hover:text-accent">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors flex items-center`}
        >
          <FaCalendarAlt className="mr-2" /> All Bookings
        </button>
        <button 
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-full ${filter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors flex items-center`}
        >
          <FaClock className="mr-2" /> Upcoming
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full ${filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors flex items-center`}
        >
          <FaExclamationTriangle className="mr-2" /> Pending
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full ${filter === 'completed' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors flex items-center`}
        >
          <FaCheck className="mr-2" /> Completed
        </button>
        <button 
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-full ${filter === 'cancelled' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors flex items-center`}
        >
          <FaTimes className="mr-2" /> Cancelled
        </button>
      </div>

      {getFilteredBookings().length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <FaCalendarAlt className="mx-auto text-5xl text-primary/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">You don't have any {filter !== 'all' ? filter : ''} bookings yet.</p>
          <Link to="/equipment" className="btn-primary inline-flex items-center">
            <FaTractor className="mr-2" /> Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {getFilteredBookings().map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Equipment Image */}
                <div className="md:w-1/4 relative">
                  <img 
                    src={booking.equipmentImage} 
                    alt={booking.equipmentName}
                    className="h-48 md:h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:hidden">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Booking Details */}
                <div className="p-6 md:w-3/4">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{booking.equipmentName}</h2>
                    <span className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2 text-primary" />
                      <span>
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-primary" />
                      <span>{booking.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-primary" />
                      <span>
                        {booking.rentalPeriod.charAt(0).toUpperCase() + booking.rentalPeriod.slice(1)} Rental
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaTractor className="mr-2 text-primary" />
                      <span className="font-semibold text-accent">${booking.totalPrice} total</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/equipment/${booking.equipmentId}`}
                      className="text-primary hover:text-accent font-medium flex items-center"
                    >
                      <FaTractor className="mr-1" /> View Equipment
                    </Link>
                    
                    {booking.status === 'pending' || booking.status === 'confirmed' ? (
                      <button 
                        onClick={() => cancelBooking(booking.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 inline-flex items-center transition-colors"
                      >
                        <FaTimes className="mr-2" /> Cancel Booking
                      </button>
                    ) : null}
                    
                    {booking.status === 'completed' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center transition-colors">
                        <FaStar className="mr-2" /> Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage; 