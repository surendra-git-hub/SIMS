# Quick Reference Guide

## Project Overview

**MERN Stack Hospital Appointment System with Selenium Automation Testing**

- **Frontend:** React.js (Port 3000)
- **Backend:** Node.js/Express (Port 5000)
- **Database:** MongoDB (Port 27017)
- **Testing:** Selenium + Java + TestNG

## Directory Tree

```
project/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── adminRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Auth.css
│   │   │   └── Navigation.css
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   ├── AppointmentsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Doctors.css
│   │   │   ├── Appointments.css
│   │   │   ├── Profile.css
│   │   │   └── Admin.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   ├── AuthContext.js
│   │   │   └── ProtectedRoute.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── selenium-tests/
│   ├── src/
│   │   ├── main/java/com/hospital/
│   │   │   ├── pages/
│   │   │   │   ├── AuthPage.java
│   │   │   │   ├── DashboardPage.java
│   │   │   │   ├── DoctorsPage.java
│   │   │   │   └── AppointmentsPage.java
│   │   │   └── utils/
│   │   │       ├── WebDriverFactory.java
│   │   │       ├── TestUtils.java
│   │   │       ├── TestListener.java
│   │   │       └── PasswordValidator.java
│   │   └── test/java/com/hospital/tests/
│   │       ├── RegistrationTest.java
│   │       ├── LoginTest.java
│   │       ├── SearchTest.java
│   │       ├── AppointmentTest.java
│   │       └── PasswordValidationTest.java
│   ├── src/test/resources/
│   │   └── testng.xml
│   └── pom.xml
├── README.md
├── SETUP_GUIDE.md
├── SELENIUM_GUIDE.md
└── .gitignore
```

## Quick Commands

### Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start server
npm start

# Test API with curl
curl http://localhost:5000/api/health
```

### Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Selenium Tests

```bash
# Navigate to tests
cd selenium-tests

# Build and compile
mvn clean install

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=RegistrationTest

