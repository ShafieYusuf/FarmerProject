import { Link } from 'react-router-dom';
import { FaTractor, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FaTractor className="text-secondary text-2xl" />
              <span className="text-xl font-bold text-secondary">FarmRent</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Connecting farmers with the equipment they need, when they need it. Rent farm machinery easily and affordably.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="text-gray-300 hover:text-secondary transition-colors">
                  Our Equipment
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-secondary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-secondary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Equipment Categories */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/equipment?category=tractors" className="text-gray-300 hover:text-secondary transition-colors">
                  Tractors
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=harvesters" className="text-gray-300 hover:text-secondary transition-colors">
                  Harvesters
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=irrigation" className="text-gray-300 hover:text-secondary transition-colors">
                  Irrigation Systems
                </Link>
              </li>
              <li>
                <Link to="/equipment?category=seeders" className="text-gray-300 hover:text-secondary transition-colors">
                  Seeders & Planters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="text-gray-300 not-italic space-y-2">
              <p>123 Farm Road</p>
              <p>Agri City, AC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@farmrent.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center text-gray-400">
          <p>&copy; {currentYear} FarmRent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 