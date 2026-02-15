# How to Run Selenium Tests in IntelliJ IDEA & Eclipse

## **4 Test Cases Created**

1. **RegisterTest.java** - 4 registration scenarios (valid, weak password, mismatched password, missing fields)
2. **LoginTest.java** - 5 login scenarios (valid login, invalid email, incorrect password, empty fields, session persistence)
3. **DoctorsTest.java** - 4 doctor browsing scenarios (view all, filter by specialty, view details, check availability)
4. **AppointmentTest.java** - 5 appointment scenarios (book, view, cancel, invalid date, reschedule)

---

## **Setup Prerequisites**

### Required Software

- **Java JDK 11+** ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))
- **IntelliJ IDEA** or **Eclipse IDE**
- **Google Chrome** (latest version)
- Backend API running on `http://localhost:3000` or update the URLs in the test files

### Verify Installation

```bash
java -version
mvn --version
```

---

## **IntelliJ IDEA - Complete Guide**

### **Step 1: Open the Project**

1. Launch IntelliJ IDEA
2. Click **File → Open**
3. Navigate to `selenium-tests` folder and click **Open**
4. Click **Trust Project** when prompted

### **Step 2: Configure Maven**

1. Go to **File → Settings → Build Tools → Maven**
2. Ensure Maven home directory is set correctly
3. Click **OK**

### **Step 3: Load Dependencies**

1. Right-click `pom.xml` in the project tree
2. Select **Maven → Reload Projects**
3. Wait for dependencies to download (first time takes 2-3 minutes)

### **Step 4: Run All Tests**

**Method 1: Using Maven**

1. Open Terminal at bottom of IDE (`View → Tool Windows → Terminal`)
2. Run:
   ```bash
   mvn test
   ```

**Method 2: Using TestNG Plugin (UI)**

1. Right-click `src/test/resources/testng.xml`
2. Select **Run 'testng.xml'**
3. Tests execute in the TestNG tab at the bottom

### **Step 5: Run Specific Test Class**

1. Right-click on test file (e.g., `RegisterTest.java`)
2. Select **Run 'RegisterTest'**
3. View results in the **Run** tab

### **Step 6: Run Single Test Method**

1. Right-click on specific test method (e.g., `testSuccessfulRegistration`)
2. Select **Run 'testSuccessfulRegistration()'**

### **Step 7: Run Tests with Debug Mode**

1. Right-click on test file
2. Select **Debug 'TestClassName'**
3. Set breakpoints by clicking left margin on specific lines
4. Execution pauses at breakpoints for inspection

### **IntelliJ - Test Navigation Tips**

- **View test results:** Click **Test** tab → see pass/fail results
- **Jump to failure:** Click red text in output to jump to failing code
- **Rerun failed tests:** Click the rerun icon in the TestNG panel
- **Export results:** Right-click results → Export results

---

## **Eclipse IDE - Complete Guide**

### **Step 1: Import the Project**

1. Launch Eclipse
2. Go to **File → Import**
3. Select **Existing Maven Projects**
4. Click **Next**
5. Browse to `selenium-tests` folder and click **Finish**
6. Wait for Maven to download dependencies (2-3 minutes)

### **Step 2: Verify Project Setup**

1. Right-click project → **Configure → Convert to Faceted Form** (if needed)
2. Right-click project → **Maven → Update Project**

### **Step 3: Run All Tests (Maven)**

1. Open Terminal (`Window → Show View → Terminal`)
2. Navigate to project folder and run:
   ```bash
   mvn test
   ```

### **Step 4: Run All Tests (TestNG)**

1. Right-click `testng.xml`
2. Select **Run As → TestNG Suite**
3. Results appear in **TestNG** view at bottom

### **Step 5: Run Single Test Class**

1. Open test file (e.g., `RegisterTest.java`)
2. Right-click in editor → **Run As → TestNG Test**

### **Step 6: Run Individual Test Method**

1. Position cursor on method name
2. Right-click → **Run As → TestNG Test**

### **Step 7: Debug Tests**

1. Open test file
2. Click left margin to set breakpoint (blue dot appears)
3. Right-click test → **Debug As → TestNG Test**
4. Execution pauses at breakpoints

### **Eclipse - Test Management**

- **View results:** Check **TestNG** view tab
- **Jump to failure:** Click failure message → code opens
- **Rerun tests:** Click refresh icon
- **Filter tests:** Type in search box in TestNG view

---

## **Running Specific Test Cases**

### **Run Only Register Tests**

```bash
mvn -Dtest=RegisterTest test
```

### **Run Only Login Tests**

```bash
mvn -Dtest=LoginTest test
```

### **Run Only Doctors Tests**

```bash
mvn -Dtest=DoctorsTest test
```

### **Run Only Appointment Tests**

```bash
mvn -Dtest=AppointmentTest test
```

### **Run Single Test Method**

```bash
mvn -Dtest=RegisterTest#testSuccessfulRegistration test
```

---

## **Troubleshooting**

| Problem                      | Solution                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------- |
| **ChromeDriver not found**   | WebDriverManager auto-downloads it. Check internet connection                 |
| **Tests fail with timeout**  | Backend might not be running. Start with `npm start` in backend folder        |
| **Port 3000 already in use** | Change `http://localhost:3000` to correct port in test files                  |
| **Module not found errors**  | Run `mvn clean install` to rebuild dependencies                               |
| **No tests found**           | Check TestNG framework is installed: **File → Project Structure → Libraries** |

---

## **Viewing Test Reports**

After running tests, view HTML reports:

```bash
# Report generated at:
./target/surefire-reports/
```

Open the HTML file in a browser to see detailed results.

---

## **IDE Keyboard Shortcuts**

### **IntelliJ**

- `Ctrl+Shift+F10` - Run current test
- `Ctrl+Shift+F9` - Debug current test
- `Ctrl+F9` - Build project

### **Eclipse**

- `Alt+Shift+X, T` - Run as TestNG test
- `Alt+Shift+D, T` - Debug as TestNG test
- `Ctrl+B` - Build project

---

## **Test Configuration Customization**

```xml
<!-- In testng.xml, modify this for parallel execution: -->
<suite name="..." parallel="methods" thread-count="4">
```

To run tests in headless mode (no browser window), edit `WebDriverFactory.java`:

```java
options.addArguments("--headless");  // Uncomment this line
```

---

## **Quick Start Commands**

**Terminal - Run All Tests:**

```bash
cd c:\Users\suren\Desktop\project\selenium-tests
mvn test
```

**Terminal - Run with HTML Report:**

```bash
mvn test -Dreporting=true
```

**Terminal - Clean and Run:**

```bash
mvn clean test
```

---

## **Next Steps**

1. Ensure backend is running: `npm start` from backend folder
2. Ensure frontend is accessible at `http://localhost:3000`
3. Create a test user account or seed database with test data
4. Run tests from IDE or terminal
5. Check reports in target folder
