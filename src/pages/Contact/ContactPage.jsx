import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real app, this would send the data to a server
    // For now, just simulate a successful submission
    setError('');
    setSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
          
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-md flex items-center mb-4">
              <FaCheckCircle className="mr-2" />
              Thank you for your message! We'll get back to you shortly.
            </div>
          ) : (
            error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                {error}
              </div>
            )
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Hassan@example.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                placeholder="Equipment Rental Inquiry"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-field min-h-[150px]"
                placeholder="Write your message here..."
                required
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
        
        {/* Contact Information */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    KM6 Afgooye Street<br />
                    mogadisho,Banadir<br />
                    East Africa,Somalia
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <FaPhone className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+11234567890" className="hover:text-primary">+252612176032</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@farmrent.com" className="hover:text-primary">info@farmrent.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Office Hours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Office Hours</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Saturday - Friday</span>
                <span className="text-gray-600">8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Saturday</span>
                <span className="text-gray-600">10:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Sunday</span>
                <span className="text-gray-600">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Our Location</h2>
        {/* In a real app, you would integrate with Google Maps or another mapping service */}
        <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FaMapMarkerAlt className="text-primary text-4xl mx-auto mb-2" />
            <p className="text-gray-700">Map integration would go here</p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I rent equipment?",
              answer: "Browse our available equipment, select the dates you need, and submit a booking request. Once approved, you can pick up the equipment or arrange for delivery."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and bank transfers. Payment is required at the time of booking confirmation."
            },
            {
              question: "Can I cancel my booking?",
              answer: "Yes, you can cancel bookings up to 48 hours before the scheduled pickup time for a full refund. Cancellations within 48 hours may be subject to a cancellation fee."
            },
            {
              question: "Do you offer delivery?",
              answer: "Yes, delivery is available for larger equipment within a 50-mile radius of our location. Additional delivery fees may apply."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <h3 className="font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 