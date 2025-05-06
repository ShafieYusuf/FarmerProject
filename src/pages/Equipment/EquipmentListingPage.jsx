import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes, FaTractor, FaSortAmountDown, FaSortAmountUp, FaMapMarkerAlt } from 'react-icons/fa';
import equipmentImages from '../../assets/images/equipment/equipmentImages';

// All possible categories
const allCategories = ['Tractors', 'Harvesters', 'Irrigation', 'Seeders', 'Sprayers', 'Tillage', 'Mowers', 'Hay Equipment', 'Applicators'];

// All possible locations
const allLocations = ['Central Farm Depot', 'Eastern Equipment Center', 'Western Agricultural Supply'];

// Mock equipment data with real images
const mockEquipment = [
  // Existing equipment
  {
    id: 'E1001',
    name: 'John Deere 6150M Tractor',
    category: 'Tractors',
    images: [equipmentImages.johnDeereTractor.main],
    dailyRate: 150,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Powerful tractor perfect for heavy-duty farming tasks.'
  },
  {
    id: 'E1002',
    name: 'New Holland TC5.30 Harvester',
    category: 'Harvesters',
    images: [equipmentImages.harvester.main],
    dailyRate: 200,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Efficient harvester with advanced technology for faster harvesting.'
  },
  {
    id: 'E1003',
    name: 'Valley Irrigation System',
    category: 'Irrigation',
    images: [equipmentImages.irrigation.main],
    dailyRate: 90,
    location: 'Central Farm Depot',
    availability: 'unavailable',
    description: 'Modern irrigation system to ensure proper water distribution.'
  },
  {
    id: 'E1004',
    name: 'Seed Drill Machine',
    category: 'Seeders',
    images: [equipmentImages.seeder.main],
    dailyRate: 75,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Precision seeder for optimal seed placement and spacing.'
  },
  {
    id: 'E1005',
    name: 'Kubota L3301 Compact Tractor',
    category: 'Tractors',
    images: [equipmentImages.kubotaTractor.main],
    dailyRate: 120,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Versatile compact tractor suitable for small to medium-sized farms.'
  },
  {
    id: 'E1006',
    name: 'Sprayer System 3000',
    category: 'Sprayers',
    images: [equipmentImages.sprayer.main],
    dailyRate: 85,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Advanced sprayer system with precise application control.'
  },
  {
    id: 'E1007',
    name: 'Chisel Plow',
    category: 'Tillage',
    images: [equipmentImages.chiselPlow.main],
    dailyRate: 60,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Heavy-duty chisel plow for primary tillage operations.'
  },
  {
    id: 'E1008',
    name: 'Rotary Mower',
    category: 'Mowers',
    images: [equipmentImages.rotaryMower.main],
    dailyRate: 45,
    location: 'Eastern Equipment Center',
    availability: 'unavailable',
    description: 'Efficient rotary mower for maintaining fields and pastures.'
  },
  {
    id: 'E1009',
    name: 'Massey Ferguson 8S.245 Tractor',
    category: 'Tractors',
    images: [equipmentImages.masseyFergusonTractor.main],
    dailyRate: 175,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'High-performance tractor with advanced comfort features for long working hours.'
  },
  {
    id: 'E1010',
    name: 'Case IH Axial-Flow 250 Combine',
    category: 'Harvesters',
    images: [equipmentImages.combineHarvester.main],
    dailyRate: 250,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'High-capacity combine harvester with advanced threshing technology.'
  },
  {
    id: 'E1011',
    name: 'Boom Sprayer',
    category: 'Sprayers',
    images: [equipmentImages.boomSprayer.main],
    dailyRate: 70,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Wide coverage boom sprayer for efficient application of fertilizers and pesticides.'
  },
  {
    id: 'E1012',
    name: 'Drip Irrigation Kit',
    category: 'Irrigation',
    images: [equipmentImages.dripIrrigation.main],
    dailyRate: 40,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Water-efficient drip irrigation system perfect for row crops and orchards.'
  },
  {
    id: 'E1013',
    name: 'Disc Harrow',
    category: 'Tillage',
    images: [equipmentImages.discHarrow.main],
    dailyRate: 55,
    location: 'Western Agricultural Supply',
    availability: 'unavailable',
    description: 'Heavy-duty disc harrow for breaking up and smoothing plowed ground.'
  },
  {
    id: 'E1014',
    name: 'Fertilizer Spreader',
    category: 'Applicators',
    images: [equipmentImages.fertilizer.main],
    dailyRate: 65,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Precision fertilizer spreader with adjustable application rates.'
  },
  {
    id: 'E1015',
    name: 'Potato Harvester',
    category: 'Harvesters',
    images: [equipmentImages.potatoHarvester.main],
    dailyRate: 180,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Specialized harvester designed for efficient potato collection with minimal damage.'
  },
  {
    id: 'E1016',
    name: 'Hay Baler',
    category: 'Hay Equipment',
    images: [equipmentImages.hayBaler.main],
    dailyRate: 110,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Efficient baler producing consistent, high-density rectangular bales.'
  },
  // New equipment
  {
    id: 'E1017',
    name: 'Fendt 724 Vario Tractor',
    category: 'Tractors',
    images: [equipmentImages.fendtTractor.main],
    dailyRate: 180,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'High-performance tractor with advanced Vario transmission system.'
  },
  {
    id: 'E1018',
    name: 'Claas Lexion 8900 Harvester',
    category: 'Harvesters',
    images: [equipmentImages.claasLexionHarvester.main],
    dailyRate: 280,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Premium combine harvester with advanced threshing technology.'
  },
  {
    id: 'E1019',
    name: 'Center Pivot Irrigation System',
    category: 'Irrigation',
    images: [equipmentImages.centerPivotIrrigation.main],
    dailyRate: 120,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Large-scale irrigation system for efficient water distribution.'
  },
  {
    id: 'E1020',
    name: 'Precision Air Seeder',
    category: 'Seeders',
    images: [equipmentImages.precisionSeeder.main],
    dailyRate: 95,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Advanced seeder with precise seed placement technology.'
  },
  {
    id: 'E1021',
    name: 'Self-Propelled Sprayer',
    category: 'Sprayers',
    images: [equipmentImages.selfPropelledSprayer.main],
    dailyRate: 150,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'High-capacity sprayer with advanced application control.'
  },
  {
    id: 'E1022',
    name: 'Heavy-Duty Subsoiler',
    category: 'Tillage',
    images: [equipmentImages.subsoiler.main],
    dailyRate: 85,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'Deep tillage equipment for breaking up compacted soil.'
  },
  {
    id: 'E1023',
    name: 'Flail Mower',
    category: 'Mowers',
    images: [equipmentImages.flailMower.main],
    dailyRate: 65,
    location: 'Central Farm Depot',
    availability: 'available',
    description: 'Versatile mower for maintaining rough terrain and vegetation.'
  },
  {
    id: 'E1024',
    name: 'Hay Tedder',
    category: 'Hay Equipment',
    images: [equipmentImages.hayTedder.main],
    dailyRate: 55,
    location: 'Eastern Equipment Center',
    availability: 'available',
    description: 'Efficient equipment for spreading and aerating hay.'
  },
  {
    id: 'E1025',
    name: 'Manure Spreader',
    category: 'Applicators',
    images: [equipmentImages.manureSpreader.main],
    dailyRate: 75,
    location: 'Western Agricultural Supply',
    availability: 'available',
    description: 'High-capacity spreader for efficient fertilizer application.'
  }
];

const EquipmentListingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // State for equipment and filters
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || '');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availability, setAvailability] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 250 });
  const [sortBy, setSortBy] = useState('name-asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch equipment data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setEquipment(mockEquipment);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    if (selectedCategory) {
      // Update URL with category filter
      const params = new URLSearchParams(location.search);
      params.set('category', selectedCategory.toLowerCase());
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [selectedCategory, navigate, location.search]);

  // Filter and sort equipment
  const filteredEquipment = equipment.filter(item => {
    // Search term filter
    const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = !selectedCategory || item.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Location filter
    const matchesLocation = !selectedLocation || item.location === selectedLocation;
    
    // Availability filter
    const matchesAvailability = availability === 'all' || 
                               (availability === 'available' && item.availability === 'available') || 
                               (availability === 'unavailable' && item.availability !== 'available');
    
    // Price range filter
    const matchesPrice = item.dailyRate >= priceRange.min && item.dailyRate <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesAvailability && matchesPrice;
  }).sort((a, b) => {
    // Sort by selected option
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.dailyRate - b.dailyRate;
      case 'price-desc':
        return b.dailyRate - a.dailyRate;
      default:
        return 0;
    }
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Update URL with search term
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setAvailability('all');
    setPriceRange({ min: 0, max: 250 });
    setSortBy('name-asc');
    navigate({ search: '' }, { replace: true });
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Equipment Listings</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row items-start gap-4 mb-8">
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="w-full lg:w-2/3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field w-full pl-10 pr-16"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 text-white bg-primary hover:bg-accent rounded-r"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Filter Toggle Button */}
        <button
          className="lg:hidden w-full flex items-center justify-center space-x-2 p-2 border border-gray-300 rounded bg-white"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? (
            <>
              <FaTimes className="text-gray-600" />
              <span>Close Filters</span>
            </>
          ) : (
            <>
              <FaFilter className="text-gray-600" />
              <span>Show Filters</span>
            </>
          )}
        </button>
        
        {/* Sort by Dropdown (Mobile) */}
        <div className="lg:hidden w-full">
          <select
            className="input-field w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
        
        {/* Sort by Dropdown (Desktop) */}
        <div className="hidden lg:flex lg:w-1/3 items-center space-x-2">
          <span className="text-gray-600">Sort by:</span>
          <select
            className="input-field flex-grow"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Panel */}
        <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:text-accent"
              >
                Reset All
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Category</h3>
              <select
                className="input-field w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {allCategories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Location</h3>
              <select
                className="input-field w-full"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {allLocations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Availability Filter */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    checked={availability === 'all'}
                    onChange={() => setAvailability('all')}
                    className="mr-2"
                  />
                  All
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    checked={availability === 'available'}
                    onChange={() => setAvailability('available')}
                    className="mr-2"
                  />
                  Available Now
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    checked={availability === 'unavailable'}
                    onChange={() => setAvailability('unavailable')}
                    className="mr-2"
                  />
                  Currently Unavailable
                </label>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Price Range ($/day)</h3>
              <div className="flex items-center justify-between mb-2">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Equipment Listing */}
        <div className="lg:w-3/4">
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                  <div className="bg-white p-4 rounded-b-lg shadow-md">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEquipment.length === 0 ? (
            // No results
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <FaTractor className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No equipment found</h3>
              <p className="text-gray-600 mb-4">
                No equipment matches your search criteria. Try adjusting your filters or search term.
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            // Equipment cards
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredEquipment.length} of {equipment.length} items
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEquipment.map(item => (
                  <div key={item.id} className="card bg-white rounded-lg overflow-hidden shadow-md group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-[240px] overflow-hidden">
                      <img 
                        src={item.images?.[0]?.preview || 'https://placehold.co/800x600?text=No+Image'} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.availability !== 'available' && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 text-sm font-semibold rounded-bl-lg">
                          Currently Unavailable
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                        <span className="inline-block bg-primary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1.5 text-primary/70" /> {item.location}
                          </p>
                        </div>
                        <span className="font-bold text-accent text-xl">
                          ${item.dailyRate}<span className="text-sm font-medium text-gray-500">/day</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>
                      
                      <Link
                        to={`/equipment/${item.id}`}
                        className={`block w-full text-center py-2.5 rounded-md font-medium transition-all ${
                          item.availability === 'available'
                            ? 'bg-primary text-white hover:bg-accent shadow-sm hover:shadow' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={e => item.availability !== 'available' && e.preventDefault()}
                      >
                        {item.availability === 'available' ? 'View Details' : 'Unavailable'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentListingPage; 