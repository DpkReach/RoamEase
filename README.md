

A modern travel planning and booking application built with Next.js and Express.js, featuring real-time booking capabilities, interactive maps, and seamless user experience.

## 🌐 Live Demo

**[Visit RoamEase](https://roamease-webservice.onrender.com)**

## 🚀 Features

- **Travel Planning**: Interactive trip planning with destination search
- **Real-time Booking**: Seamless booking experience for accommodations and activities
- **Interactive Maps**: Google Maps integration for location-based services
- **User Authentication**: Secure login and registration with Firebase Auth
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live updates on bookings and availability
- **User Dashboard**: Personalized dashboard for managing trips and bookings

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Lucide React** - Modern icon library

### Backend
- **Express.js** - Node.js web framework
- **Node.js** - JavaScript runtime

### Database & Services
- **Firebase** - Authentication and real-time database
- **Google Maps API** - Maps and location services
- **Render** - Cloud hosting platform

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account
- Google Maps API key

### Clone the Repository
```bash
git clone <repository-url>
cd roamease
```


```


# Environment
NODE_ENV=development
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
roamease/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── server/               # Express.js server (if separate)
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Express Server (if separate)
npm run server       # Start Express server
npm run dev:server   # Start Express server in development
```

## 🌍 Deployment

### Render Deployment
The application is deployed on Render with the following configuration:

- **Runtime**: Node.js 20
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: 10000 (Render default)

## 🔐 Authentication

RoamEase uses Firebase Authentication supporting:
- Email/Password authentication
- Google OAuth (optional)
- Password reset functionality
- Protected routes and user sessions

## 🗺️ Maps Integration

Google Maps integration provides:
- Interactive map display
- Location search and autocomplete
- Marker placement for destinations
- Route planning and directions
- Geolocation services

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Travel Data
- `GET /api/destinations` - Get available destinations
- `GET /api/activities` - Get activities by location
- `GET /api/accommodations` - Get accommodations

## 🎨 UI/UX Features

- **Dark/Light Mode**: Toggle between themes
- **Mobile Responsive**: Optimized for all screen sizes
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant design
- **Progressive Web App**: PWA capabilities

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Add your domain to authorized domains
4. Copy configuration to environment variables

### Google Maps Setup
1. Create a Google Cloud project
2. Enable Maps JavaScript API
3. Create API credentials
4. Add API key to environment variables

## 📊 Performance

- **Core Web Vitals**: Optimized for performance
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Optimized caching strategies
- **SEO**: Server-side rendering and meta tags

## 🐛 Troubleshooting

### Common Issues
- **502 Error**: Check port configuration and environment variables
- **Build Failures**: Verify all dependencies are installed
- **API Errors**: Check Firebase configuration and API keys
- **Map Not Loading**: Verify Google Maps API key and billing

### Debug Mode
Enable debug mode by setting:
```env
DEBUG=true
NEXT_PUBLIC_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- **Development Team**: Full-stack developers
- **Design Team**: UI/UX designers
- **DevOps**: Infrastructure and deployment

## 📞 Support

For support and questions:
- **Email**: deepakadimoolam1412@gmail.com
- **Issues**: [GitHub Issues](https://github.com/DpkReach/RoamEase/issues)


## 🚀 Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] Advanced filtering and search
- [ ] Social features and trip sharing
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Payment integration
- [ ] Review and rating system

---

**Built with ❤️ by DpkReach

*Last updated: July 2025*