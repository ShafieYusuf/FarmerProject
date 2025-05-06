import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTractor, 
  FaLeaf, 
  FaSearch, 
  FaCalendarAlt, 
  FaChevronRight, 
  FaArrowRight, 
  FaWater, 
  FaSeedling, 
  FaSprayCan, 
  FaTools, 
  FaCog,
  FaMapMarkerAlt 
} from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import FarmerHeroImage from '../../assets/images/hero/farmer-hero';
import equipmentImages from '../../assets/images/equipment/equipmentImages';

// Mock equipment data for featured items with real images
const featuredEquipment = [
  {
    id: 'E1001',
    name: 'John Deere 6150M Tractor',
    category: 'Tractors',
    image: equipmentImages.johnDeereTractor.main,
    dailyRate: 150,
    location: 'Central Farm Depot'
  },
  {
    id: 'E1005',
    name: 'Kubota L3301 Compact Tractor',
    category: 'Tractors',
    image: equipmentImages.kubotaTractor.main,
    dailyRate: 120,
    location: 'Eastern Equipment Center'
  },
  {
    id: 'E1002',
    name: 'New Holland TC5.30 Harvester',
    category: 'Harvesters',
    image: equipmentImages.harvester.main,
    dailyRate: 200,
    location: 'Eastern Equipment Center'
  }
];

// Mock testimonials with better images
const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    role: 'Corn Farmer',
    quote: 'FarmEquip has made it so easy to access quality equipment without the overhead costs. Highly recommended for seasonal farmers!',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Vineyard Owner',
    quote: 'The equipment quality exceeded my expectations. The booking process was straightforward, and delivery was on time.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    name: 'Robert Miller',
    role: 'Organic Farmer',
    quote: 'Being able to rent specialized equipment only when needed has transformed our small farm operations. Great service!',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }
];

// Categories with icons
const categories = [
  { name: 'Tractors', icon: <FaTractor /> },
  { name: 'Harvesters', icon: <FaCog /> },
  { name: 'Irrigation', icon: <FaWater /> },
  { name: 'Seeders', icon: <FaSeedling /> },
  { name: 'Sprayers', icon: <FaSprayCan /> },
  { name: 'Tillage', icon: <FaTools /> },
  { name: 'Mowers', icon: <FaLeaf /> }
];

// Floating icons configuration 
const floatingIcons = [
  { icon: <FaTractor />, top: '15%', left: '10%', size: 'text-2xl', animation: 'animate-float-slow' },
  { icon: <FaLeaf />, top: '25%', left: '85%', size: 'text-xl', animation: 'animate-float-reverse' },
  { icon: <FaWater />, top: '65%', left: '15%', size: 'text-xl', animation: 'animate-float' },
  { icon: <FiSun />, top: '20%', left: '50%', size: 'text-3xl', animation: 'animate-pulse' },
  { icon: <FaSeedling />, top: '70%', left: '80%', size: 'text-xl', animation: 'animate-float-slow-reverse' }
];

// Additional floating icons for other sections
const categorySectionIcons = [
  { icon: <FaTractor />, top: '10%', right: '5%', size: 'text-3xl', animation: 'animate-float-slow text-primary/30' },
  { icon: <FaTools />, top: '70%', left: '5%', size: 'text-2xl', animation: 'animate-float-reverse text-primary/20' },
  { icon: <FaSprayCan />, bottom: '15%', right: '15%', size: 'text-xl', animation: 'animate-float text-primary/25' }
];

const howItWorksSectionIcons = [
  { icon: <FaSeedling />, top: '15%', left: '8%', size: 'text-2xl', animation: 'animate-float-slow-reverse text-primary/30' },
  { icon: <FaCog />, top: '30%', right: '5%', size: 'text-3xl', animation: 'animate-float text-primary/20' },
  { icon: <FaLeaf />, bottom: '20%', right: '10%', size: 'text-xl', animation: 'animate-float-reverse text-primary/25' }
];

