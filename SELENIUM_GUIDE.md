# Selenium Test Automation Guide

## Overview

This comprehensive Selenium automation testing suite uses Java with TestNG framework to test the Hospital Appointment System. It implements industry-standard practices including Page Object Model (POM), proper waits, and error handling.

## Prerequisites

- Java JDK 11+
- Maven 3.6+
- Google Chrome (latest version)
- Hospital Appointment System running (Backend & Frontend)

## Project Structure

```
selenium-tests/
├── src/
│   ├── main/java/com/hospital/
│   │   ├── pages/              # Page Object Model classes
│   │   │   ├── AuthPage.java           # Login/Register pages
│   │   │   ├── DashboardPage.java      # Dashboard page
│   │   │   ├── DoctorsPage.java        # Doctors listing page
│   │   │   └── AppointmentsPage.java   # Appointments page
│   │   └── utils/               # Utility classes
│   │       ├── WebDriverFactory.java   # Driver management
│   │       ├── TestUtils.java          # Common test utilities
│   │       ├── PasswordValidator.java  # Password validation
│   │       └── TestListener.java       # Test lifecycle
│   └── test/java/com/hospital/tests/   # Test classes
│       ├── RegistrationTest.java       # Registration tests (10)
│       ├── LoginTest.java              # Login tests (7)
│       ├── SearchTest.java             # Search tests (7)
│       ├── AppointmentTest.java        # Appointment tests (7)
│       └── PasswordValidationTest.java # Password tests (15)
├── src/test/resources/
│   └── testng.xml               # TestNG suite configuration
├── pom.xml                       # Maven configuration
└── target/                       # Build output (auto-generated)
```

## Installation

### 1. Clone/Download Project

```bash
cd selenium-tests
```

### 2. Install Dependencies with Maven

```bash
# Download dependencies and compile
mvn clean install
```

This will:

- Download Selenium, TestNG, WebDriverManager
- Compile all Java classes
- Set up the project

### 3. Verify Installation

```bash
mvn --version
# Should output Maven version

java -version
# Should output JDK version 11+
```

## Configuration

### Update Base URL (if needed)

In `src/main/java/com/hospital/utils/WebDriverFactory.java`:

```java
private static final String BASE_URL = "http://localhost:3000";
```

### Update Test Account Credentials

In test classes, update:

```java
private static final String VALID_EMAIL = "testuser@example.com";
private static final String VALID_PASSWORD = "TestPass@123";
```

### Chrome Options

For headless mode, uncomment in `WebDriverFactory.java`:

```java
// options.addArguments("--headless");
```

## Running Tests

### Run All Tests

```bash
mvn test
```

### Run Specific Test Class

```bash
# Registration tests only
mvn test -Dtest=RegistrationTest

# Login tests only
mvn test -Dtest=LoginTest

# Appointment tests
mvn test -Dtest=AppointmentTest

# Search tests
mvn test -Dtest=SearchTest

# Password validation tests
mvn test -Dtest=PasswordValidationTest
```

### Run Specific Test Method

```bash
# Run single test
mvn test -Dtest=RegistrationTest#testValidRegistration

# Run multiple methods
mvn test -Dtest=RegistrationTest#testValidRegistration,testLoginWithInvalidEmail
```

### Run with TestNG XML Suite

```bash
mvn test -DsuiteXmlFile=src/test/resources/testng.xml
```

## Test Cases Details

### 1. Registration Tests (10 cases)

#### Test Suite: `RegistrationTest.java`

| #   | Test Name                                  | Purpose                              |
| --- | ------------------------------------------ | ------------------------------------ |
| 1   | testValidRegistration                      | Valid registration with correct data |
| 2   | testRegistrationWithShortPassword          | Password too short (<8 chars)        |
| 3   | testRegistrationWithoutUppercasePassword   | Password without uppercase           |
| 4   | testRegistrationWithoutLowercasePassword   | Password without lowercase           |
| 5   | testRegistrationWithoutDigitPassword       | Password without digit               |
| 6   | testRegistrationWithoutSpecialCharPassword | Password without special char        |
| 7   | testRegistrationWithWhitespacePassword     | Password with spaces                 |
| 8   | testRegistrationWithMismatchedPasswords    | Confirm password mismatch            |
| 9   | testRegistrationWithDuplicateEmail         | Email already registered             |
| 10  | testRegistrationFormFields                 | Form fields presence check           |

**What's Tested:**

- User registration flow
- All 7 password constraints
- Error message display
- Form validation
- Duplicate prevention

---

### 2. Login Tests (7 cases)

#### Test Suite: `LoginTest.java`

| #   | Test Name                    | Purpose                       |
| --- | ---------------------------- | ----------------------------- |
| 1   | testValidLogin               | Valid login credentials       |
| 2   | testLoginWithInvalidEmail    | Unregistered email            |
| 3   | testLoginWithInvalidPassword | Wrong password                |
| 4   | testLoginWithEmptyEmail      | Empty email field             |
| 5   | testLoginWithEmptyPassword   | Empty password field          |
| 6   | testLoginErrorMessageContent | Error message validity        |
| 7   | testSuccessfulLoginMessage   | Success redirect to dashboard |

