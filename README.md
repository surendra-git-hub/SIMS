# README - Hospital Appointment System

## Overview

A complete **MERN Stack Hospital Appointment System** with comprehensive Selenium automation testing using Java and TestNG. This project demonstrates professional web development practices with a clean architecture, secure authentication, and thorough test coverage.

## Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+)
- Java JDK (v11+)
- Maven (v3.6+)
- Google Chrome

### Quick Setup

```bash
# Backend
cd backend
npm install
npm start  # Runs on http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
npm start  # Runs on http://localhost:3000

# Tests (new terminal)
cd selenium-tests
mvn test
```

## Project Features

### 🔐 Authentication & Security

- User registration with strong password validation
- JWT-based authentication
- Secure password hashing with bcryptjs
- Protected routes and admin verification

### 👨‍⚕️ Doctor Management

- Browse all doctors with details
- Search doctors by name or specialization
- Admin ability to add/remove doctors
- Availability scheduling

### 📅 Appointment Booking

- Book appointments with date/time selection
- View appointment history
- Cancel appointments
- Appointment status tracking

### 👤 User Profile

- View personal information
- Update profile details
- Change password functionality
- Role-based access control

### ⚙️ Admin Panel

- Manage doctors (CRUD operations)
- View and manage users
- Monitor all appointments
- System administration

## Password Validation Rules

Passwords must be:

