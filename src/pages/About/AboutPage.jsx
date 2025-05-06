import { Link } from 'react-router-dom';
import { FaTractor, FaUsers, FaHistory, FaSeedling, FaLeaf, FaHandshake } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="container-custom py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About FarmRent</h1>
          <p className="text-lg text-gray-700 mb-6">
            Connecting farmers with the equipment they need, when they need it.
          </p>
          <div className="flex justify-center">
            <FaTractor className="text-6xl text-primary" />
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-4">
              FarmRent was founded in 2020 with a simple mission: to make modern farming equipment accessible to all farmers, regardless of their operation size.
            </p>
            <p className="text-lg mb-4">
              We recognized that many small and medium-sized farms struggle with the high capital costs of purchasing equipment that might only be used seasonally. At the same time, larger operations often have equipment sitting idle during off-seasons.
            </p>
            <p className="text-lg">
              By creating a platform where farmers can easily rent equipment to and from each other, we're helping to maximize the utility of farming assets, reduce costs, and build a stronger agricultural community.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandshake className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">
              We believe in the power of farmers helping farmers. Our platform fosters cooperation and shared resources.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLeaf className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              By maximizing the use of existing equipment, we're reducing waste and promoting more sustainable farming practices.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSeedling className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We're constantly looking for new ways to improve our platform and help farmers access the latest technology.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Eng Mohamed', role: 'Founder & CEO', image: 'https://placehold.co/300x300?text=JS', bio: 'Former farmer with 20 years of experience in agricultural operations.' },
            { name: 'Eng Abdullaahi', role: 'COO', image: 'https://placehold.co/300x300?text=SJ', bio: 'Agricultural economist with expertise in farm equipment utilization.' },
            { name: 'AbdiHamiid Abdullahhi Hassan', role: 'CTO', image: 'https://placehold.co/300x300?text=MB', bio: 'Software engineer with a passion for solving agricultural challenges.' }
            
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Whether you're looking to rent equipment or make your machinery available to others, we'd love to have you as part of our growing community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 