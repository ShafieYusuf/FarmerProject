// API service layer that interfaces with localStorage

import * as localStorageService from './localStorage';

// Initialize app data
export const initializeData = () => {
  return localStorageService.initializeAppData();
};

// EQUIPMENT APIs
export const getAllEquipment = async () => {
  try {
    const equipment = localStorageService.getEquipmentList();
    return { success: true, data: equipment };
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return { success: false, error: 'Failed to fetch equipment list' };
  }
};

export const getEquipmentById = async (id) => {
  try {
    const equipment = localStorageService.getEquipmentById(id);
    if (!equipment) {
      return { success: false, error: 'Equipment not found' };
    }
    return { success: true, data: equipment };
  } catch (error) {
    console.error(`Error fetching equipment ${id}:`, error);
    return { success: false, error: 'Failed to fetch equipment details' };
  }
};

export const createEquipment = async (equipmentData) => {
  try {
    const newEquipment = localStorageService.addEquipment(equipmentData);
    return { success: true, data: newEquipment };
  } catch (error) {
    console.error('Error creating equipment:', error);
    return { success: false, error: 'Failed to create equipment' };
  }
};

export const updateEquipmentDetails = async (id, equipmentData) => {
  try {
    const updatedEquipment = localStorageService.updateEquipment({ id, ...equipmentData });
    if (!updatedEquipment) {
      return { success: false, error: 'Equipment not found' };
    }
    return { success: true, data: updatedEquipment };
  } catch (error) {
    console.error(`Error updating equipment ${id}:`, error);
    return { success: false, error: 'Failed to update equipment' };
  }
};

export const deleteEquipmentById = async (id) => {
  try {
    const result = localStorageService.deleteEquipment(id);
    if (!result) {
      return { success: false, error: 'Equipment not found' };
    }
    return { success: true };
  } catch (error) {
    console.error(`Error deleting equipment ${id}:`, error);
    return { success: false, error: 'Failed to delete equipment' };
  }
};

export const updateEquipmentAvailability = async (id, status) => {
  try {
    const updatedEquipment = localStorageService.updateEquipmentStatus(id, status);
    if (!updatedEquipment) {
      return { success: false, error: 'Equipment not found' };
    }
    return { success: true, data: updatedEquipment };
  } catch (error) {
    console.error(`Error updating equipment ${id} status:`, error);
    return { success: false, error: 'Failed to update equipment status' };
  }
};

// BOOKING APIs
export const getAllBookings = async () => {
  try {
    const bookings = localStorageService.getBookingsList();
    return { success: true, data: bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { success: false, error: 'Failed to fetch bookings list' };
  }
};

export const getBookingById = async (id) => {
  try {
    const booking = localStorageService.getBookingById(id);
    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }
    return { success: true, data: booking };
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    return { success: false, error: 'Failed to fetch booking details' };
  }
};

export const createBooking = async (bookingData) => {
  try {
    const newBooking = localStorageService.addBooking(bookingData);
    return { success: true, data: newBooking };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: 'Failed to create booking' };
  }
};

export const updateBookingDetails = async (id, bookingData) => {
  try {
    const updatedBooking = localStorageService.updateBooking({ id, ...bookingData });
    if (!updatedBooking) {
      return { success: false, error: 'Booking not found' };
    }
    return { success: true, data: updatedBooking };
  } catch (error) {
    console.error(`Error updating booking ${id}:`, error);
    return { success: false, error: 'Failed to update booking' };
  }
};

export const deleteBookingById = async (id) => {
  try {
    const result = localStorageService.deleteBooking(id);
    if (!result) {
      return { success: false, error: 'Booking not found' };
    }
    return { success: true };
  } catch (error) {
    console.error(`Error deleting booking ${id}:`, error);
    return { success: false, error: 'Failed to delete booking' };
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const updatedBooking = localStorageService.updateBookingStatus(id, status);
    if (!updatedBooking) {
      return { success: false, error: 'Booking not found' };
    }
    return { success: true, data: updatedBooking };
  } catch (error) {
    console.error(`Error updating booking ${id} status:`, error);
    return { success: false, error: 'Failed to update booking status' };
  }
};

