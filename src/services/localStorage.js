// localStorage.js - Service for persisting data in localStorage

// Storage keys
const STORAGE_KEYS = {
  EQUIPMENT: 'farmer_equipment',
  BOOKINGS: 'farmer_bookings',
  FARMERS: 'farmer_users',
  SETTINGS: 'farmer_settings',
  REPORTS: 'farmer_reports'
};

// Default data generation
const createDefaultEquipment = () => [
  {
    id: 'E1001',
    name: 'John Deere 6155M Tractor',
    category: 'Tractors',
    description: 'Powerful tractor perfect for heavy-duty farming tasks with advanced features and excellent fuel efficiency.',
    dailyRate: 150,
    weeklyRate: 900,
    monthlyRate: 3200,
    location: 'Central Farm Depot',
    availability: 'available',
    condition: 'Excellent',
    approvalStatus: 'Approved',
    dateAdded: '2023-01-10',
    specifications: {
      manufacturer: 'John Deere',
      model: '6155M',
      yearOfManufacture: 2020,
      engine: '6-cylinder PowerTech',
      horsepower: '155 HP',
      weight: '6000 kg',
      dimensions: '4.5m x 2.1m x 3.0m',
      fuelType: 'Diesel'
    },
    images: [
      { id: 1, preview: 'https://placehold.co/800x600?text=Tractor+Main' },
      { id: 2, preview: 'https://placehold.co/800x600?text=Tractor+Side' },
      { id: 3, preview: 'https://placehold.co/800x600?text=Tractor+Back' }
    ]
  },
  {
    id: 'E1002',
    name: 'Kubota L3901 Compact Tractor',
    category: 'Tractors',
    description: 'Versatile compact tractor suitable for small to medium-sized farms with excellent maneuverability.',
    dailyRate: 110,
    weeklyRate: 700,
    monthlyRate: 2500,
    location: 'Eastern Equipment Center',
    availability: 'rented',
    condition: 'Good',
    approvalStatus: 'Approved',
    dateAdded: '2023-02-15',
    specifications: {
      manufacturer: 'Kubota',
      model: 'L3901',
      yearOfManufacture: 2019,
      engine: '3-cylinder diesel',
      horsepower: '39 HP',
      weight: '1500 kg',
      dimensions: '3.2m x 1.5m x 2.3m',
      fuelType: 'Diesel'
    },
    images: [
      { id: 1, preview: 'https://placehold.co/800x600?text=Kubota+Main' }
    ]
  },
  {
    id: 'E1003',
    name: 'Case IH Combine Harvester',
    category: 'Harvesters',
    description: 'High-capacity harvester for efficient large-scale crop collection.',
    dailyRate: 325,
    weeklyRate: 2100,
    monthlyRate: 8000,
    location: 'Western Agricultural Supply',
    availability: 'available',
    condition: 'Excellent',
    approvalStatus: 'Pending',
    dateAdded: '2023-03-22',
    specifications: {
      manufacturer: 'Case IH',
      model: 'Axial-Flow 250',
      yearOfManufacture: 2021,
      engine: 'Diesel 9L',
      horsepower: '410 HP',
      weight: '15000 kg',
      dimensions: '9.1m x 3.5m x 4.2m',
      fuelType: 'Diesel'
    },
    images: [
      { id: 1, preview: 'https://placehold.co/800x600?text=Harvester+Main' }
    ]
  }
];