# Generate report
mvn surefire-report:report
```

## Test Accounts

### Admin Account

```
Email: admin@example.com
Password: AdminPass@123
Role: admin
```

### Patient Account

```
Email: patient@example.com
Password: PatientPass@123
Role: patient
```

## API Base URL

```
http://localhost:5000/api
```

## Key File Locations

| File                | Location                                                                | Purpose              |
| ------------------- | ----------------------------------------------------------------------- | -------------------- |
| Backend Entry       | `backend/server.js`                                                     | Express server setup |
| Database Config     | `backend/config/database.js`                                            | MongoDB connection   |
| Auth Middleware     | `backend/middleware/auth.js`                                            | JWT verification     |
| Password Validation | `backend/middleware/validation.js`                                      | Password rules       |
| Frontend Entry      | `frontend/src/App.js`                                                   | React app routing    |
| API Client          | `frontend/src/services/api.js`                                          | Axios configuration  |
| Auth Context        | `frontend/src/utils/AuthContext.js`                                     | Global state         |
| Selenium Config     | `selenium-tests/src/main/java/com/hospital/utils/WebDriverFactory.java` | Driver setup         |

## Port Mapping

| Service     | Port  | URL                       |
| ----------- | ----- | ------------------------- |
| MongoDB     | 27017 | mongodb://localhost:27017 |
| Backend API | 5000  | http://localhost:5000     |
| Frontend    | 3000  | http://localhost:3000     |

## Environment Variables

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

## Core Features Checklist

### Authentication ✅

- [x] User registration
- [x] User login
- [x] JWT token management
- [x] Password validation (7 constraints)
- [x] Profile management
- [x] Password change

### Doctors ✅

- [x] List all doctors
- [x] Search doctors (name/specialization)
- [x] Doctor details display
- [x] Admin: Add doctor
- [x] Admin: Delete doctor

### Appointments ✅

- [x] Book appointment
- [x] View appointments
- [x] Cancel appointment
- [x] Appointment status tracking
- [x] Date/time validation

### Admin Panel ✅

- [x] Manage doctors
- [x] Manage users
- [x] View all appointments
- [x] Delete users
- [x] Delete doctors

### Testing ✅

- [x] 46 Selenium test cases
- [x] Page Object Model pattern
- [x] Password validation tests (15)
- [x] Registration tests (10)
- [x] Login tests (7)
- [x] Search tests (7)
- [x] Appointment tests (7)

## Password Requirements

Password must have:

```
Length        : 8-15 characters
Digits        : At least 1 (0-9)
Uppercase     : At least 1 (A-Z)
Lowercase     : At least 1 (a-z)
Special Char  : At least 1 (!@#$%&*()-+=^.)
No Spaces     : Must not contain whitespace
```

Example: `ValidPass@123` ✅

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: String (patient|admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Collection

```javascript
{
  _id: ObjectId,
  name: String,
  specialization: String,
  email: String (unique),
  phone: String,
  qualifications: String,
  experience: Number,
  availability: {
    dayOfWeek: [String],
    startTime: String,
    endTime: String
  },
  consultationFee: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  doctorId: ObjectId (ref: Doctor),
  appointmentDate: Date,
  timeSlot: String,
  reason: String,
  status: String (scheduled|completed|cancelled),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints Summary

### Auth

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user
- `PUT /api/auth/update` - Update profile
- `PUT /api/auth/change-password` - Change password

### Doctors

- `GET /api/doctors` - Get all
- `GET /api/doctors/:id` - Get one
- `GET /api/doctors/search?query=...` - Search
- `POST /api/doctors` - Add (Admin)
- `PUT /api/doctors/:id` - Update (Admin)
- `DELETE /api/doctors/:id` - Delete (Admin)

### Appointments

- `GET /api/appointments` - Get user's
- `GET /api/appointments/:id` - Get one
- `POST /api/appointments` - Book
- `PUT /api/appointments/:id` - Update
- `DELETE /api/appointments/:id` - Cancel
- `GET /api/admin/appointments` - Get all (Admin)

### Admin

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user
- `DELETE /api/admin/users/:id` - Delete user

## Common Issues & Solutions

| Issue                     | Solution                                         |
| ------------------------- | ------------------------------------------------ |
| MongoDB connection failed | Start MongoDB: `mongod`                          |
| Port 3000 in use          | Kill process: `lsof -i :3000` \| `kill -9 <PID>` |
| Port 5000 in use          | Kill process: `lsof -i :5000` \| `kill -9 <PID>` |
| CORS error                | Check `.env` REACT_APP_API_URL                   |
| WebDriver error           | Clear cache: `rm -rf ~/.wdm/`                    |
| Build error               | Run: `mvn clean install`                         |
| Tests timeout             | Increase wait in WebDriverFactory                |

## Performance Tips

- Use MongoDB indexes on email, userId, doctorId
- Implement pagination for large lists
- Cache doctor list on frontend
- Use JWT token refresh
- Compress frontend build
- Enable gzip compression

## Security Best Practices

✅ **Implemented:**

- JWT authentication
- Password hashing (bcryptjs)
- Input validation
- XSS protection (React)

⚠️ **For Production:**

- Change JWT_SECRET to strong value
- Enable HTTPS
- Add rate limiting
- Implement CORS properly
- Use secure cookies
- Add CSRF tokens
- Implement logging
- Regular security updates

## Testing Best Practices

✅ **Implemented:**

- Page Object Model
- Explicit waits (not Thread.sleep)
- Proper assertions
- Try-catch error handling
- Descriptive test names
- Setup/teardown methods

## Code Quality Standards

✅ **Followed:**

- Clean, readable code
- Consistent naming conventions
- Comments for complex logic
- DRY principle
- Single responsibility
- Error handling
- Input validation
- Responsive design

## Development Workflow

1. Start MongoDB
2. Start Backend (`npm start` in backend/)
3. Start Frontend (`npm start` in frontend/)
4. Run Tests (`mvn test` in selenium-tests/)
5. Make changes
6. Test manually in browser
7. Run Selenium tests
8. Commit to git

## Debugging Tips

### Frontend

- Open DevTools (F12)
- Check Console for errors
- Check Network tab for API calls
- Use React DevTools extension

### Backend

- Check console output
- Test API with Postman/cURL
- Check MongoDB data directly

### Tests

- Run single test for isolation
- Add verbose flag: `mvn test -X`
- Check target/surefire-reports/
- Disable headless mode in WebDriver

## Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Selenium Docs](https://selenium.dev)
- [TestNG Docs](https://testng.org)
- [Maven Docs](https://maven.apache.org)

## Useful Tools

- **Visual Studio Code** - IDE
- **Postman** - API testing
- **MongoDB Compass** - Database GUI
- **Chrome DevTools** - Frontend debugging
- **Git** - Version control

## Next Steps

1. Follow SETUP_GUIDE.md for installation
2. Read SELENIUM_GUIDE.md for testing
3. Explore the code
4. Run tests
5. Customize as needed
6. Deploy to production

---

**Happy Development! 🚀**
