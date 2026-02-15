# Simple Test Scripts - Academic Level

## Overview

4 test files for the Hospital Appointment System without Page Object Model complexity.

---

## 📋 Test Files Summary

### 1. **RegistrationTest.java** (3 Tests)

**Module**: User Registration

- ✓ Test successful registration with valid data
- ✓ Test weak password rejection
- ✓ Test password mismatch detection

**Key Points**:

- Tests navigate to `/register` page
- Fill form with: name, email, phone, password
- Verify redirect to `/dashboard` on success
- Check that invalid passwords stay on `/register`

---

### 2. **LoginTest.java** (4 Tests)

**Module**: User Authentication

- ✓ Test valid user login
- ✓ Test invalid password rejection
- ✓ Test non-existent user rejection
- ✓ Test empty credentials rejection

**Key Points**:

- Tests navigate to `/login` page
- Fill form with email and password
- Verify redirect to `/dashboard` on success
- Check that failed logins stay on `/login`
- Uses seeded test user: `john.doe@example.com` / `Password@123`

---

### 3. **DoctorsTest.java** (4 Tests)

**Module**: Doctor Browsing

- ✓ Test navigation to doctors page
- ✓ Test doctors list display
- ✓ Test doctor details viewing
- ✓ Test doctor search functionality

**Key Points**:

- User must be logged in first
- Tests navigate to `/doctors` page
- Click on doctor cards to view details
- Search for doctors by name
- Check if specialization is displayed

---

### 4. **AppointmentTest.java** (4 Tests)

**Module**: Appointment Management

- ✓ Test navigation to appointments page
- ✓ Test view list of appointments
- ✓ Test access to appointment booking
- ✓ Test date/time selection

**Key Points**:

- User must be logged in first
- Tests navigate to `/appointments` page
- Access booking from doctors page
- Check availability of date/time inputs
- Basic flow without full booking implementation

---

## 🚀 How to Run Tests

### Option 1: Run all tests

```bash
cd C:\Users\suren\Desktop\project\selenium-tests
mvn clean test
```

### Option 2: Run specific test file

```bash
mvn test -Dtest=RegistrationTest
mvn test -Dtest=LoginTest
mvn test -Dtest=DoctorsTest
mvn test -Dtest=AppointmentTest
```

### Option 3: From Eclipse

1. Right-click project → Run As → Maven Test
2. Or right-click specific test class → Run As → TestNG Test

---

## ✅ What Each Test Does

### Registration Testing

```
1. User enters valid data → System registers → Redirect to dashboard ✓
2. User enters weak password → System rejects → Stay on register ✓
3. Passwords don't match → System rejects → Stay on register ✓
```

### Login Testing

```
1. Valid credentials → System authenticates → Redirect to dashboard ✓
2. Wrong password → System rejects → Stay on login ✓
3. Unknown email → System rejects → Stay on login ✓
4. Empty fields → System rejects → Stay on login ✓
```

### Doctor Browsing

```
1. Click doctors link → Page loads with list ✓
2. Doctors displayed in cards → Can count total ✓
3. Click doctor → Details panel opens → See specialization ✓
4. Search doctor → Filtered results → Show matching doctors ✓
```

### Appointment Management

```
1. Access appointments page → Page loads ✓
2. See list of booked appointments → Display count ✓
3. Access booking from doctor details → Booking form appears ✓
4. Check date/time fields → Inputs are available ✓
```

---

## 📝 Key Concepts Used

### 1. **WebDriver**

```java
WebDriver driver = new ChromeDriver();  // Open browser
driver.get("http://localhost:3000/...");  // Navigate to URL
```

### 2. **Finding Elements**

```java
By.id("email")  // Find element by id
By.className("doctor-card")  // Find element by class
By.xpath("//button[@type='submit']")  // Find element by XPath
```

### 3. **Interacting with Elements**

```java
element.sendKeys("text");  // Type text into field
element.click();  // Click on element
element.getText();  // Get text from element
```

### 4. **Waiting for Elements**

```java
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
wait.until(ExpectedConditions.urlContains("/dashboard"));
```

### 5. **Assertions**

```java
assert currentUrl.contains("/dashboard") : "Error message";
assert doctorCount > 0 : "No doctors found";
```

---

## 🔧 Test Data

### Seeded Test Credentials

- Email: `john.doe@example.com`
- Password: `Password@123`

### Valid Password Format

- Length: 8-15 characters
- Must include: uppercase, lowercase, digit, special character
- Example: `ValidPass@123` ✓

---

## 📊 Test Execution Results

### Expected Outcomes

- Registration: 3/3 tests pass ✓
- Login: 4/4 tests pass ✓
- Doctors: 4/4 tests pass ✓
- Appointments: 4/4 tests pass ✓

**Total: 15 tests**

---

## ❓ For Your Viva

### What to explain:

1. "We test 4 modules as requested by teacher"
2. "Each test is simple and focuses on one feature"
3. "We use Selenium to automate clicking, typing, and checking"
4. "We verify the application behaves correctly"

### What each test proves:

- **Registration**: System validates passwords correctly
- **Login**: System authenticates users properly
- **Doctors**: System displays and searches doctor information
- **Appointments**: System provides appointment interface

---

## 🎯 Simple Structure

```
NO Page Object Model
NO Complex Utilities
NO Extra Classes

Just:
✓ WebDriver + Wait + Assert
✓ Direct element interaction
✓ Clear test names
✓ Comments explaining each step
```

This is **academic level** - exactly as expected for someone just learning automation!