const createDefaultBookings = () => [
  {
    id: 'B1001',
    farmerId: 'F1001',
    equipmentId: 'E1001',
    bookingDate: '2023-04-15',
    startDate: '2023-05-01',
    endDate: '2023-05-07',
    totalAmount: 900,
    depositAmount: 180,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    notes: 'Delivery requested to farm address',
    farmerName: 'John Smith',
    equipmentName: 'John Deere 6155M Tractor',
    equipmentCategory: 'Tractors'
  },
  {
    id: 'B1002',
    farmerId: 'F1002',
    equipmentId: 'E1002',
    bookingDate: '2023-04-18',
    startDate: '2023-04-20',
    endDate: '2023-04-30',
    totalAmount: 1100,
    depositAmount: 220,
    status: 'Completed',
    paymentStatus: 'Paid',
    notes: 'Will pick up from depot',
    farmerName: 'Sarah Johnson',
    equipmentName: 'Kubota L3901 Compact Tractor',
    equipmentCategory: 'Tractors'
  },
  {
    id: 'B1003',
    farmerId: 'F1003',
    equipmentId: 'E1003',
    bookingDate: '2023-04-22',
    startDate: '2023-06-01',
    endDate: '2023-06-15',
    totalAmount: 4875,
    depositAmount: 975,
    status: 'Pending',
    paymentStatus: 'Awaiting Payment',
    notes: 'Requires operator',
    farmerName: 'Robert Chen',
    equipmentName: 'Case IH Combine Harvester',
    equipmentCategory: 'Harvesters'
  }
];

const createDefaultFarmers = () => [
  {
    id: 'F1001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    farmName: 'Smith Family Farm',
    address: '123 Rural Road, Cedar Rapids, IA',
    verificationStatus: 'Verified',
    status: 'Active',
    registrationDate: '2023-01-15',
    lastLoginDate: '2023-04-25',
    totalBookings: 5,
    completedBookings: 3,
    pendingBookings: 2,
    totalSpent: 2750
  },
  {
    id: 'F1002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    farmName: 'Johnson Acres',
    address: '456 County Line, Des Moines, IA',
    verificationStatus: 'Verified',
    status: 'Active',
    registrationDate: '2023-02-10',
    lastLoginDate: '2023-04-26',
    totalBookings: 3,
    completedBookings: 2,
    pendingBookings: 1,
    totalSpent: 1800
  },
  {
    id: 'F1003',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'r.chen@example.com',
    phone: '(555) 333-2222',
    farmName: 'Green Valley Organics',
    address: '789 Valley View, Ames, IA',
    verificationStatus: 'Pending',
    status: 'Active',
    registrationDate: '2023-03-05',
    lastLoginDate: '2023-04-23',
    totalBookings: 1,
    completedBookings: 0,
    pendingBookings: 1,
    totalSpent: 0
  },
  {
    id: 'F1004',
    firstName: 'Lisa',
    lastName: 'Martinez',
    email: 'lisa.m@example.com',
    phone: '(555) 444-5555',
    farmName: 'Sunshine Farms',
    address: '101 Main St, Sioux City, IA',
    verificationStatus: 'Verified',
    status: 'Inactive',
    registrationDate: '2023-01-22',
    lastLoginDate: '2023-03-15',
    totalBookings: 2,
    completedBookings: 2,
    pendingBookings: 0,
    totalSpent: 1650
  }
];

const createDefaultSettings = () => ({
  platform: {
    platformName: 'FarmRent',
    contactEmail: 'contact@farmrent.com',
    contactPhone: '(555) 123-4567',
    defaultLanguage: 'English',
    maintenanceMode: false,
    allowNewRegistrations: true,
    equipmentApprovalRequired: true
  },
  payment: {
    paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
    activatedGateway: 'Stripe',
    depositPercentage: 20,
    cancelFeePercentage: 10,
    taxPercentage: 7
  },
  notification: {
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    marketingEmails: false,
    adminAlerts: true,
    notificationsEnabled: true
  },
  pricing: {
    currencySymbol: '$',
    currencyCode: 'USD',
    weeklyDiscountPercentage: 10,
    monthlyDiscountPercentage: 15,
    featuredListingFee: 25
  },
  security: {
    twoFactorAuthForAdmins: true,
    passwordExpiryDays: 90,
    loginAttempts: 5,
    automaticLogout: 30
  },
  defaultCurrency: 'USD'
});

// EQUIPMENT CRUD Operations
export const getEquipmentList = () => {
  const data = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);
  return data ? JSON.parse(data) : createDefaultEquipment();
};

export const getEquipmentById = (id) => {
  const equipment = getEquipmentList();
  return equipment.find(item => item.id === id) || null;
};

export const addEquipment = (equipment) => {
  const equipmentList = getEquipmentList();
  const newEquipment = {
    ...equipment,
    id: generateEquipmentId(),
    dateAdded: new Date().toISOString().split('T')[0],
    approvalStatus: equipment.approvalStatus || 'Pending'
  };
  
  const updatedList = [...equipmentList, newEquipment];
  localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(updatedList));
  return newEquipment;
};

