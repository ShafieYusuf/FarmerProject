import { useState } from 'react';
import { FaSearch, FaSortAmountDown, FaEye, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Mock farmer data
const mockFarmers = [
  {
    id: 'F1001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    location: 'Cedar Rapids, IA',
    registrationDate: '2023-05-10',
    equipmentCount: 3,
    totalRentals: 12,
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    lastLogin: '2023-08-25'
  },
  {
    id: 'F1002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    location: 'Des Moines, IA',
    registrationDate: '2023-06-15',
    equipmentCount: 5,
    totalRentals: 8,
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    lastLogin: '2023-08-27'
  },
  {
    id: 'F1003',
    name: 'Robert Chen',
    email: 'r.chen@example.com',
    phone: '(555) 333-2222',
    location: 'Ames, IA',
    registrationDate: '2023-07-05',
    equipmentCount: 2,
    totalRentals: 3,
    verificationStatus: 'Pending',
    accountStatus: 'Active',
    lastLogin: '2023-08-22'
  },
  {
    id: 'F1004',
    name: 'Lisa Martinez',
    email: 'lisa.m@example.com',
    phone: '(555) 444-5555',
    location: 'Sioux City, IA',
    registrationDate: '2023-07-22',
    equipmentCount: 0,
    totalRentals: 0,
    verificationStatus: 'Verified',
    accountStatus: 'Inactive',
    lastLogin: '2023-08-10'
  },
  {
    id: 'F1005',
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '(555) 777-8888',
    location: 'Davenport, IA',
    registrationDate: '2023-08-01',
    equipmentCount: 1,
    totalRentals: 2,
    verificationStatus: 'Rejected',
    accountStatus: 'Active',
    lastLogin: '2023-08-26'
  }
];

const FarmerManagement = () => {
  const [farmers, setFarmers] = useState(mockFarmers);
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [accountStatusFilter, setAccountStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'descending' });
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  // View farmer details
  const viewFarmerDetails = (farmer) => {
    setSelectedFarmer(farmer);
    setShowDetailsModal(true);
  };

  // Edit farmer
  const editFarmer = (farmer) => {
    setSelectedFarmer(farmer);
    setShowEditModal(true);
  };

  // Delete farmer modal
  const confirmDelete = (farmer) => {
    setSelectedFarmer(farmer);
    setShowDeleteModal(true);
  };

  // Handle farmer deletion
  const deleteFarmer = () => {
    setFarmers(farmers.filter(farmer => farmer.id !== selectedFarmer.id));
    setShowDeleteModal(false);
  };

  // Handle farmer verification
  const verifyFarmer = (id) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { ...farmer, verificationStatus: 'Verified' } : farmer
    ));
    // Add success notification
    alert("Farmer verified successfully");
  };

  // Handle farmer rejection
  const rejectFarmer = (id) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { ...farmer, verificationStatus: 'Rejected' } : farmer
    ));
    // Add success notification
    alert("Farmer verification rejected");
  };

  // Handle farmer account activation/deactivation
  const toggleAccountStatus = (id) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { 
        ...farmer, 
        accountStatus: farmer.accountStatus === 'Active' ? 'Inactive' : 'Active' 
      } : farmer
    ));
    // Add success notification
    alert("Account status updated successfully");
  };

  // Handle saving edited farmer data
  const saveEditedFarmer = (editedData) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === selectedFarmer.id ? { ...farmer, ...editedData } : farmer
    ));
    setShowEditModal(false);
    // Add success notification
    alert("Farmer information updated successfully");
  };

  // Filter and sort farmers
  const filteredFarmers = farmers
    .filter(farmer => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        farmer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Verification status filter
      const matchesVerification = verificationFilter === 'all' || 
        farmer.verificationStatus.toLowerCase() === verificationFilter.toLowerCase();
      
      // Account status filter
      const matchesAccountStatus = accountStatusFilter === 'all' || 
        farmer.accountStatus.toLowerCase() === accountStatusFilter.toLowerCase();
      
      return matchesSearch && matchesVerification && matchesAccountStatus;
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
  const getVerificationBadgeClass = (status) => {
    switch(status.toLowerCase()) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Account status badge styling
  const getAccountStatusBadgeClass = (status) => {
    return status.toLowerCase() === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Add New Customer
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Form */}
          <div>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search farmers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* Verification Status Filter */}
          <div>
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
            >
              <option value="all">All Verification Statuses</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          {/* Account Status Filter */}
          <div>
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={accountStatusFilter}
              onChange={(e) => setAccountStatusFilter(e.target.value)}
            >
              <option value="all">All Account Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('id')}>
                  <div className="flex items-center">
                    ID
                    {sortConfig.key === 'id' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === 'name' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('registrationDate')}>
                  <div className="flex items-center">
                    Registered
                    {sortConfig.key === 'registrationDate' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('equipmentCount')}>
                  <div className="flex items-center">
                    Equipment
                    {sortConfig.key === 'equipmentCount' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3">Verification</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No farmers found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredFarmers.map(farmer => (
                  <tr key={farmer.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{farmer.id}</td>
                    <td className="px-6 py-4">{farmer.name}</td>
                    <td className="px-6 py-4">
                      <div>{farmer.email}</div>
                      <div className="text-xs text-gray-500">{farmer.phone}</div>
                    </td>
                    <td className="px-6 py-4">{farmer.location}</td>
                    <td className="px-6 py-4">{farmer.registrationDate}</td>
                    <td className="px-6 py-4">
                      {farmer.equipmentCount} 
                      <span className="text-xs text-gray-500 ml-1">
                        ({farmer.totalRentals} rentals)
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationBadgeClass(farmer.verificationStatus)}`}>
                        {farmer.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccountStatusBadgeClass(farmer.accountStatus)}`}>
                        {farmer.accountStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          title="View Details"
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => viewFarmerDetails(farmer)}
                        >
                          <FaEye />
                        </button>
                        <button 
                          title="Edit Farmer"
                          className="text-yellow-600 hover:text-yellow-900"
                          onClick={() => editFarmer(farmer)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          title="Delete Farmer"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => confirmDelete(farmer)}
                        >
                          <FaTrash />
                        </button>
                        
                        {farmer.verificationStatus === 'Pending' && (
                          <>
                            <button 
                              title="Verify Farmer"
                              className="text-green-600 hover:text-green-900"
                              onClick={() => verifyFarmer(farmer.id)}
                            >
                              <FaCheckCircle />
                            </button>
                            <button 
                              title="Reject Verification"
                              className="text-red-600 hover:text-red-900"
                              onClick={() => rejectFarmer(farmer.id)}
                            >
                              <FaTimesCircle />
                            </button>
                          </>
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

      {/* Farmer Details Modal */}
      {showDetailsModal && selectedFarmer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Farmer Details: {selectedFarmer.name}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Basic Information</h4>
                <p><span className="text-gray-600">ID:</span> {selectedFarmer.id}</p>
                <p><span className="text-gray-600">Name:</span> {selectedFarmer.name}</p>
                <p><span className="text-gray-600">Email:</span> {selectedFarmer.email}</p>
                <p><span className="text-gray-600">Phone:</span> {selectedFarmer.phone}</p>
                <p><span className="text-gray-600">Location:</span> {selectedFarmer.location}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Account Information</h4>
                <p><span className="text-gray-600">Registered On:</span> {selectedFarmer.registrationDate}</p>
                <p><span className="text-gray-600">Last Login:</span> {selectedFarmer.lastLogin}</p>
                <p><span className="text-gray-600">Equipment Listed:</span> {selectedFarmer.equipmentCount}</p>
                <p><span className="text-gray-600">Total Rentals:</span> {selectedFarmer.totalRentals}</p>
                <p>
                  <span className="text-gray-600">Verification Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getVerificationBadgeClass(selectedFarmer.verificationStatus)}`}>
                    {selectedFarmer.verificationStatus}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Account Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getAccountStatusBadgeClass(selectedFarmer.accountStatus)}`}>
                    {selectedFarmer.accountStatus}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  setShowDetailsModal(false);
                  editFarmer(selectedFarmer);
                }}
              >
                Edit Farmer
              </button>
              {selectedFarmer.accountStatus === 'Active' ? (
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => {
                    toggleAccountStatus(selectedFarmer.id);
                    setShowDetailsModal(false);
                  }}
                >
                  Deactivate Account
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={() => {
                    toggleAccountStatus(selectedFarmer.id);
                    setShowDetailsModal(false);
                  }}
                >
                  Activate Account
                </button>
              )}
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedFarmer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="mb-4">
              Are you sure you want to delete {selectedFarmer.name}'s account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={deleteFarmer}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Farmer Modal */}
      {showEditModal && selectedFarmer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Edit Farmer: {selectedFarmer.name}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const editedData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                location: formData.get('location'),
                verificationStatus: formData.get('verificationStatus'),
                accountStatus: formData.get('accountStatus')
              };
              saveEditedFarmer(editedData);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedFarmer.name}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedFarmer.email}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={selectedFarmer.phone}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedFarmer.location}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Verification Status</label>
                  <select
                    name="verificationStatus"
                    defaultValue={selectedFarmer.verificationStatus}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Account Status</label>
                  <select
                    name="accountStatus"
                    defaultValue={selectedFarmer.accountStatus}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerManagement; 