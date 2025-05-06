import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HomePage from './pages/Home/HomePage'
import EquipmentDetailsPage from './pages/Equipment/EquipmentDetailsPage'
import EquipmentListingPage from './pages/Equipment/EquipmentListingPage'
import BookingPage from './pages/Booking/BookingPage'
import AboutPage from './pages/About/AboutPage'
import ContactPage from './pages/Contact/ContactPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import BookingsManagementPage from './pages/Admin/BookingsManagementPage'

// Import pages later
const NotFound = () => <div className="container-custom py-8">404 - Page Not Found</div>

// Layout wrapper component that conditionally renders Header and Footer
const Layout = ({ children, isLoggedIn, isAdmin, setIsLoggedIn }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn} />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <Router>
      <Routes>
        {/* Root redirect to register */}
        <Route path="/" element={<Navigate to="/register" />} />
        
        {/* Auth Routes - These are initial pages users will see */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        
        {/* Protected Routes - Requires login */}
        <Route 
          path="/home" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        <Route 
          path="/equipment" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {isLoggedIn ? <EquipmentListingPage /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        <Route 
          path="/equipment/:id" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {isLoggedIn ? <EquipmentDetailsPage /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {isLoggedIn ? <AboutPage /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              <ContactPage />
            </Layout>
          } 
        />
        <Route 
          path="/bookings" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {isLoggedIn && !isAdmin ? <BookingPage /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {(isLoggedIn && isAdmin) ? <AdminDashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        <Route 
          path="/admin/bookings" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              {(isLoggedIn && isAdmin) ? <BookingsManagementPage /> : <Navigate to="/login" />}
            </Layout>
          } 
        />
        
        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn}>
              <NotFoundPage />
            </Layout>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
