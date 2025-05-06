import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaUser, FaEdit, FaSpinner } from 'react-icons/fa';
import equipmentImages from '../../assets/images/equipment/equipmentImages';

// Mock equipment data with real images
const mockEquipment = [
  // Existing equipment
  {
    id: 'E1001',
    name: 'John Deere 6150M Tractor',
    category: 'Tractors',
    images: [equipmentImages.johnDeereTractor.main],
    dailyRate: 150,
    weeklyRate: 945, // 10% discount
    monthlyRate: 3825, // 15% discount
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Powerful tractor perfect for heavy-duty farming tasks.',
    specifications: {
      manufacturer: 'John Deere',
      model: '6150M',
      yearOfManufacture: '2022',
      engine: '6.8L PowerTech PSS',
      horsepower: '150 HP',
      weight: '6500 kg',
      dimensions: '4.5m x 2.5m x 3.2m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1002',
    name: 'New Holland TC5.30 Harvester',
    category: 'Harvesters',
    images: [equipmentImages.harvester.main],
    dailyRate: 200,
    weeklyRate: 1260, // 10% discount
    monthlyRate: 5100, // 15% discount
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Efficient harvester with advanced technology for faster harvesting.',
    specifications: {
      manufacturer: 'New Holland',
      model: 'TC5.30',
      yearOfManufacture: '2022',
      engine: '6.7L FPT N67',
      horsepower: '230 HP',
      weight: '12000 kg',
      dimensions: '7.2m x 3.5m x 3.8m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1003',
    name: 'Valley Irrigation System',
    category: 'Irrigation',
    images: [equipmentImages.irrigation.main],
    dailyRate: 90,
    weeklyRate: 567, // 10% discount
    monthlyRate: 2295, // 15% discount
    location: 'Central Farm Depot',
    availability: 'unavailable',
    description: 'Modern irrigation system to ensure proper water distribution.',
    specifications: {
      manufacturer: 'Valley',
      model: '8000 Series',
      yearOfManufacture: '2022',
      engine: 'Electric Motor',
      horsepower: '10 HP',
      weight: '8000 kg',
      dimensions: '400m x 3m x 3m',
      fuelType: 'Electric'
    }
  },
  {
    id: 'E1004',
    name: 'Seed Drill Machine',
    category: 'Seeders',
    images: [equipmentImages.seeder.main],
    dailyRate: 75,
    weeklyRate: 472.5, // 10% discount
    monthlyRate: 1912.5, // 15% discount
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Precision seeder for optimal seed placement and spacing.',
    specifications: {
      manufacturer: 'Great Plains',
      model: '3S-4000',
      yearOfManufacture: '2022',
      engine: 'PTO Driven',
      horsepower: '100 HP',
      weight: '3500 kg',
      dimensions: '4m x 2.5m x 2.8m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1005',
    name: 'Kubota L3301 Compact Tractor',
    category: 'Tractors',
    images: [equipmentImages.kubotaTractor.main],
    dailyRate: 120,
    weeklyRate: 756, // 10% discount
    monthlyRate: 3060, // 15% discount
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Versatile compact tractor suitable for small to medium-sized farms.',
    specifications: {
      manufacturer: 'Kubota',
      model: 'L3301',
      yearOfManufacture: '2022',
      engine: '3.3L Kubota D1703',
      horsepower: '33 HP',
      weight: '1500 kg',
      dimensions: '3.2m x 1.5m x 2.4m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1006',
    name: 'Sprayer System 3000',
    category: 'Sprayers',
    images: [equipmentImages.sprayer.main],
    dailyRate: 85,
    weeklyRate: 535.5, // 10% discount
    monthlyRate: 2167.5, // 15% discount
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Advanced sprayer system with precise application control.',
    specifications: {
      manufacturer: 'John Deere',
      model: 'R4045',
      yearOfManufacture: '2022',
      engine: '4.5L PowerTech',
      horsepower: '173 HP',
      weight: '8000 kg',
      dimensions: '8.5m x 3.2m x 3.5m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1007',
    name: 'Chisel Plow',
    category: 'Tillage',
    images: [equipmentImages.chiselPlow.main],
    dailyRate: 60,
    weeklyRate: 378, // 10% discount
    monthlyRate: 1530, // 15% discount
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Heavy-duty chisel plow for primary tillage operations.',
    specifications: {
      manufacturer: 'Case IH',
      model: 'True-Tandem 330',
      yearOfManufacture: '2022',
      engine: 'N/A',
      horsepower: 'N/A',
      weight: '2500 kg',
      dimensions: '3.3m x 2.2m x 1.8m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1008',
    name: 'Rotary Mower',
    category: 'Mowers',
    images: [equipmentImages.rotaryMower.main],
    dailyRate: 45,
    weeklyRate: 283.5, // 10% discount
    monthlyRate: 1147.5, // 15% discount
    location: 'Eastern Equipment Center',
    availability: 'unavailable',
    description: 'Efficient rotary mower for maintaining fields and pastures.',
    specifications: {
      manufacturer: 'Bush Hog',
      model: 'SQ720',
      yearOfManufacture: '2022',
      engine: 'PTO Driven',
      horsepower: '50 HP',
      weight: '800 kg',
      dimensions: '1.8m x 1.2m x 1.5m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1009',
    name: 'Massey Ferguson 8S.245 Tractor',
    category: 'Tractors',
    images: [equipmentImages.masseyFergusonTractor.main],
    dailyRate: 175,
    weeklyRate: 1102.5, // 10% discount
    monthlyRate: 4462.5, // 15% discount
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'High-performance tractor with advanced comfort features for long working hours.',
    specifications: {
      manufacturer: 'Massey Ferguson',
      model: '8S.245',
      yearOfManufacture: '2022',
      engine: '6.6L AGCO Power',
      horsepower: '245 HP',
      weight: '8500 kg',
      dimensions: '5.2m x 2.5m x 3.2m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1010',
    name: 'Case IH Axial-Flow 250 Combine',
    category: 'Harvesters',
    images: [equipmentImages.combineHarvester.main],
    dailyRate: 250,
    weeklyRate: 1575, // 10% discount
    monthlyRate: 6375, // 15% discount
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'High-capacity combine harvester with advanced threshing technology.',
    specifications: {
      manufacturer: 'Case IH',
      model: 'Axial-Flow 250',
      yearOfManufacture: '2022',
      engine: '8.9L C9',
      horsepower: '325 HP',
      weight: '15000 kg',
      dimensions: '8.5m x 4.2m x 4m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1011',
    name: 'Boom Sprayer',
    category: 'Sprayers',
    images: [equipmentImages.boomSprayer.main],
    dailyRate: 70,
    weeklyRate: 441, // 10% discount
    monthlyRate: 1785, // 15% discount
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Wide coverage boom sprayer for efficient application of fertilizers and pesticides.',
    specifications: {
      manufacturer: 'Hardi',
      model: 'Commander 3200',
      yearOfManufacture: '2022',
      engine: 'PTO Driven',
      horsepower: '80 HP',
      weight: '3000 kg',
      dimensions: '12m x 2.5m x 3m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1012',
    name: 'Drip Irrigation Kit',
    category: 'Irrigation',
    images: [equipmentImages.dripIrrigation.main],
    dailyRate: 40,
    weeklyRate: 252, // 10% discount
    monthlyRate: 1020, // 15% discount
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Water-efficient drip irrigation system perfect for row crops and orchards.',
    specifications: {
      manufacturer: 'Netafim',
      model: 'DripNet PC',
      yearOfManufacture: '2022',
      engine: 'N/A',
      horsepower: 'N/A',
      weight: '500 kg',
      dimensions: 'Customizable',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1013',
    name: 'Disc Harrow',
    category: 'Tillage',
    images: [equipmentImages.discHarrow.main],
    dailyRate: 55,
    weeklyRate: 346.5, // 10% discount
    monthlyRate: 1402.5, // 15% discount
    location: 'Western Agricultural Supply',
    availability: 'unavailable',
    description: 'Heavy-duty disc harrow for breaking up and smoothing plowed ground.',
    specifications: {
      manufacturer: 'John Deere',
      model: '2300',
      yearOfManufacture: '2022',
      engine: 'N/A',
      horsepower: 'N/A',
      weight: '2000 kg',
      dimensions: '3m x 2.5m x 1.5m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1014',
    name: 'Fertilizer Spreader',
    category: 'Applicators',
    images: [equipmentImages.fertilizer.main],
    dailyRate: 65,
    weeklyRate: 409.5, // 10% discount
    monthlyRate: 1657.5, // 15% discount
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Precision fertilizer spreader with adjustable application rates.',
    specifications: {
      manufacturer: 'Amazone',
      model: 'ZAM 1500',
      yearOfManufacture: '2022',
      engine: 'PTO Driven',
      horsepower: '60 HP',
      weight: '1500 kg',
      dimensions: '3.5m x 2.2m x 2.5m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1015',
    name: 'Potato Harvester',
    category: 'Harvesters',
    images: [equipmentImages.potatoHarvester.main],
    dailyRate: 180,
    weeklyRate: 1134, // 10% discount
    monthlyRate: 4590, // 15% discount
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Specialized harvester designed for efficient potato collection with minimal damage.',
    specifications: {
      manufacturer: 'Grimme',
      model: 'SE 150-60',
      yearOfManufacture: '2022',
      engine: 'PTO Driven',
      horsepower: '150 HP',
      weight: '5000 kg',
      dimensions: '6m x 3m x 3.5m',
      fuelType: 'N/A'
    }
  },
  {
    id: 'E1016',
    name: 'Hay Baler',
    category: 'Hay Equipment',
    images: [equipmentImages.hayBaler.main],
    dailyRate: 110,
    weeklyRate: 693, // 10% discount
    monthlyRate: 2805, // 15% discount
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Efficient baler producing consistent, high-density rectangular bales.',
    specifications: {
      manufacturer: 'New Holland',
      model: 'BB960',
      yearOfManufacture: '2022',
      engine: 'PTO Driven',
      horsepower: '100 HP',
      weight: '3500 kg',
      dimensions: '4.5m x 2.5m x 2.8m',
      fuelType: 'N/A'
    }
  },
  // New equipment
  {
    id: 'E1017',
    name: 'Fendt 724 Vario Tractor',
    category: 'Tractors',
    images: [equipmentImages.fendtTractor.main],
    dailyRate: 180,
    weeklyRate: 1134, // 10% discount
    monthlyRate: 4590, // 15% discount
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'High-performance tractor with advanced Vario transmission system.',
    specifications: {
      manufacturer: 'Fendt',
      model: '724 Vario',
      yearOfManufacture: '2023',
      engine: '6.6L MAN D26',
      horsepower: '240 HP',
      weight: '7200 kg',
      dimensions: '4.8m x 2.6m x 3.3m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1018',
    name: 'Claas Lexion 8900 Harvester',
    category: 'Harvesters',
    images: [equipmentImages.claasLexionHarvester.main],
    dailyRate: 280,
    weeklyRate: 1764, // 10% discount
    monthlyRate: 7140, // 15% discount
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Premium combine harvester with advanced threshing technology.',
    specifications: {
      manufacturer: 'Claas',
      model: 'Lexion 8900',
      yearOfManufacture: '2023',
      engine: '16.2L Mercedes-Benz',
      horsepower: '790 HP',
      weight: '18500 kg',
      dimensions: '9.2m x 4.2m x 4.1m',
      fuelType: 'Diesel'
    }
  },
  {
    id: 'E1019',
    name: 'Center Pivot Irrigation System',
    category: 'Irrigation',
    images: [equipmentImages.centerPivotIrrigation.main],
    dailyRate: 120,
    weeklyRate: 756, // 10% discount
    monthlyRate: 3060, // 15% discount
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Large-scale irrigation system for efficient water distribution.',
    specifications: {
      manufacturer: 'Valley',
      model: 'Center Pivot 8000',
      yearOfManufacture: '2023',
      engine: 'Electric Motor',
      horsepower: '15 HP',
      weight: '12000 kg',
      dimensions: '800m x 3m x 3m',
      fuelType: 'Electric'
    }
  }
];

const EquipmentDetailsPage = ({ isAdmin = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    rentalPeriod: 'daily', // daily, weekly, monthly
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchEquipmentDetails();
  }, [id]);

  const fetchEquipmentDetails = () => {
    setLoading(true);
    try {
      const foundEquipment = mockEquipment.find(item => item.id === id);
      if (foundEquipment) {
        setEquipment(foundEquipment);
        setSelectedImage(0);
      }
    } catch (error) {
      console.error('Error fetching equipment details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (equipment && bookingData.startDate && bookingData.endDate) {
      calculateTotalPrice();
    }
  }, [bookingData, equipment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const calculateTotalPrice = () => {
    if (!equipment || !bookingData.startDate || !bookingData.endDate) {
      setTotalPrice(0);
      return;
    }

    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    
    // Calculate difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include end date
    
    let rate;
    let period;
    
    switch (bookingData.rentalPeriod) {
      case 'weekly':
        rate = equipment.weeklyRate;
        period = 7;
        break;
      case 'monthly':
        rate = equipment.monthlyRate;
        period = 30;
        break;
      default: // daily
        rate = equipment.dailyRate;
        period = 1;
    }
    
    const totalPeriods = Math.ceil(diffDays / period);
    setTotalPrice(totalPeriods * rate);
  };

  const handleEditClick = () => {
    navigate(`/admin/equipment/edit/${id}`);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.startDate || !bookingData.endDate) {
      setError('Please select both start and end dates');
      return;
    }

    const duration = Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = duration * equipment.dailyRate;

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      equipmentCategory: equipment.category,
      startDate: new Date(bookingData.startDate).toISOString(),
      endDate: new Date(bookingData.endDate).toISOString(),
      duration,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));

    // Show success message
    setSuccess('Booking request submitted successfully!');
    setError(null);

    // Redirect to bookings page after 2 seconds
    setTimeout(() => {
      navigate('/bookings');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
        <p className="text-gray-600">Loading equipment details...</p>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Equipment Not Found</h1>
        <p className="text-gray-600 mb-8">The equipment you're looking for does not exist or has been removed.</p>
        <Link to="/equipment" className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded">
          Browse Available Equipment
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/equipment" className="inline-flex items-center text-primary hover:text-accent">
          <FaArrowLeft className="mr-2" /> Back to Equipment
        </Link>
        
        {/* Admin Edit Button */}
        {isAdmin && (
          <button 
            onClick={handleEditClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaEdit className="mr-2" /> Edit Equipment
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <div className="relative mb-4 group rounded-lg overflow-hidden shadow-md">
            {equipment.images && equipment.images.length > 0 ? (
              <img 
                src={equipment.images[selectedImage]?.preview || 'https://placehold.co/800x600?text=No+Image'} 
                alt={equipment.name} 
                className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-[450px] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
            
            {equipment.images && equipment.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                  onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : equipment.images.length - 1))}
                  className="bg-black/60 hover:bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                  aria-label="Previous image"
                >
                  <FaArrowLeft className="text-xl" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => (prev < equipment.images.length - 1 ? prev + 1 : 0))}
                  className="bg-black/60 hover:bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                  aria-label="Next image"
                >
                  <FaArrowLeft className="rotate-180 text-xl" />
                </button>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{equipment.name}</h1>
              <div className="flex items-center">
                <span className="bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  {equipment.category}
                </span>
              </div>
            </div>
          </div>
          
          {equipment.images && equipment.images.length > 0 && (
            <div className="flex overflow-x-auto space-x-3 pb-4 hide-scrollbar">
              {equipment.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-28 h-24 rounded-md overflow-hidden transition-all duration-300 ${
                    selectedImage === index 
                      ? 'ring-4 ring-primary scale-105 shadow-md z-10' 
                      : 'ring-1 ring-gray-300 opacity-80 hover:opacity-100 hover:ring-primary/50'
                  }`}
                >
                  <img 
                    src={image.preview || 'https://placehold.co/800x600?text=No+Image'} 
                    alt={`${equipment.name} view ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </button>
              ))}
            </div>
          )}
          
          {/* Equipment Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 mb-6">{equipment.description}</p>
            
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {equipment.specifications && Object.entries(equipment.specifications).map(([key, value]) => (
                value && (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Info and Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">{equipment.name}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                {equipment.category}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <span>{equipment.location}</span>
            </div>
            
            <div className="border-t border-gray-200 my-4 pt-4">
              <h3 className="font-semibold text-lg mb-2">Rental Rates:</h3>
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>Daily Rate:</span>
                  <span className="font-bold">${equipment.dailyRate}</span>
                </li>
                <li className="flex justify-between">
                  <span>Weekly Rate:</span>
                  <span className="font-bold">${equipment.weeklyRate} <span className="text-green-500 text-sm">(Save 10%)</span></span>
                </li>
                <li className="flex justify-between">
                  <span>Monthly Rate:</span>
                  <span className="font-bold">${equipment.monthlyRate} <span className="text-green-500 text-sm">(Save 15%)</span></span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 my-4 pt-4">
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${equipment.availability === 'available' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-semibold ${equipment.availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                  {equipment.availability === 'available' ? 'Available Now' : 'Currently Unavailable'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {equipment.availability === 'available' 
                  ? 'This equipment is ready for booking' 
                  : 'This equipment is currently rented or undergoing maintenance'}
              </div>
            </div>
            
            {equipment.availability === 'available' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Book This Equipment</h3>
                {error && <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">{error}</div>}
                {success && <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">{success}</div>}
                <form onSubmit={handleBookingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={bookingData.startDate ? bookingData.startDate.split('T')[0] : ''}
                        onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={bookingData.endDate ? bookingData.endDate.split('T')[0] : ''}
                        onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                        min={bookingData.startDate ? bookingData.startDate.split('T')[0] : new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  {bookingData.startDate && bookingData.endDate && (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <p className="text-gray-600">
                        Duration: {Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                      <p className="text-gray-600">
                        Total Price: ${Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24)) * equipment.dailyRate}
                      </p>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-2">
              If you have questions about renting this equipment, please contact our customer support.
            </p>
            <a href="tel:+1234567890" className="text-primary hover:underline block">
              (123) 456-7890
            </a>
            <a href="mailto:support@farmrent.com" className="text-primary hover:underline block">
              support@farmrent.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailsPage; 