**What's Tested:**

- Login authentication
- Error handling
- Input validation
- Session creation
- User feedback

---

### 3. Doctor Search Tests (7 cases)

#### Test Suite: `SearchTest.java`

| #   | Test Name                        | Purpose                     |
| --- | -------------------------------- | --------------------------- |
| 1   | testNavigateToDoctorsPage        | Navigate to doctors listing |
| 2   | testDoctorsDisplayed             | Doctors list display        |
| 3   | testSearchDoctorByName           | Search by doctor name       |
| 4   | testSearchDoctorBySpecialization | Search by specialization    |
| 5   | testClearSearch                  | Clear search results        |
| 6   | testSearchWithNoResults          | No results handling         |
| 7   | testDoctorInformationDisplay     | Doctor info visibility      |

**What's Tested:**

- Navigation functionality
- Search feature
- Result filtering
- Data display
- UI elements

---

### 4. Appointment Tests (7 cases)

#### Test Suite: `AppointmentTest.java`

| #   | Test Name                                | Purpose                        |
| --- | ---------------------------------------- | ------------------------------ |
| 1   | testNavigateToAppointments               | Navigate to appointments page  |
| 2   | testCreateNewAppointmentForm             | New appointment form display   |
| 3   | testBookAppointmentSuccess               | Successful appointment booking |
| 4   | testCancelAppointment                    | Cancel existing appointment    |
| 5   | testViewAppointments                     | View appointments list         |
| 6   | testBookAppointmentWithoutRequiredFields | Validation of required fields  |
| 7   | testSuccessMessageAfterBooking           | Success message display        |

**What's Tested:**

- Appointment booking flow
- Form validation
- Appointment cancellation
- Status tracking
- User feedback

---

### 5. Password Validation Tests (15 cases)

#### Test Suite: `PasswordValidationTest.java`

| #   | Test Name                             | Purpose                    |
| --- | ------------------------------------- | -------------------------- |
| 1   | testValidPassword                     | Compliant password         |
| 2   | testPasswordTooShort                  | Length < 8 chars           |
| 3   | testPasswordTooLong                   | Length > 15 chars          |
| 4   | testPasswordWithoutDigit              | Missing digit              |
| 5   | testPasswordWithoutUppercase          | Missing uppercase          |
| 6   | testPasswordWithoutLowercase          | Missing lowercase          |
| 7   | testPasswordWithoutSpecialCharacter   | Missing special char       |
| 8   | testPasswordWithWhitespace            | Contains spaces            |
| 9   | testEmptyPassword                     | Empty string               |
| 10  | testNullPassword                      | Null value                 |
| 11  | testPasswordWithDifferentSpecialChars | Various special characters |
| 12  | testValidationResultWithErrors        | Multi-error validation     |
| 13  | testValidationResultValid             | Valid password result      |
| 14  | testPasswordAtMinimumLength           | Exact 8 characters         |
| 15  | testPasswordAtMaximumLength           | Exact 15 characters        |

**What's Tested:**

- All 7 password constraints
- Edge cases (min/max length)
- Special character validation
- Whitespace detection
- Error reporting

## Page Object Model (POM)

### AuthPage.java

Methods:

- `register()` - Register user
- `login()` - Login user
- `switchToRegister()` - Switch form
- `switchToLogin()` - Switch form
- `isErrorDisplayed()` - Check error
- `getErrorMessage()` - Get error text
- `isPasswordErrorDisplayed()` - Check password errors
- `getPasswordErrors()` - Get password error text

### DashboardPage.java

Methods:

- `isDashboardLoaded()` - Check page load
- `getWelcomeMessage()` - Get greeting
- `browseDoctors()` - Navigate to doctors
- `viewAppointments()` - Navigate to appointments
- `viewProfile()` - Navigate to profile
- `goToAdmin()` - Navigate to admin (if admin)

### DoctorsPage.java

Methods:

- `isDoctorsPageLoaded()` - Check page load
- `searchDoctor()` - Search doctors
- `clearSearch()` - Clear search
- `getDoctorCount()` - Count displayed doctors
- `bookFirstDoctorAppointment()` - Book appointment
- `getDoctorName()` - Get doctor name
- `getDoctorSpecialization()` - Get specialization

### AppointmentsPage.java

Methods:

- `isAppointmentsPageLoaded()` - Check page load
- `clickNewAppointment()` - Create new appointment
- `bookAppointment()` - Book with details
- `getAppointmentCount()` - Count appointments
- `cancelFirstAppointment()` - Cancel appointment
- `isSuccessMessageDisplayed()` - Check success
- `isErrorMessageDisplayed()` - Check error
- `getSuccessMessage()` - Get success text
- `getErrorMessage()` - Get error text

## Test Utilities

### WebDriverFactory.java

**Purpose:** Manage WebDriver lifecycle

**Key Methods:**

```java
WebDriver driver = WebDriverFactory.getDriver();
WebDriverFactory.closeDriver();
String url = WebDriverFactory.getBaseURL();
```

### TestUtils.java

**Purpose:** Common wait and action utilities

