import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaSortAmountDown, FaEye, FaCheckCircle, FaTimesCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import apiService from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';

// All equipment categories
const categories = ['All', 'Tractors', 'Harvesters', 'Irrigation', 'Seeders', 'Sprayers', 'Tillage', 'Mowers'];

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'dateAdded', direction: 'descending' });
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);
  const toast = useToast();

  // Fetch equipment data
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllEquipment();
      if (response.success) {
        setEquipment(response.data);
      } else {
        toast.error('Failed to fetch equipment');
      }
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast.error('An error occurred while fetching equipment');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle equipment approval
  const handleApproveEquipment = async (id) => {
    setIsProcessing(true);
    try {
      const response = await apiService.updateEquipmentDetails(id, { approvalStatus: 'Approved' });
      if (response.success) {
        setEquipment(equipment.map(item => 
          item.id === id ? { ...item, approvalStatus: 'Approved' } : item
        ));
        toast.success('Equipment approved successfully');
      } else {
        toast.error(response.error || 'Failed to approve equipment');
      }
    } catch (error) {
      console.error('Error approving equipment:', error);
      toast.error('An error occurred while approving equipment');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle equipment rejection
  const handleRejectEquipment = async (id) => {
    setIsProcessing(true);
    try {
      const response = await apiService.updateEquipmentDetails(id, { approvalStatus: 'Rejected' });
      if (response.success) {
        setEquipment(equipment.map(item => 
          item.id === id ? { ...item, approvalStatus: 'Rejected' } : item
        ));
        toast.success('Equipment rejected');
      } else {
        toast.error(response.error || 'Failed to reject equipment');
      }
    } catch (error) {
      console.error('Error rejecting equipment:', error);
      toast.error('An error occurred while rejecting equipment');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle delete confirmation
  const confirmDelete = (item) => {
    setEquipmentToDelete(item);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const deleteEquipment = async () => {
    if (!equipmentToDelete) return;
    
    setIsProcessing(true);
    try {
      const response = await apiService.deleteEquipmentById(equipmentToDelete.id);
      if (response.success) {
        setEquipment(equipment.filter(item => item.id !== equipmentToDelete.id));
        toast.success('Equipment deleted successfully');
      } else {
        toast.error(response.error || 'Failed to delete equipment');
      }
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('An error occurred while deleting equipment');
    } finally {
      setIsProcessing(false);
      setShowDeleteModal(false);
      setEquipmentToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEquipmentToDelete(null);
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

  // Filter and sort equipment
  const filteredEquipment = equipment
    .filter(item => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      // Availability filter
      const matchesAvailability = 
        filterAvailability === 'all' || 
        (filterAvailability === 'available' && item.availability === 'available') || 
        (filterAvailability === 'rented' && item.availability === 'rented') ||
        (filterAvailability === 'maintenance' && item.availability === 'maintenance');
      
      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
      if (!a[sortConfig.key]) return 1;
      if (!b[sortConfig.key]) return -1;
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  // Availability badge styling
  const getAvailabilityBadgeClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch(status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Approval status badge styling
  const getApprovalBadgeClass = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch(status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
        <p className="text-gray-600">Loading equipment data...</p>
      </div>
    );
  }

  // Show error state if no equipment found and not loading
  if (!isLoading && (!equipment || equipment.length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Equipment Found</h2>
          <p className="text-gray-600 mb-6">There are no equipment items in the system yet.</p>
          <Link 
            to="/admin/equipment/add" 
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add New Equipment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipment Management</h1>
        <Link 
          to="/admin/equipment/add" 
          className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Equipment
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Form */}
          <div className="flex-grow">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search equipment..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          
          {/* Category Filter */}
          <div className="md:w-1/4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Availability Filter */}
          <div className="md:w-1/5">
            <select
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('name')}>
                  <div className="flex items-center">
                    Equipment Name
                    {sortConfig.key === 'name' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('category')}>
                  <div className="flex items-center">
                    Category
                    {sortConfig.key === 'category' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 cursor-pointer" onClick={() => requestSort('dailyRate')}>
                  <div className="flex items-center">
                    Daily Rate
                    {sortConfig.key === 'dailyRate' && (
                      <FaSortAmountDown className={`ml-1 ${sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Availability</th>
                <th className="px-6 py-3">Approval Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No equipment found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredEquipment.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">${item.dailyRate}/day</td>
                    <td className="px-6 py-4">{item.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadgeClass(item.availability)}`}>
                        {item.availability ? item.availability.charAt(0).toUpperCase() + item.availability.slice(1) : 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApprovalBadgeClass(item.approvalStatus)}`}>
                        {item.approvalStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/equipment/${item.id}`} 
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        <Link 
                          to={`/admin/equipment/edit/${item.id}`} 
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          title="Delete Equipment"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => confirmDelete(item)}
                          disabled={isProcessing}
                        >
                          <FaTrash />
                        </button>
                        
                        {item.approvalStatus === 'Pending' && (
                          <>
                            <button 
                              title="Approve Equipment"
                              className="text-green-600 hover:text-green-900"
                              onClick={() => handleApproveEquipment(item.id)}
                              disabled={isProcessing}
                            >
                              <FaCheckCircle />
                            </button>
                            <button 
                              title="Reject Equipment"
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleRejectEquipment(item.id)}
                              disabled={isProcessing}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete {equipmentToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={cancelDelete}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={deleteEquipment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Deleting...
                  </span>
                ) : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentManagement; 