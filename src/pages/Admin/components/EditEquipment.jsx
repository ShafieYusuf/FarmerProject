import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaUpload, FaPlus, FaArrowLeft, FaSpinner, FaTrash } from 'react-icons/fa';
import apiService from '../../../services/api';
import { useToast } from '../../../contexts/ToastContext';
import { cleanupImageUrls } from '../../../utils/imageUtils';

const EditEquipment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    location: '',
    availability: '',
    condition: '',
    specifications: {
      manufacturer: '',
      model: '',
      yearOfManufacture: '',
      engine: '',
      horsepower: '',
      weight: '',
      dimensions: '',
      fuelType: '',
    }
  });
  const toast = useToast();

  // Fetch equipment data
  useEffect(() => {
    fetchEquipmentData();
    
    // Cleanup function to prevent memory leaks from image URLs
    return () => {
      if (images && images.length > 0) {
        const imagePreviews = images.map(img => img.preview);
        cleanupImageUrls(imagePreviews);
      }
    };
  }, [id]);

  const fetchEquipmentData = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getEquipmentById(id);
      
      if (response.success && response.data) {
        const equipment = response.data;
        setFormData({
          name: equipment.name || '',
          category: equipment.category || '',
          description: equipment.description || '',
          dailyRate: equipment.dailyRate || '',
          weeklyRate: equipment.weeklyRate || '',
          monthlyRate: equipment.monthlyRate || '',
          location: equipment.location || '',
          availability: equipment.availability || 'available',
          condition: equipment.condition || 'Good',
          specifications: { 
            manufacturer: equipment.specifications?.manufacturer || '',
            model: equipment.specifications?.model || '',
            yearOfManufacture: equipment.specifications?.yearOfManufacture || '',
            engine: equipment.specifications?.engine || '',
            horsepower: equipment.specifications?.horsepower || '',
            weight: equipment.specifications?.weight || '',
            dimensions: equipment.specifications?.dimensions || '',
            fuelType: equipment.specifications?.fuelType || '',
          }
        });
        
        setImages(equipment.images && equipment.images.length > 0 
          ? equipment.images
          : [{ id: 1, preview: null }]
        );
      } else {
        toast.error('Equipment not found');
        navigate('/admin/equipment');
      }
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      toast.error('Failed to load equipment data');
      navigate('/admin/equipment');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('specifications.')) {
      const specField = name.split('.')[1];
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle image change
  const handleImageChange = (e, imageId) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = images.map(img => {
        if (img.id === imageId) {
          return {
            ...img,
            preview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
            isNew: true
          };
        }
        return img;
      });
      setImages(newImages);
    }
  };

  // Add more image upload slot
  const addImageSlot = () => {
    const newId = images.length > 0 
      ? Math.max(...images.map(img => img.id)) + 1 
      : 1;
    setImages([...images, { id: newId, preview: null }]);
  };

  // Remove image upload slot
  const removeImageSlot = (imageId) => {
    if (images.length > 1) {
      const imageToRemove = images.find(img => img.id === imageId);
      if (imageToRemove && imageToRemove.preview && imageToRemove.isNew) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      setImages(images.filter(img => img.id !== imageId));
    }
  };

  // Calculate weekly and monthly rates based on daily rate with discounts
  const calculateRates = (dailyRate) => {
    if (!dailyRate || isNaN(dailyRate)) return;
    
    const numericValue = parseFloat(dailyRate);
    const weeklyRate = (numericValue * 7 * 0.9).toFixed(2); // 10% discount for weekly
    const monthlyRate = (numericValue * 30 * 0.85).toFixed(2); // 15% discount for monthly
    
    setFormData({
      ...formData,
      dailyRate: numericValue,
      weeklyRate,
      monthlyRate
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare image data (in a real app you'd upload images to a server)
      const preparedImages = images
        .filter(img => img.preview !== null)
        .map(img => ({
          id: img.id,
          preview: img.preview
        }));
      
      // Prepare the update data
      const updateData = {
        ...formData,
        images: preparedImages
      };
      
      const response = await apiService.updateEquipmentDetails(id, updateData);
      
      if (response.success) {
        toast.success('Equipment updated successfully');
        navigate('/admin/equipment');
      } else {
        toast.error(response.error || 'Failed to update equipment');
      }
    } catch (error) {
      console.error('Error updating equipment:', error);
      toast.error('An error occurred while updating equipment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/admin/equipment');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
        <span className="ml-2">Loading equipment data...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link to="/admin/equipment" className="text-primary hover:text-primary-dark mr-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Edit Equipment - {formData.name}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Equipment Name *</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Tractors">Tractors</option>
              <option value="Harvesters">Harvesters</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Seeders">Seeders</option>
              <option value="Sprayers">Sprayers</option>
              <option value="Tillage">Tillage</option>
              <option value="Mowers">Mowers</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          
          {/* Pricing Information */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pricing Information</h2>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Daily Rate ($) *</label>
            <input
              type="number"
              name="dailyRate"
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.dailyRate}
              onChange={(e) => {
                handleInputChange(e);
                calculateRates(e.target.value);
              }}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Weekly Rate ($)</label>
            <input
              type="number"
              name="weeklyRate"
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              value={formData.weeklyRate}
              onChange={handleInputChange}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">Auto-calculated with 10% discount</p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Monthly Rate ($)</label>
            <input
              type="number"
              name="monthlyRate"
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              value={formData.monthlyRate}
              onChange={handleInputChange}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">Auto-calculated with 15% discount</p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Location *</label>
            <select
              name="location"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.location}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Location</option>
              <option value="Central Farm Depot">Central Farm Depot</option>
              <option value="Eastern Equipment Center">Eastern Equipment Center</option>
              <option value="Western Agricultural Supply">Western Agricultural Supply</option>
            </select>
          </div>
          
          {/* Equipment Details */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Equipment Details</h2>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Availability</label>
            <select
              name="availability"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.availability}
              onChange={handleInputChange}
            >
              <option value="available">Available</option>
              <option value="rented">Currently Rented</option>
              <option value="maintenance">In Maintenance</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Condition</label>
            <select
              name="condition"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.condition}
              onChange={handleInputChange}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          
          {/* Specifications */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Technical Specifications</h2>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Manufacturer</label>
            <input
              type="text"
              name="specifications.manufacturer"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.manufacturer}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Model</label>
            <input
              type="text"
              name="specifications.model"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.model}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Year of Manufacture</label>
            <input
              type="number"
              name="specifications.yearOfManufacture"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.yearOfManufacture}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Engine</label>
            <input
              type="text"
              name="specifications.engine"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.engine}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Horsepower</label>
            <input
              type="text"
              name="specifications.horsepower"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.horsepower}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Fuel Type</label>
            <select
              name="specifications.fuelType"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.fuelType}
              onChange={handleInputChange}
            >
              <option value="">Select Fuel Type</option>
              <option value="Diesel">Diesel</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="text"
              name="specifications.weight"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.weight}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Dimensions</label>
            <input
              type="text"
              name="specifications.dimensions"
              placeholder="Length x Width x Height"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.specifications.dimensions}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Equipment Images */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Equipment Images</h2>
            <p className="text-sm text-gray-600 mb-4">Upload images of the equipment. The first image will be used as the main image.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="border rounded-lg p-2">
                  <div className="flex justify-end mb-2">
                    <button
                      type="button"
                      onClick={() => removeImageSlot(image.id)}
                      className="text-red-500"
                      disabled={images.length === 1}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  {image.preview ? (
                    <div className="relative h-40 mb-2">
                      <img
                        src={image.preview}
                        alt={`Preview ${image.id}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="border-dashed border-2 border-gray-300 rounded flex items-center justify-center h-40 mb-2">
                      <FaUpload className="text-gray-400 text-2xl" />
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id={`image-${image.id}`}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, image.id)}
                  />
                  <label
                    htmlFor={`image-${image.id}`}
                    className="block w-full text-center py-2 px-4 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300"
                  >
                    {image.preview ? 'Change Image' : 'Select Image'}
                  </label>
                </div>
              ))}
              
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={addImageSlot}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-primary hover:border-primary"
                >
                  <FaPlus className="text-2xl mb-2" />
                  <span>Add Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4 border-t pt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Update Equipment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEquipment; 