const HomePage = () => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/equipment?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div>
      {/* Hero Section with Full Width Background and floating icons */}
      <section className="relative bg-cover bg-center h-screen overflow-hidden" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${FarmerHeroImage()})`,
        minHeight: '550px',
        backgroundPosition: 'center center'
      }}>
        {/* Floating icons */}
        {floatingIcons.map((item, index) => (
          <div 
            key={index} 
            className={`absolute text-white opacity-60 ${item.size} ${item.animation}`}
            style={{ top: item.top, left: item.left }}
          >
            {item.icon}
          </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 text-shadow-lg uppercase tracking-wider">
              Farmers
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-shadow-lg">
              Growing Tomorrow Today
            </p>
            
            {/* Search Bar with animated focus effect */}
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-1 mt-8 transform transition-transform hover:scale-[1.02]">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search for equipment..."
                    className="w-full pl-10 pr-4 py-4 rounded-l-lg border-0 focus:ring-2 focus:ring-primary focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-primary text-white font-bold py-4 px-8 rounded-r-lg hover:bg-accent transition-all hover:scale-105"
                >
                  Search
                </button>
              </form>
            </div>
            
            {/* Action Buttons with hover effects*/}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/equipment" className="btn-primary flex items-center transform transition-transform hover:scale-105 hover:shadow-lg">
                Browse Equipment <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-white transform transition-transform hover:scale-105 hover:shadow-lg">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section with interactive effects */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        {/* Category section floating icons */}
        {categorySectionIcons.map((item, index) => (
          <div 
            key={index} 
            className={`absolute ${item.size} ${item.animation}`}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              bottom: item.bottom
            }}
          >
            {item.icon}
          </div>
        ))}
        
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/equipment?category=${category.name.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 text-center group relative overflow-hidden"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background effect on hover */}
                <div 
                  className={`absolute inset-0 bg-primary/5 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg`}
                ></div>
                
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary text-2xl group-hover:scale-110 transform transition-all duration-300">
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 relative z-10">{category.name}</h3>
                <p className="text-primary mt-2 text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10">
                  Browse <FaChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment with enhanced cards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Equipment</h2>
            <Link to="/equipment" className="text-primary hover:text-accent flex items-center font-medium group">
              View All <FaChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEquipment.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Link to={`/equipment/${item.id}`} className="relative block">
                  <div className="relative overflow-hidden h-52">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-primary/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <Link to={`/equipment/${item.id}`} className="font-semibold text-lg hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-gray-500 mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-gray-400" /> {item.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-primary">${item.dailyRate}/day</p>
                    <Link 
                      to={`/equipment/${item.id}`}
                      className="bg-primary text-white py-2 px-4 rounded hover:bg-accent transition-all inline-flex items-center hover:shadow-md group"
                    >
                      View Details <FaChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - with floating effect on icons */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
        {/* How it works section floating icons */}
        {howItWorksSectionIcons.map((item, index) => (
          <div 
            key={index} 
            className={`absolute ${item.size} ${item.animation}`}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              bottom: item.bottom
            }}
          >
            {item.icon}
          </div>
        ))}
        
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <FaSearch className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Browse & Select</h3>
              <p className="text-gray-600">
                Search our extensive inventory of farming equipment and select what you need.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-slow">
                <FaCalendarAlt className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Book & Confirm</h3>
              <p className="text-gray-600">
                Choose your rental dates and complete the booking process online.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-reverse">
                <FaTractor className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Receive & Use</h3>
              <p className="text-gray-600">
                Pick up the equipment or have it delivered to your farm and start using it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with improved styling */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-md p-8 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute right-0 top-0 text-8xl text-primary/5">"</div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonials[activeTestimonialIndex].image} 
                    alt={testimonials[activeTestimonialIndex].name} 
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-primary/20"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonials[activeTestimonialIndex].name}</h3>
                    <p className="text-gray-600">{testimonials[activeTestimonialIndex].role}</p>
                  </div>
                </div>
                <p className="text-lg italic text-gray-700 mb-6">
                  "{testimonials[activeTestimonialIndex].quote}"
                </p>
                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonialIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === activeTestimonialIndex ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 