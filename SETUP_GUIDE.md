# Hospital Appointment System - Complete Setup Guide

This is a comprehensive MERN stack Hospital Appointment System with Selenium automation testing built with beginner-friendly code and proper documentation.

## Project Structure

```
project/
├── backend/                  # Node.js Express Backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth and validation middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── server.js            # Express server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                # React.js Frontend
│   ├── public/
│   │   └── index.html       # Main HTML file
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   └── index.js         # React entry point
│   └── package.json
│
└── selenium-tests/          # Selenium Automation Tests
    ├── src/
    │   ├── main/java/com/hospital/
    │   │   ├── pages/       # Page Object Model
    │   │   └── utils/       # Test utilities
    │   └── test/java/com/hospital/
    │       └── tests/       # Test classes
    ├── pom.xml              # Maven configuration
    └── testng.xml           # TestNG configuration
```

## Prerequisites

Before installing and running the project, ensure you have the following installed:

### System Requirements

- **Node.js** (v14+): [Download](https://nodejs.org/)
- **npm** (v6+): Comes with Node.js
- **MongoDB** (v4.4+): [Download](https://www.mongodb.com/try/download/community)
- **Java JDK** (v11+): [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (v3.6+): [Download](https://maven.apache.org/download.cgi)
- **Google Chrome**: [Download](https://www.google.com/chrome/)

## Installation Steps

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/hospital-appointment
# JWT_SECRET=your_secret_key_here
# PORT=5000
```

### Step 2: Start MongoDB

```bash
# On Windows (if installed as service)
# MongoDB should auto-start

# Or start manually:
mongod

# You can also use MongoDB Atlas (cloud):
# Update MONGODB_URI in .env file with your connection string
```

### Step 3: Seed Sample Data (Optional)

Create a file `backend/seed.js`:

```javascript
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

// Connect to database
mongoose.connect(process.env.MONGODB_URI);

const doctors = [
  {
    name: "Dr. John Smith",
    specialization: "Cardiology",
    email: "john.smith@hospital.com",
    phone: "1234567890",
    qualifications: "MD, Board Certified",
    experience: 10,
    consultationFee: 100,
    availability: {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      startTime: "09:00",
      endTime: "17:00",
    },
  },
  {
    name: "Dr. Sarah Johnson",
    specialization: "Neurology",
    email: "sarah.johnson@hospital.com",
    phone: "0987654321",
    qualifications: "MD, Doctorate in Neurology",
    experience: 15,
    consultationFee: 120,
    availability: {
      dayOfWeek: ["Monday", "Wednesday", "Friday"],
      startTime: "10:00",
      endTime: "18:00",
    },
  },
];

Doctor.insertMany(doctors).then(() => {
  console.log("Doctors seeded successfully");
  process.exit(0);
});
```

### Step 4: Start Backend Server

```bash
# From backend directory
npm start
# Server runs on http://localhost:5000
```

### Step 5: Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start React development server
npm start
# App opens on http://localhost:3000
```

### Step 6: Selenium Automation Tests Setup

```bash
# Navigate to selenium-tests directory
cd selenium-tests

# Build the project
mvn clean install

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=RegistrationTest

# Run specific test method
mvn test -Dtest=RegistrationTest#testValidRegistration
```

## Configuration

### Backend Environment Variables (.env)

```
MONGODB_URI=mongodb://localhost:27017/hospital-appointment
JWT_SECRET=your_very_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Frontend Environment Variables (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Features Implemented

### 1. User Authentication

- **Registration** with password validation
- **Login** with JWT authentication
- **Password validation** with 7 constraints
- **Profile management**
- **Password change** functionality

### 2. Doctor Management

- **View all doctors** with details
- **Search doctors** by name or specialization
- **Doctor specializations**: Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, General
- **Admin functionality** to add/delete doctors

### 3. Appointment Management

- **Book appointments** with validation
- **View appointments** with status tracking
- **Cancel appointments**
- **Appointment statuses**: Scheduled, Completed, Cancelled

### 4. Admin Features

- **Manage doctors**: Add and delete doctors
- **Manage users**: View and delete users
- **View all appointments**

### 5. Password Validation Constraints

✓ 8-15 characters long
✓ At least one digit (0-9)
✓ At least one uppercase letter (A-Z)
✓ At least one lowercase letter (a-z)
✓ At least one special character (!@#$%&\*()-+=^.)
✓ No whitespace allowed

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update` - Update profile
- `PUT /api/auth/change-password` - Change password

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/search?query=...` - Search doctors
- `POST /api/doctors` - Add doctor (Admin)
- `PUT /api/doctors/:id` - Update doctor (Admin)
- `DELETE /api/doctors/:id` - Delete doctor (Admin)

### Appointments

- `GET /api/appointments` - Get user's appointments
- `GET /api/appointments/:id` - Get appointment details
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/admin/appointments` - Get all appointments (Admin)

### Admin

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `DELETE /api/admin/users/:id` - Delete user

## Testing

### Selenium Test Suites

1. **RegistrationTest** - 10 test cases
   - Valid registration
   - Password constraint validation
   - Duplicate email handling
   - Form field verification

2. **LoginTest** - 7 test cases
   - Valid login
   - Invalid credentials
   - Empty field validation
   - Error message display

3. **SearchTest** - 7 test cases
   - Doctor listing
   - Search by name and specialization
   - Search result handling
   - Doctor information display

4. **AppointmentTest** - 7 test cases
   - Navigation to appointments
   - Booking appointments
   - Canceling appointments
   - Form validation

5. **PasswordValidationTest** - 15 test cases
   - All password constraint validations
   - Edge cases (min/max length)
   - Special character validation
   - Error message content

### Running Tests

```bash
# All tests
mvn test

# Single test class
mvn test -Dtest=RegistrationTest

# TestNG suite
mvn test -Dsuite=src/test/resources/testng.xml

# With logging
mvn test -X
```

## Test Data

### Admin Account (Pre-configured)

```
Email: admin@example.com
Password: AdminPass@123
Role: Admin
```

### Patient Account (for testing)

```
Email: patient@example.com
Password: PatientPass@123
Role: Patient
```

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB on Windows
net start MongoDB

# Start MongoDB on Mac
brew services start mongodb-community
```

### Port Already in Use

```bash
# Backend (5000)
lsof -i :5000
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>
```

### Chrome WebDriver Issues

The Selenium tests use WebDriverManager which automatically downloads the correct ChromeDriver version. If issues persist:

```bash
# Clear WebDriver cache
rm -rf ~/.wdm/

# Run tests with verbose output
mvn test -X
```

### CORS Issues

If frontend can't connect to backend:

1. Ensure backend is running on port 5000
2. Check CORS configuration in `backend/server.js`
3. Verify `REACT_APP_API_URL` in frontend `.env`

## Technology Stack Summary

| Layer            | Technology                 | Version |
| ---------------- | -------------------------- | ------- |
| Frontend         | React.js                   | 18.2.0  |
| State Management | Context API + localStorage | -       |
| HTTP Client      | Axios                      | 1.3.0   |
| Routing          | React Router               | 6.8.0   |
| Backend          | Express.js                 | 4.18.2  |
| Database         | MongoDB                    | 4.4+    |
| Authentication   | JWT                        | 9.0.0   |
| Password Hashing | bcryptjs                   | 2.4.3   |
| Automation       | Selenium                   | 4.14.0  |
| Test Framework   | TestNG                     | 7.8.0   |
| Build Tool       | Maven                      | 3.6+    |

## Best Practices Implemented

✓ **Clean Code**: Well-organized, commented, and maintainable
✓ **Security**: Password hashing, JWT authentication, input validation
✓ **Error Handling**: Proper error messages and user feedback
✓ **Responsive Design**: Mobile-friendly UI
✓ **Page Object Model**: Selenium best practices
✓ **RESTful API**: Proper HTTP methods and status codes
✓ **Validation**: Frontend and backend validation
✓ **Logging**: Console logs for debugging

## Performance Considerations

- MongoDB indexing on frequently queried fields
- Pagination support (can be added to doctor/appointment lists)
- JWT token expiration (7 days)
- Implicit waits in Selenium tests
- Optimized CSS selectors for element identification

## Security Considerations

⚠️ **Important for Production:**

1. Change `JWT_SECRET` to a strong random string
2. Use environment variables for sensitive data
3. Implement HTTPS for production
4. Add rate limiting for API endpoints
5. Implement input sanitization
6. Add CSRF protection
7. Keep dependencies updated

## Future Enhancements

- Email notifications for appointments
- SMS reminders
- Appointment availability calendar
- Payment integration
- Doctor ratings and reviews
- Prescription management
- Medical history records
- Two-factor authentication
- Push notifications
- Appointment history export

## Support and Documentation

- Beginner-friendly comments in all code files
- Clear variable and function naming
- Try-catch error handling
- Console error logs for debugging
- This comprehensive setup guide

## License

This project is provided for educational purposes. Feel free to modify and use it as needed.

---

**Happy coding! 🚀**