export const updateEquipment = (updatedEquipment) => {
  const equipmentList = getEquipmentList();
  const index = equipmentList.findIndex(item => item.id === updatedEquipment.id);
  
  if (index === -1) {
    return null;
  }
  
  equipmentList[index] = {
    ...equipmentList[index],
    ...updatedEquipment,
  };
  
  localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(equipmentList));
  return equipmentList[index];
};

export const deleteEquipment = (id) => {
  const equipmentList = getEquipmentList();
  const filteredList = equipmentList.filter(item => item.id !== id);
  
  if (filteredList.length === equipmentList.length) {
    return false; // No item found with this ID
  }
  
  localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(filteredList));
  return true;
};

export const updateEquipmentStatus = (id, status) => {
  const equipmentList = getEquipmentList();
  const index = equipmentList.findIndex(item => item.id === id);
  
  if (index === -1) {
    return null;
  }
  
  equipmentList[index] = {
    ...equipmentList[index],
    availability: status
  };
  
  localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(equipmentList));
  return equipmentList[index];
};

// BOOKING CRUD Operations
export const getBookingsList = () => {
  const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return data ? JSON.parse(data) : createDefaultBookings();
};

export const getBookingById = (id) => {
  const bookings = getBookingsList();
  return bookings.find(booking => booking.id === id) || null;
};

export const addBooking = (booking) => {
  const bookingsList = getBookingsList();
  const newBooking = {
    ...booking,
    id: generateBookingId(),
    bookingDate: new Date().toISOString().split('T')[0],
    status: booking.status || 'Pending',
    paymentStatus: booking.paymentStatus || 'Awaiting Payment'
  };
  
  const updatedList = [...bookingsList, newBooking];
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedList));
  return newBooking;
};

export const updateBooking = (updatedBooking) => {
  const bookingsList = getBookingsList();
  const index = bookingsList.findIndex(booking => booking.id === updatedBooking.id);
  
  if (index === -1) {
    return null;
  }
  
  bookingsList[index] = {
    ...bookingsList[index],
    ...updatedBooking,
  };
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookingsList));
  return bookingsList[index];
};

export const deleteBooking = (id) => {
  const bookingsList = getBookingsList();
  const filteredList = bookingsList.filter(booking => booking.id !== id);
  
  if (filteredList.length === bookingsList.length) {
    return false; // No booking found with this ID
  }
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(filteredList));
  return true;
};

export const updateBookingStatus = (id, status) => {
  const bookingsList = getBookingsList();
  const index = bookingsList.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    return null;
  }
  
  bookingsList[index] = {
    ...bookingsList[index],
    status
  };
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookingsList));
  return bookingsList[index];
};

// FARMER CRUD Operations
export const getFarmersList = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FARMERS);
  return data ? JSON.parse(data) : createDefaultFarmers();
};

export const getFarmerById = (id) => {
  const farmers = getFarmersList();
  return farmers.find(farmer => farmer.id === id) || null;
};

export const addFarmer = (farmer) => {
  const farmersList = getFarmersList();
  const newFarmer = {
    ...farmer,
    id: generateFarmerId(),
    registrationDate: new Date().toISOString().split('T')[0],
    verificationStatus: farmer.verificationStatus || 'Pending',
    status: farmer.status || 'Active',
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalSpent: 0
  };
  
  const updatedList = [...farmersList, newFarmer];
  localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(updatedList));
  return newFarmer;
};

export const updateFarmer = (updatedFarmer) => {
  const farmersList = getFarmersList();
  const index = farmersList.findIndex(farmer => farmer.id === updatedFarmer.id);
  
  if (index === -1) {
    return null;
  }
  
  farmersList[index] = {
    ...farmersList[index],
    ...updatedFarmer,
  };
  
  localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(farmersList));
  return farmersList[index];
};

