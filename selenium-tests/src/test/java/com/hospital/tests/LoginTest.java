package com.hospital.tests;

import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

public class LoginTest {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    @Before
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().maximize();
    }
    
    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
    
    // Test 1: User can login with valid credentials
    @Test
    public void testValidUserLogin() {
        driver.get("http://localhost:3000/login");
        
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        
        // Use seeded test credentials
        driver.findElement(By.id("email")).sendKeys("john.doe@example.com");
        driver.findElement(By.id("password")).sendKeys("Password@123");
        
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Verify redirect to dashboard
        wait.until(ExpectedConditions.urlContains("/dashboard"));
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/dashboard") : "Login failed - not redirected to dashboard";
        
        System.out.println("✓ Test Passed: User Login Successful");
    }
    
    // Test 2: User cannot login with wrong password
    @Test
    public void testInvalidPasswordLogin() {
        driver.get("http://localhost:3000/login");
        
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        
        driver.findElement(By.id("email")).sendKeys("john.doe@example.com");
        driver.findElement(By.id("password")).sendKeys("WrongPassword@123");
        
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Should stay on login page
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/login") : "Invalid password was accepted";
        
        System.out.println("✓ Test Passed: Invalid Password Rejected");
    }
    
    // Test 3: User cannot login with non-existent email
    @Test
    public void testNonExistentUserLogin() {
        driver.get("http://localhost:3000/login");
        
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        
        driver.findElement(By.id("email")).sendKeys("nonexistent@test.com");
        driver.findElement(By.id("password")).sendKeys("SomePass@123");
        
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Should stay on login page
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/login") : "Non-existent user was accepted";
        
        System.out.println("✓ Test Passed: Non-existent User Rejected");
    }
    
    // Test 4: User cannot login with empty credentials
    @Test
    public void testEmptyCredentialsLogin() {
        driver.get("http://localhost:3000/login");
        
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        
        // Submit without entering credentials
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Should stay on login page
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/login") : "Empty credentials were accepted";
        
        System.out.println("✓ Test Passed: Empty Credentials Rejected");
    }
}
