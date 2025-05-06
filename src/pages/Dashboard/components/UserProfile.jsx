import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTractor, FaIdCard, FaSave, FaCamera } from 'react-icons/fa';

// Mock user data
const mockUserData = {
  id: 'F1001',
  firstName: 'John',
  lastName: 'Farmer',
  email: 'john.farmer@example.com',
  phone: '(555) 123-4567',
  address: '123 Rural Route',
  city: 'Farmville',
  state: 'IA',
  zipCode: '51234',
  farmName: 'Green Acres Farm',
  farmSize: '250 acres',
  farmType: 'Crop farming',
  mainCrops: 'Corn, Soybeans',
  memberSince: '2022-10-15',
  verificationStatus: 'Verified',
  profileImage: 'https://placehold.co/200x200?text=JF'
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData(mockUserData);
      setFormData(mockUserData);
      setLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to update user data
    setUserData(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
          </div>
          <div className="md:col-span-2">
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-accent text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={userData.profileImage}
                alt={`${userData.firstName} ${userData.lastName}`}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                  <FaCamera />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold">{userData.firstName} {userData.lastName}</h2>
            <p className="text-gray-600 mb-4">{userData.farmName}</p>
            
            <div className="flex items-center justify-center mb-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                {userData.verificationStatus}
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              Member since {new Date(userData.memberSince).toLocaleDateString()}
            </p>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center text-gray-600 mb-2">
                <FaEnvelope className="mr-2" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <FaPhone className="mr-2" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                <span>{userData.city}, {userData.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-2">
          <div className="bg-white border rounded-lg">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 py-3 font-medium ${
                  activeTab === 'personal'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaUser className="inline mr-2" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('farm')}
                className={`px-4 py-3 font-medium ${
                  activeTab === 'farm'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaTractor className="inline mr-2" />
                Farm Details
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-3 font-medium ${
                  activeTab === 'documents'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FaIdCard className="inline mr-2" />
                Verification
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary hover:bg-accent text-white rounded-md flex items-center"
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  )}
                </form>
              )}

              {activeTab === 'farm' && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmName">
                      Farm Name
                    </label>
                    <input
                      type="text"
                      id="farmName"
                      name="farmName"
                      value={formData.farmName || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmSize">
                      Farm Size
                    </label>
                    <input
                      type="text"
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="farmType">
                      Farm Type
                    </label>
                    <select
                      id="farmType"
                      name="farmType"
                      value={formData.farmType || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      <option value="Crop farming">Crop farming</option>
                      <option value="Livestock farming">Livestock farming</option>
                      <option value="Mixed farming">Mixed farming</option>
                      <option value="Dairy farming">Dairy farming</option>
                      <option value="Organic farming">Organic farming</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainCrops">
                      Main Crops/Animals
                    </label>
                    <input
                      type="text"
                      id="mainCrops"
                      name="mainCrops"
                      value={formData.mainCrops || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                      placeholder="e.g., Corn, Soybeans, Cattle"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary hover:bg-accent text-white rounded-md flex items-center"
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  )}
                </form>
              )}

              {activeTab === 'documents' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Verification Status</h3>
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        userData.verificationStatus === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {userData.verificationStatus}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Your account has been verified. Verified accounts have full access to all rental features.
                    </p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Identity Documents</h3>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-800">Driver's License</h4>
                          <p className="text-sm text-gray-600">Uploaded on Oct 15, 2022</p>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Verified</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-800">Farm Business Registration</h4>
                          <p className="text-sm text-gray-600">Uploaded on Oct 15, 2022</p>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Verified</span>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-6">
                        <button className="px-4 py-2 bg-primary hover:bg-accent text-white rounded-md flex items-center">
                          <FaIdCard className="mr-2" /> Upload New Document
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 