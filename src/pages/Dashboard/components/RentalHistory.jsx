import { useState, useEffect } from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaEye, FaDownload, FaCalendarAlt } from 'react-icons/fa';

// Mock rental history data
const mockRentalHistory = [
  {
    id: 'R1001',
    equipmentId: 'E001',
    equipmentName: 'John Deere Tractor - Model 5075E',
    equipmentImage: 'https://placehold.co/100x100?text=Tractor',
    startDate: '2023-04-10',
    endDate: '2023-04-15',
    rentalPeriod: '5 days',
    totalPrice: 1250.00,
    status: 'completed',
    location: 'Cedar Rapids, IA',
    invoiceNumber: 'INV-10045',
    returnCondition: 'Good',
    returnNotes: 'Slight wear on tires, fuel tank at 25%',
    rating: 4
  },
  {
    id: 'R1002',
    equipmentId: 'E003',
    equipmentName: 'Seed Drill - Great Plains 1006NT',
    equipmentImage: 'https://placehold.co/100x100?text=Seed+Drill',
    startDate: '2023-05-05',
    endDate: '2023-05-12',
    rentalPeriod: '7 days',
    totalPrice: 840.00,
    status: 'completed',
    location: 'Des Moines, IA',
    invoiceNumber: 'INV-10056',
    returnCondition: 'Excellent',
    returnNotes: 'No issues, cleaned before return',
    rating: 5
  },
  {
    id: 'R1003',
    equipmentId: 'E005',
    equipmentName: 'Combine Harvester - Case IH 8250',
    equipmentImage: 'https://placehold.co/100x100?text=Harvester',
    startDate: '2023-06-20',
    endDate: '2023-06-30',
    rentalPeriod: '10 days',
    totalPrice: 3500.00,
    status: 'completed',
    location: 'Sioux City, IA',
    invoiceNumber: 'INV-10078',
    returnCondition: 'Fair',
    returnNotes: 'Minor damage to cutting platform, will be charged repair fee',
    rating: 3
  },
  {
    id: 'R1004',
    equipmentId: 'E007',
    equipmentName: 'Sprayer - John Deere R4044',
    equipmentImage: 'https://placehold.co/100x100?text=Sprayer',
    startDate: '2023-07-15',
    endDate: '2023-07-20',
    rentalPeriod: '5 days',
    totalPrice: 1150.00,
    status: 'completed',
    location: 'Davenport, IA',
    invoiceNumber: 'INV-10092',
    returnCondition: 'Good',
    returnNotes: 'Regular wear and tear, no issues',
    rating: 4
  },
  {
    id: 'R1005',
    equipmentId: 'E002',
    equipmentName: 'Kubota Tractor - M7-172',
    equipmentImage: 'https://placehold.co/100x100?text=Tractor',
    startDate: '2023-08-05',
    endDate: '2023-08-15',
    rentalPeriod: '10 days',
    totalPrice: 2200.00,
    status: 'completed',
    location: 'Ames, IA',
    invoiceNumber: 'INV-10103',
    returnCondition: 'Excellent',
    returnNotes: 'Fully cleaned and fueled upon return',
    rating: 5
  },
  {
    id: 'R1006',
    equipmentId: 'E006',
    equipmentName: 'Planter - John Deere 1795',
    equipmentImage: 'https://placehold.co/100x100?text=Planter',
    startDate: '2023-09-12',
    endDate: '2023-09-20',
    rentalPeriod: '8 days',
    totalPrice: 1920.00,
    status: 'cancelled',
    location: 'Waterloo, IA',
    invoiceNumber: 'INV-10115',
    returnCondition: 'N/A',
    returnNotes: 'Rental cancelled due to weather conditions',
    rating: null
  }
];

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedRental, setSelectedRental] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filter options
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRentals(mockRentalHistory);
      setFilteredRentals(mockRentalHistory);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    filterRentals();
  }, [rentals, searchTerm, statusFilter, dateRangeFilter, sortField, sortDirection]);

  const filterRentals = () => {
    let filtered = [...rentals];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(rental => 
        rental.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(rental => rental.status === statusFilter);
    }
    
    // Apply date range filter
    if (dateRangeFilter.startDate) {
      filtered = filtered.filter(
        rental => new Date(rental.startDate) >= new Date(dateRangeFilter.startDate)
      );
    }
    
    if (dateRangeFilter.endDate) {
      filtered = filtered.filter(
        rental => new Date(rental.endDate) <= new Date(dateRangeFilter.endDate)
      );
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      if (sortField === 'totalPrice') {
        return sortDirection === 'asc' 
          ? a.totalPrice - b.totalPrice 
          : b.totalPrice - a.totalPrice;
      } else if (sortField === 'startDate') {
        return sortDirection === 'asc'
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate);
      } else if (sortField === 'rentalPeriod') {
        // Extract number of days for comparison
        const daysA = parseInt(a.rentalPeriod);
        const daysB = parseInt(b.rentalPeriod);
        return sortDirection === 'asc' ? daysA - daysB : daysB - daysA;
      } else {
        // Default string comparison
        const valueA = a[sortField].toString().toLowerCase();
        const valueB = b[sortField].toString().toLowerCase();
        if (sortDirection === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }
    });
    
    setFilteredRentals(filtered);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleViewDetails = (rental) => {
    setSelectedRental(rental);
    setShowModal(true);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRangeFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRangeFilter({ startDate: '', endDate: '' });
    setSortField('startDate');
    setSortDirection('desc');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render star rating
  const renderRating = (rating) => {
    if (!rating && rating !== 0) return 'Not rated';
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {Array(5).fill().map((_, index) => (
            <div key={index} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rental History</h1>
      
      {/* Filters */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              placeholder="Search equipment, invoice..."
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          {/* Date Range Filter */}
          <div>
            <div className="flex items-center mb-2">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">From</span>
            </div>
            <input
              type="date"
              name="startDate"
              value={dateRangeFilter.startDate}
              onChange={handleDateRangeChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">To</span>
            </div>
            <input
              type="date"
              name="endDate"
              value={dateRangeFilter.endDate}
              onChange={handleDateRangeChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* No Results */}
      {filteredRentals.length === 0 && (
        <div className="bg-white border rounded-lg p-8 text-center">
          <p className="text-lg text-gray-600">No rental history found with the current filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-accent"
          >
            Clear Filters
          </button>
        </div>
      )}
      
      {/* Results */}
      {filteredRentals.length > 0 && (
        <>
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('startDate')}
                    >
                      <div className="flex items-center">
                        Rental Date
                        {sortField === 'startDate' && (
                          sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('rentalPeriod')}
                    >
                      <div className="flex items-center">
                        Rental Period
                        {sortField === 'rentalPeriod' && (
                          sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('totalPrice')}
                    >
                      <div className="flex items-center">
                        Amount
                        {sortField === 'totalPrice' && (
                          sortDirection === 'asc' ? <FaSortAmountUp className="ml-1" /> : <FaSortAmountDown className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={rental.equipmentImage} alt={rental.equipmentName} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{rental.equipmentName}</div>
                            <div className="text-sm text-gray-500">Invoice: {rental.invoiceNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(rental.startDate)}</div>
                        <div className="text-sm text-gray-500">to {formatDate(rental.endDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {rental.rentalPeriod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${rental.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(rental.status)}`}>
                          {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {renderRating(rental.rating)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(rental)}
                          className="text-primary hover:text-accent mr-3"
                        >
                          <FaEye className="inline mr-1" /> View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FaDownload className="inline mr-1" /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      
      {/* Detail Modal */}
      {showModal && selectedRental && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold mb-4">Rental Details</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <img 
                    src={selectedRental.equipmentImage} 
                    alt={selectedRental.equipmentName}
                    className="w-full rounded-md mb-4"
                  />
                  <h3 className="font-medium">{selectedRental.equipmentName}</h3>
                  <p className="text-gray-600 mb-4">{selectedRental.location}</p>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Return Condition</h4>
                    <p className="text-sm">{selectedRental.returnCondition}</p>
                    <p className="text-sm text-gray-600 mt-2">{selectedRental.returnNotes}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Your Rating</h4>
                    {renderRating(selectedRental.rating)}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Invoice</p>
                        <p className="font-medium">{selectedRental.invoiceNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedRental.status)}`}>
                          {selectedRental.status.charAt(0).toUpperCase() + selectedRental.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-medium">{formatDate(selectedRental.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">End Date</p>
                        <p className="font-medium">{formatDate(selectedRental.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rental Period</p>
                        <p className="font-medium">{selectedRental.rentalPeriod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-medium">${selectedRental.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Payment Information</h3>
                    <div className="border rounded-md p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Payment Method</p>
                          <p className="font-medium">Credit Card (ending in 4242)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment Date</p>
                          <p className="font-medium">{formatDate(selectedRental.startDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Subtotal</p>
                          <p className="font-medium">${(selectedRental.totalPrice * 0.9).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tax</p>
                          <p className="font-medium">${(selectedRental.totalPrice * 0.1).toFixed(2)}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="font-medium text-lg">${selectedRental.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-accent text-white rounded-md flex items-center">
                      <FaDownload className="mr-2" /> Download Receipt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalHistory; 