export const deleteFarmer = (id) => {
  const farmersList = getFarmersList();
  const filteredList = farmersList.filter(farmer => farmer.id !== id);
  
  if (filteredList.length === farmersList.length) {
    return false; // No farmer found with this ID
  }
  
  localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(filteredList));
  return true;
};

export const updateFarmerStatus = (id, status) => {
  const farmersList = getFarmersList();
  const index = farmersList.findIndex(farmer => farmer.id === id);
  
  if (index === -1) {
    return null;
  }
  
  farmersList[index] = {
    ...farmersList[index],
    verificationStatus: status
  };
  
  localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(farmersList));
  return farmersList[index];
};

// SETTINGS Operations
export const getSettings = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return data ? JSON.parse(data) : createDefaultSettings();
};

export const updateSettings = (updatedSettings) => {
  const currentSettings = getSettings();
  const newSettings = { ...currentSettings, ...updatedSettings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  return newSettings;
};

// REPORTS Operations
export const getFinancialReports = () => {
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return data ? JSON.parse(data) : [];
};

export const generateFinancialReport = (period = 'monthly') => {
  const bookings = getBookingsList();
  const equipment = getEquipmentList();
  
  const now = new Date();
  let startDate, endDate;
  
  // Calculate period dates
  if (period === 'weekly') {
    endDate = new Date();
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === 'monthly') {
    endDate = new Date();
    startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
  } else if (period === 'yearly') {
    endDate = new Date();
    startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
  }
  
  // Filter bookings by period
  const periodBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.bookingDate);
    return bookingDate >= startDate && bookingDate <= endDate;
  });
  
  // Calculate total revenue
  const totalRevenue = periodBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  
  // Calculate revenue by category
  const byCategory = periodBookings.reduce((categories, booking) => {
    const category = booking.equipmentCategory || 'Uncategorized';
    categories[category] = (categories[category] || 0) + booking.totalAmount;
    return categories;
  }, {});
  
  // Generate report object
  const report = {
    id: generateReportId(),
    period,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    generatedAt: new Date().toISOString(),
    totalRevenue,
    bookingsCount: periodBookings.length,
    byCategory
  };
  
  // Save report
  const reports = getFinancialReports();
  const updatedReports = [...reports, report];
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updatedReports));
  
  return report;
};

// HELPER Functions for generating IDs
const generateEquipmentId = () => {
  const equipmentList = getEquipmentList();
  let highestId = 0;
  
  equipmentList.forEach(item => {
    const id = parseInt(item.id.replace('E', ''), 10);
    if (id > highestId) highestId = id;
  });
  
  return `E${(highestId + 1).toString().padStart(4, '0')}`;
};

const generateBookingId = () => {
  const bookingsList = getBookingsList();
  let highestId = 0;
  
  bookingsList.forEach(booking => {
    const id = parseInt(booking.id.replace('B', ''), 10);
    if (id > highestId) highestId = id;
  });
  
  return `B${(highestId + 1).toString().padStart(4, '0')}`;
};

const generateFarmerId = () => {
  const farmersList = getFarmersList();
  let highestId = 0;
  
  farmersList.forEach(farmer => {
    const id = parseInt(farmer.id.replace('F', ''), 10);
    if (id > highestId) highestId = id;
  });
  
  return `F${(highestId + 1).toString().padStart(4, '0')}`;
};

const generateReportId = () => {
  const reportsList = getFinancialReports();
  let highestId = 0;
  
  reportsList.forEach(report => {
    if (report.id) {
      const id = parseInt(report.id.replace('R', ''), 10);
      if (id > highestId) highestId = id;
    }
  });
  
  return `R${(highestId + 1).toString().padStart(4, '0')}`;
};

// Initialize default data
export const initializeAppData = () => {
  // Initialize only if data doesn't exist
  if (!localStorage.getItem(STORAGE_KEYS.EQUIPMENT)) {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(createDefaultEquipment()));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(createDefaultBookings()));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.FARMERS)) {
    localStorage.setItem(STORAGE_KEYS.FARMERS, JSON.stringify(createDefaultFarmers()));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(createDefaultSettings()));
  }
  
  return {
    equipment: getEquipmentList(),
    bookings: getBookingsList(),
    farmers: getFarmersList(),
    settings: getSettings()
  };
}; 