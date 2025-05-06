import { useState, useEffect } from 'react';
import { FaSave, FaBell, FaCreditCard, FaCog, FaMoneyBillWave, FaGlobe, FaShieldAlt } from 'react-icons/fa';

// Mock settings data
const initialSettings = {
  platform: {
    siteName: 'FarmEquip',
    contactEmail: 'support@farmequip.com',
    phoneNumber: '(555) 123-4567',
    maintenanceMode: false,
    defaultLanguage: 'English',
    allowNewRegistrations: true
  },
  payment: {
    paymentGateways: ['Stripe', 'PayPal'],
    activatedGateway: 'Stripe',
    depositPercentage: 20,
    cancelFeePercentage: 10,
    taxPercentage: 7
  },
  notification: {
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    marketingEmails: true,
    adminAlerts: true
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
  }
};

const SystemSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('platform');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleInputChange = (category, field, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value
      }
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (category, field) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: !settings[category][field]
      }
    });
  };

  // Handle save settings
  const handleSaveSettings = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Settings saved successfully!');
      
      // Store settings in localStorage for persistence
      localStorage.setItem('systemSettings', JSON.stringify(settings));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('systemSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <button 
          className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded flex items-center"
          onClick={handleSaveSettings}
          disabled={isSubmitting}
        >
          <FaSave className="mr-2" />
          {isSubmitting ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium flex items-center ${activeTab === 'platform' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('platform')}
        >
          <FaGlobe className="mr-2" /> Platform Settings
        </button>
        <button
          className={`py-2 px-4 font-medium flex items-center ${activeTab === 'payment' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payment')}
        >
          <FaCreditCard className="mr-2" /> Payment Settings
        </button>
        <button
          className={`py-2 px-4 font-medium flex items-center ${activeTab === 'notification' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('notification')}
        >
          <FaBell className="mr-2" /> Notification Settings
        </button>
        <button
          className={`py-2 px-4 font-medium flex items-center ${activeTab === 'pricing' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('pricing')}
        >
          <FaMoneyBillWave className="mr-2" /> Pricing Settings
        </button>
        <button
          className={`py-2 px-4 font-medium flex items-center ${activeTab === 'security' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('security')}
        >
          <FaShieldAlt className="mr-2" /> Security Settings
        </button>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Platform Settings */}
        {activeTab === 'platform' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.platform.siteName}
                  onChange={(e) => handleInputChange('platform', 'siteName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.platform.contactEmail}
                  onChange={(e) => handleInputChange('platform', 'contactEmail', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.platform.phoneNumber}
                  onChange={(e) => handleInputChange('platform', 'phoneNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Default Language</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.platform.defaultLanguage}
                  onChange={(e) => handleInputChange('platform', 'defaultLanguage', e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenance-mode"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.platform.maintenanceMode}
                  onChange={() => handleCheckboxChange('platform', 'maintenanceMode')}
                />
                <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900">
                  Enable Maintenance Mode
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allow-registrations"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.platform.allowNewRegistrations}
                  onChange={() => handleCheckboxChange('platform', 'allowNewRegistrations')}
                />
                <label htmlFor="allow-registrations" className="ml-2 block text-sm text-gray-900">
                  Allow New Registrations
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Active Payment Gateway</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.payment.activatedGateway}
                  onChange={(e) => handleInputChange('payment', 'activatedGateway', e.target.value)}
                >
                  {settings.payment.paymentGateways.map((gateway) => (
                    <option key={gateway} value={gateway}>{gateway}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Deposit Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.payment.depositPercentage}
                  onChange={(e) => handleInputChange('payment', 'depositPercentage', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cancellation Fee Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.payment.cancelFeePercentage}
                  onChange={(e) => handleInputChange('payment', 'cancelFeePercentage', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Tax Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.payment.taxPercentage}
                  onChange={(e) => handleInputChange('payment', 'taxPercentage', Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notification' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.notification.emailNotifications}
                  onChange={() => handleCheckboxChange('notification', 'emailNotifications')}
                />
                <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                  Enable Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.notification.smsNotifications}
                  onChange={() => handleCheckboxChange('notification', 'smsNotifications')}
                />
                <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900">
                  Enable SMS Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="booking-reminders"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.notification.bookingReminders}
                  onChange={() => handleCheckboxChange('notification', 'bookingReminders')}
                />
                <label htmlFor="booking-reminders" className="ml-2 block text-sm text-gray-900">
                  Send Booking Reminders
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketing-emails"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.notification.marketingEmails}
                  onChange={() => handleCheckboxChange('notification', 'marketingEmails')}
                />
                <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-900">
                  Send Marketing Emails
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="admin-alerts"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.notification.adminAlerts}
                  onChange={() => handleCheckboxChange('notification', 'adminAlerts')}
                />
                <label htmlFor="admin-alerts" className="ml-2 block text-sm text-gray-900">
                  Send Admin Alerts for New Bookings
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Settings */}
        {activeTab === 'pricing' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Pricing Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Currency Symbol</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.pricing.currencySymbol}
                  onChange={(e) => handleInputChange('pricing', 'currencySymbol', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Currency Code</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.pricing.currencyCode}
                  onChange={(e) => handleInputChange('pricing', 'currencyCode', e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Weekly Discount Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.pricing.weeklyDiscountPercentage}
                  onChange={(e) => handleInputChange('pricing', 'weeklyDiscountPercentage', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Monthly Discount Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.pricing.monthlyDiscountPercentage}
                  onChange={(e) => handleInputChange('pricing', 'monthlyDiscountPercentage', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Featured Listing Fee</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">{settings.pricing.currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    className="w-full pl-8 p-2 border border-gray-300 rounded-md"
                    value={settings.pricing.featuredListingFee}
                    onChange={(e) => handleInputChange('pricing', 'featuredListingFee', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="two-factor"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={settings.security.twoFactorAuthForAdmins}
                  onChange={() => handleCheckboxChange('security', 'twoFactorAuthForAdmins')}
                />
                <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-900">
                  Require Two-Factor Authentication for Admins
                </label>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password Expiry (days)</label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.security.passwordExpiryDays}
                  onChange={(e) => handleInputChange('security', 'passwordExpiryDays', Number(e.target.value))}
                />
                <p className="text-xs text-gray-500 mt-1">0 = Never expire</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.security.loginAttempts}
                  onChange={(e) => handleInputChange('security', 'loginAttempts', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Automatic Logout (minutes)</label>
                <input
                  type="number"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.security.automaticLogout}
                  onChange={(e) => handleInputChange('security', 'automaticLogout', Number(e.target.value))}
                />
                <p className="text-xs text-gray-500 mt-1">0 = Never logout automatically</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSettings; 