// FARMER APIs
export const getAllFarmers = async () => {
  try {
    const farmers = localStorageService.getFarmersList();
    return { success: true, data: farmers };
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return { success: false, error: 'Failed to fetch farmers list' };
  }
};

export const getFarmerById = async (id) => {
  try {
    const farmer = localStorageService.getFarmerById(id);
    if (!farmer) {
      return { success: false, error: 'Farmer not found' };
    }
    return { success: true, data: farmer };
  } catch (error) {
    console.error(`Error fetching farmer ${id}:`, error);
    return { success: false, error: 'Failed to fetch farmer details' };
  }
};

export const createFarmer = async (farmerData) => {
  try {
    const newFarmer = localStorageService.addFarmer(farmerData);
    return { success: true, data: newFarmer };
  } catch (error) {
    console.error('Error creating farmer:', error);
    return { success: false, error: 'Failed to create farmer' };
  }
};

export const updateFarmerDetails = async (id, farmerData) => {
  try {
    const updatedFarmer = localStorageService.updateFarmer({ id, ...farmerData });
    if (!updatedFarmer) {
      return { success: false, error: 'Farmer not found' };
    }
    return { success: true, data: updatedFarmer };
  } catch (error) {
    console.error(`Error updating farmer ${id}:`, error);
    return { success: false, error: 'Failed to update farmer' };
  }
};

export const deleteFarmerById = async (id) => {
  try {
    const result = localStorageService.deleteFarmer(id);
    if (!result) {
      return { success: false, error: 'Farmer not found' };
    }
    return { success: true };
  } catch (error) {
    console.error(`Error deleting farmer ${id}:`, error);
    return { success: false, error: 'Failed to delete farmer' };
  }
};

export const updateFarmerVerificationStatus = async (id, status) => {
  try {
    const updatedFarmer = localStorageService.updateFarmerStatus(id, status);
    if (!updatedFarmer) {
      return { success: false, error: 'Farmer not found' };
    }
    return { success: true, data: updatedFarmer };
  } catch (error) {
    console.error(`Error updating farmer ${id} status:`, error);
    return { success: false, error: 'Failed to update farmer status' };
  }
};

// SETTINGS APIs
export const getSystemSettings = async () => {
  try {
    const settings = localStorageService.getSettings();
    return { success: true, data: settings };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return { success: false, error: 'Failed to fetch system settings' };
  }
};

export const updateSystemSettings = async (settingsData) => {
  try {
    const updatedSettings = localStorageService.updateSettings(settingsData);
    return { success: true, data: updatedSettings };
  } catch (error) {
    console.error('Error updating settings:', error);
    return { success: false, error: 'Failed to update system settings' };
  }
};

// REPORTS APIs
export const getFinancialReports = async () => {
  try {
    const reports = localStorageService.getFinancialReports();
    return { success: true, data: reports };
  } catch (error) {
    console.error('Error fetching reports:', error);
    return { success: false, error: 'Failed to fetch financial reports' };
  }
};

export const generateFinancialReport = async (period) => {
  try {
    const report = localStorageService.generateFinancialReport(period);
    return { success: true, data: report };
  } catch (error) {
    console.error('Error generating report:', error);
    return { success: false, error: 'Failed to generate financial report' };
  }
};

// Export API object with all methods
const apiService = {
  // Data initialization
  initializeData,
  
  // Equipment endpoints
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipmentDetails,
  deleteEquipmentById,
  updateEquipmentAvailability,
  
  // Booking endpoints
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingDetails,
  deleteBookingById,
  updateBookingStatus,
  
  // Farmer endpoints
  getAllFarmers,
  getFarmerById,
  createFarmer,
  updateFarmerDetails,
  deleteFarmerById,
  updateFarmerVerificationStatus,
  
  // Settings endpoints
  getSystemSettings,
  updateSystemSettings,
  
  // Reports endpoints
  getFinancialReports,
  generateFinancialReport
};

export default apiService; 