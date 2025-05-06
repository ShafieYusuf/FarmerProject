import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching bookings from localStorage
    const fetchBookings = () => {
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(storedBookings);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">Pending</span>;
      case 'confirmed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Confirmed</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">Rejected</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
          <Link to="/equipment" className="text-primary hover:underline">
            Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{booking.equipmentName}</h2>
                  <p className="text-gray-600">{booking.equipmentCategory}</p>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2" />
                  <span>Start: {new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2" />
                  <span>End: {new Date(booking.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Duration: {booking.duration} days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-semibold">Total: ${booking.totalPrice}</span>
                </div>
              </div>

              {booking.status === 'pending' && (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-yellow-800">
                    Your booking is pending admin approval. We'll notify you once it's confirmed.
                  </p>
                </div>
              )}

              {booking.status === 'confirmed' && (
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-800">
                    Your booking has been confirmed! You can pick up the equipment on the start date.
                  </p>
                </div>
              )}

              {booking.status === 'rejected' && (
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-red-800">
                    Your booking has been rejected. Please contact support for more information.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage; 