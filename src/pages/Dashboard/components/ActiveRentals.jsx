import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTractor, FaExclamationTriangle } from 'react-icons/fa';

// Mock active rentals data
const mockRentals = [
  {
    id: 1,
    equipmentId: 1,
    equipmentName: 'John Deere 6150M Tractor',
    equipmentImage: 'https://placehold.co/800x600?text=John+Deere+Tractor+Front',
    startDate: '2023-09-01',
    endDate: '2023-09-10',
    rentalPeriod: 'daily',
    totalPrice: 1500,
    status: 'active',
    location: 'Central Farm Depot',
    remainingDays: 4,
    isLate: false
  },
  {
    id: 2,
    equipmentId: 4,
    equipmentName: 'Seed Drill Machine',
    equipmentImage: 'https://placehold.co/800x600?text=Precision+Seed+Drill+Main',
    startDate: '2023-09-05',
    endDate: '2023-09-12',
    rentalPeriod: 'weekly',
    totalPrice: 450,
    status: 'upcoming',
    location: 'Western Agricultural Supply',
    remainingDays: null,
    isLate: false
  },
  {
    id: 3,
    equipmentId: 11,
    equipmentName: 'Boom Sprayer',
    equipmentImage: 'https://placehold.co/800x600?text=Boom+Sprayer+Main',
    startDate: '2023-08-25',
    endDate: '2023-09-05',
    rentalPeriod: 'daily',
    totalPrice: 700,
    status: 'active',
    location: 'Eastern Equipment Center',
    remainingDays: 0,
    isLate: true
  }
];

const ActiveRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, upcoming, overdue

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRentals(mockRentals);
      setLoading(false);
    }, 500);
  }, []);

  const getFilteredRentals = () => {
    switch(filter) {
      case 'active':
        return rentals.filter(r => r.status === 'active' && !r.isLate);
      case 'upcoming':
        return rentals.filter(r => r.status === 'upcoming');
      case 'overdue':
        return rentals.filter(r => r.isLate);
      default:
        return rentals;
    }
  };

  const extendRental = (rentalId) => {
    // In a real app, this would call an API to request extending the rental
    alert(`Request to extend rental #${rentalId} has been submitted and is pending approval.`);
  };

  const returnEquipment = (rentalId) => {
    // In a real app, this would call an API to initiate equipment return
    const confirmed = window.confirm("Are you sure you want to return this equipment?");
    
    if (confirmed) {
      alert(`Return process initiated for rental #${rentalId}. Please deliver the equipment to the pickup location.`);
      // Update the UI
      setRentals(rentals.filter(rental => rental.id !== rentalId));
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="h-48 bg-gray-200 rounded mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Current Equipment Rentals</h1>
      <p className="text-gray-600 mb-6">
        Manage your active and upcoming equipment rentals. You can extend active rentals or initiate returns from here.
      </p>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          All Rentals
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-full ${filter === 'active' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-full ${filter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setFilter('overdue')}
          className={`px-4 py-2 rounded-full ${filter === 'overdue' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Overdue
        </button>
      </div>

      {getFilteredRentals().length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaTractor className="mx-auto text-5xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No rentals found</h3>
          <p className="text-gray-600">
            You don't have any {filter !== 'all' ? filter : ''} equipment rentals.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {getFilteredRentals().map(rental => (
            <div 
              key={rental.id} 
              className={`border rounded-lg overflow-hidden ${
                rental.isLate ? 'border-red-300 bg-red-50' : 
                rental.status === 'upcoming' ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Equipment Image */}
                <div className="md:col-span-1">
                  <img 
                    src={rental.equipmentImage} 
                    alt={rental.equipmentName}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                {/* Rental Details */}
                <div className="p-6 md:col-span-2">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{rental.equipmentName}</h2>
                    <div>
                      {rental.isLate ? (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                          <FaExclamationTriangle className="mr-1" /> Overdue
                        </span>
                      ) : rental.status === 'upcoming' ? (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Upcoming
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span>
                          {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{rental.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2" />
                        <span>
                          {rental.status === 'upcoming' 
                            ? `Starts in ${Math.ceil((new Date(rental.startDate) - new Date()) / (1000 * 60 * 60 * 24))} days` 
                            : rental.isLate 
                              ? `Overdue by ${Math.abs(rental.remainingDays)} days` 
                              : `${rental.remainingDays} days remaining`
                          }
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-2">
                        <span className="font-semibold">Rental Period:</span> {rental.rentalPeriod}
                      </div>
                      <div className="text-gray-600 mb-2">
                        <span className="font-semibold">Total Price:</span> ${rental.totalPrice}
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold">Order #:</span> {rental.id}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {rental.status === 'active' && (
                      <>
                        <button 
                          onClick={() => extendRental(rental.id)}
                          className="bg-primary hover:bg-accent text-white px-4 py-2 rounded"
                        >
                          Extend Rental
                        </button>
                        <button 
                          onClick={() => returnEquipment(rental.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                        >
                          Return Equipment
                        </button>
                      </>
                    )}
                    {rental.status === 'upcoming' && (
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                          const confirmed = window.confirm("Are you sure you want to cancel this rental?");
                          if (confirmed) {
                            alert(`Rental #${rental.id} has been cancelled.`);
                            setRentals(rentals.filter(r => r.id !== rental.id));
                          }
                        }}
                      >
                        Cancel Rental
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

export default ActiveRentals; 