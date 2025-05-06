# FarmEquip - Farm Equipment Rental Platform

A modern web application for renting farming equipment, connecting farmers with equipment suppliers.

## Pages

The platform includes the following pages:

### Public Pages
- **Home** (`/`): Landing page showcasing featured equipment, categories, and testimonials
- **Equipment Listing** (`/equipment`): Browse all available equipment with filtering options
- **Equipment Details** (`/equipment/:id`): View details and book specific equipment
- **About** (`/about`): Information about the platform and team
- **Contact** (`/contact`): Contact form and location information
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration
- **404 Not Found** (`/*`): Custom 404 page

### Protected Pages (require login)
- **Bookings** (`/bookings`): User can view and manage their bookings
- **Admin Dashboard** (`/admin`): Administrative panel (requires admin role)

## Features

- Responsive design for all device sizes
- User authentication and authorization
- Equipment search, filtering, and sorting
- Booking management system
- Admin dashboard for equipment and booking management
- Contact form for customer inquiries

## Tech Stack

- React
- React Router
- Tailwind CSS
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/farmer-equipment-rental.git
cd farmer-equipment-rental
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173

## Folder Structure

```
farmer-equipment-rental/
├── public/
├── src/
│   ├── assets/         # Static assets like images
│   ├── components/     # Reusable UI components
│   │   └── common/     # Common components (Header, Footer, etc.)
│   ├── contexts/       # React contexts for state management
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   │   ├── About/      # About page
│   │   ├── Admin/      # Admin dashboard
│   │   ├── Auth/       # Login and Register pages
│   │   ├── Booking/    # Booking management page
│   │   ├── Contact/    # Contact page
│   │   ├── Equipment/  # Equipment listing and details
│   │   ├── Home/       # Homepage
│   │   └── NotFound/   # 404 page
│   ├── services/       # API service functions
│   └── utils/          # Utility functions
├── App.jsx             # Main application component
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