- **Length**: 8-15 characters
- **Digits**: At least one (0-9)
- **Uppercase**: At least one (A-Z)
- **Lowercase**: At least one (a-z)
- **Special Characters**: At least one (!@#$%&\*()-+=^.)
- **No spaces** allowed

Example: `ValidPass@123`

## Project Structure

```
project/
├── backend/              # Express.js REST API
│   ├── config/          # Database config
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & validation
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── server.js
│
├── frontend/            # React.js UI
│   ├── src/
│   │   ├── components/  # Reusable UI
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   └── utils/       # Helpers
│   └── public/
│
└── selenium-tests/      # Automation Suite
    ├── src/
    │   ├── main/        # Page Object Models
    │   └── test/        # Test Cases
    └── pom.xml
```

## API Routes Summary

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/auth/register`    | Register new user  |
| POST   | `/api/auth/login`       | User login         |
| GET    | `/api/doctors`          | Get all doctors    |
| GET    | `/api/doctors/search`   | Search doctors     |
| POST   | `/api/appointments`     | Book appointment   |
| GET    | `/api/appointments`     | View appointments  |
| DELETE | `/api/appointments/:id` | Cancel appointment |

## Selenium Test Coverage

### Test Classes (5)

1. **RegistrationTest** (10 tests)
2. **LoginTest** (7 tests)
3. **SearchTest** (7 tests)
4. **AppointmentTest** (7 tests)
5. **PasswordValidationTest** (15 tests)

**Total: 46 automated test cases**

## Key Files

### Backend

- `server.js` - Express app setup
- `config/database.js` - MongoDB connection
- `middleware/auth.js` - JWT authentication
- `middleware/validation.js` - Password validation
- `controllers/authController.js` - Auth logic
- `controllers/doctorController.js` - Doctor operations
- `controllers/appointmentController.js` - Appointment logic

### Frontend

- `App.js` - Main app with routing
- `utils/AuthContext.js` - Global auth state
- `utils/ProtectedRoute.js` - Private routes
- `pages/DashboardPage.jsx` - Home view
- `pages/DoctorsPage.jsx` - Doctor listing
- `pages/AppointmentsPage.jsx` - Appointment management
- `services/api.js` - API client

### Tests

- `WebDriverFactory.java` - Driver management
- `AuthPage.java` - Login/Register page object
- `DoctorsPage.java` - Doctors page object
- `AppointmentsPage.java` - Appointments page object
- `RegistrationTest.java` - Registration test suite
- `PasswordValidationTest.java` - Password validation tests

## Environment Configuration

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/hospital-appointment
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features by Module

### Registration Module

- ✅ Valid registration with all fields
- ✅ Real-time password validation
- ✅ Error messages for each constraint
- ✅ Duplicate email prevention
- ✅ Confirm password validation

### Login Module

- ✅ Email/password authentication
- ✅ JWT token generation
- ✅ Error handling for invalid credentials
- ✅ Session persistence

### Doctor Module

- ✅ List all doctors
- ✅ View doctor details
- ✅ Search by name/specialization
- ✅ Filter by specialization
- ✅ Admin: Add doctor
- ✅ Admin: Delete doctor

### Appointment Module

- ✅ Book new appointment
- ✅ View appointments list
- ✅ Cancel appointment
- ✅ Update appointment status
- ✅ Date/time validation

### Profile Module

- ✅ View profile
- ✅ Edit name/phone
- ✅ Change password
- ✅ Password validation on change

### Admin Module

- ✅ Add doctors
- ✅ Delete doctors
- ✅ View all users
- ✅ Delete users
- ✅ View all appointments

## Testing

### Running Selenium Tests

```bash
cd selenium-tests

# All tests
mvn test

# Registration tests only
mvn test -Dtest=RegistrationTest

# Login tests only
mvn test -Dtest=LoginTest

# Password validation tests
mvn test -Dtest=PasswordValidationTest

# Generate report
mvn surefire-report:report
```

### Test Reports

Test results are generated in:

- `target/surefire-reports/`
- `target/site/surefire-report.html`

## Code Quality Standards

- ✅ Clean, readable code with comments
- ✅ Proper error handling
- ✅ Input validation (frontend + backend)
- ✅ Security best practices
- ✅ RESTful API design
- ✅ Responsive UI design
- ✅ Consistent naming conventions
- ✅ DRY (Don't Repeat Yourself) principle

## Beginner-Friendly Features

- Clear variable names
- Inline code comments explaining logic
- Try-catch error handling
- Console logs for debugging
- Detailed error messages
- Responsive error UI
- Step-by-step setup guide
- Example test cases

## Common Issues & Solutions

### MongoDB Connection Error

```bash
# Start MongoDB
mongod
# or on Mac
brew services start mongodb-community
```

### Port 3000 or 5000 Already in Use

```bash
# Kill process on port
lsof -i :3000  # or :5000
kill -9 <PID>
```

### Chrome WebDriver Issues

WebDriverManager handles driver download automatically. If issues:

```bash
mvn clean test
```

### CORS/Connection Issues

- Verify backend is running (`http://localhost:5000`)
- Check `.env` file in frontend
- Ensure MongoDB is connected

## Performance Tips

- Backend response caching
- Frontend lazy loading
- Optimized CSS selectors
- Database indexing on common queries
- JWT token expiration management

## Security Notes

⚠️ **Before Production:**

1. Change JWT_SECRET to strong random value
2. Enable HTTPS
3. Add rate limiting
4. Implement input sanitization
5. Add CSRF protection
6. Setup firewall rules
7. Regular security updates

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Development Tools

Recommended IDE: **Visual Studio Code**

Extensions:

- REST Client
- MongoDB for VS Code
- Prettier
- ESLint

## Contributing

This is an educational project. Feel free to:

- Modify the code
- Add new features
- Improve UI/UX
- Enhance test coverage
- Optimize performance

## Learning Resources

The code includes examples of:

- React hooks and context API
- Express.js REST APIs
- MongoDB/Mongoose
- JWT authentication
- Password hashing
- Selenium Page Object Model
- TestNG framework
- Maven build tool

## Deployment

### Frontend (Netlify/Vercel)

```bash
npm run build
# Deploy build folder
```

### Backend (Heroku/Railway)

```bash
git init
git add .
git commit -m "initial"
git push heroku main
```

## Support

For issues or questions:

1. Check the SETUP_GUIDE.md
2. Review error messages
3. Check browser console (F12)
4. Check MongoDB connection
5. Verify all services are running

## License

Educational project - Free to use and modify.

---

**Built with ❤️ for learning web development**

**Happy coding! 🚀**