**Key Methods:**

```java
waitForElementVisible(driver, element);
waitForElementClickable(driver, element);
clickElement(driver, element);
typeText(driver, element, text);
getElementText(driver, element);
isElementDisplayed(element);
waitForPageLoad(driver);
```

### PasswordValidator.java

**Purpose:** Validate passwords programmatically

**Key Methods:**

```java
boolean isValid = PasswordValidator.isValidPassword(password);
ValidationResult result = PasswordValidator.validatePasswordWithDetails(password);
```

## Test Execution Flow

```
Test Suite Start
    ↓
Setup (@BeforeMethod)
    ├─ Initialize WebDriver
    ├─ Navigate to application
    ├─ Login (if needed)
    ↓
Execute Test Case
    ├─ Perform actions (click, type, etc.)
    ├─ Assert expected results
    ├─ Verify page elements
    ↓
Teardown (@AfterMethod)
    └─ Close WebDriver
    ↓
Generate Report
```

## Wait Strategies

The framework uses **explicit waits**:

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOf(element));
```

Timeout: 10 seconds per element

## Error Handling

Tests include proper error handling:

```java
try {
    element.isDisplayed();
} catch (NoSuchElementException e) {
    return false;
}
```

## Locator Strategy

Using **XPath** with readable patterns:

```xpath
//button[contains(text(), 'Login')]
//input[@name='email']
//div[@class='error-box']
```

## Debugging Tips

### Verbose Output

```bash
mvn test -X
```

### Add Delays (if needed)

```java
Thread.sleep(2000); // 2 second delay
```

### Enable Headless Debugging

```java
// In WebDriverFactory.java, disable headless
// options.addArguments("--headless");
```

### Print Statements

```java
System.out.println("Element text: " + element.getText());
WebDriver driver = WebDriverFactory.getDriver();
System.out.println("Current URL: " + driver.getCurrentUrl());
```

## Test Reports

### Generate HTML Report

```bash
mvn surefire-report:report
```

Reports located in:

```
target/site/surefire-report.html
```

### View Console Output

```bash
mvn test | tee test-output.log
```

## Continuous Integration

### Jenkins Example

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'repository-url'
            }
        }

        stage('Test') {
            steps {
                dir('selenium-tests') {
                    sh 'mvn test -DsuiteXmlFile=src/test/resources/testng.xml'
                }
            }
        }

        stage('Report') {
            steps {
                publishHTML([
                    reportDir: 'selenium-tests/target/surefire-reports',
                    reportFiles: 'index.html',
                    reportName: 'Test Report'
                ])
            }
        }
    }
}
```

## Performance Metrics

Expected execution times:

- Registration Tests: ~45 seconds
- Login Tests: ~35 seconds
- Search Tests: ~40 seconds
- Appointment Tests: ~50 seconds
- Password Validation: ~5 seconds (unit tests)

**Total Suite: ~3-4 minutes**

## Troubleshooting

### WebDriver Issues

```bash
# Clear WebDriver cache
rm -rf ~/.wdm/

# Rebuild
mvn clean install
```

### Port Already in Use

```bash
# Check what's using port 3000/5000
netstat -an | grep 3000

# Kill process
kill -9 <PID>
```

### Flaky Tests

1. Increase wait timeout in `WebDriverFactory.java`
2. Add more explicit waits
3. Slow down test actions
4. Check browser/system performance

### Chrome Version Mismatch

WebDriverManager handles this automatically. If issues:

```bash
# Clear everything
mvn clean
rm -rf ~/.wdm/
mvn clean install
```

## Best Practices

✅ Use Page Object Model
✅ Wait for elements explicitly
✅ Clear error messages
✅ Test one thing per case
✅ Use descriptive names
✅ Add comments
✅ Handle exceptions
✅ Generate reports
✅ Version control test code
✅ Keep tests maintainable

## Extending Tests

### Add New Test Class

1. Create class in `src/test/java/com/hospital/tests/`
2. Extend with @BeforeMethod/@AfterMethod
3. Add @Test methods
4. Update `testng.xml`

### Add New Page Object

1. Create class in `src/main/java/com/hospital/pages/`
2. Define WebElements with @FindBy
3. Add methods for page actions
4. Use in test classes

## Performance Optimization

```java
// Use explicit waits instead of Thread.sleep()
TestUtils.waitForElementVisible(driver, element);

// Reuse driver instance
WebDriver driver = WebDriverFactory.getDriver();

// Batch assertions
Assert.assertEquals(result1, expected1);
Assert.assertEquals(result2, expected2);
```

## Documentation Standards

Each test includes:

- Class documentation
- Test purpose comments
- Assertion descriptions
- Setup/teardown logic

Example:

```java
/**
 * Test Case 1: Valid Login
 * User should be able to login with correct credentials
 */
@Test(priority = 1)
public void testValidLogin() {
    authPage.login(VALID_EMAIL, VALID_PASSWORD);
    TestUtils.waitForPageLoad(driver);

    Assert.assertTrue(dashboardPage.isDashboardLoaded(),
        "Dashboard should load after successful login");
}
```

---

**Happy Testing! 🧪**
