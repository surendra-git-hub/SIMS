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

public class RegistrationTest {
    
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
    
    // Test 1: User can register with valid details
    @Test
    public void testUserRegistration() {
        driver.get("http://localhost:3000/register");
        
        // Wait for page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name")));
        
        // Fill registration form
        driver.findElement(By.id("name")).sendKeys("John Doe");
        driver.findElement(By.id("email")).sendKeys("john" + System.currentTimeMillis() + "@test.com");
        driver.findElement(By.id("phone")).sendKeys("1234567890");
        driver.findElement(By.id("password")).sendKeys("ValidPass@123");
        driver.findElement(By.id("confirmPassword")).sendKeys("ValidPass@123");
        
        // Submit form
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Verify redirect to dashboard
        wait.until(ExpectedConditions.urlContains("/dashboard"));
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/dashboard") : "Registration failed - not redirected to dashboard";
        
        System.out.println("✓ Test Passed: User Registration Successful");
    }
    
    // Test 2: User cannot register with weak password
    @Test
    public void testWeakPasswordValidation() {
        driver.get("http://localhost:3000/register");
        
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name")));
        
        driver.findElement(By.id("name")).sendKeys("Jane Doe");
        driver.findElement(By.id("email")).sendKeys("jane" + System.currentTimeMillis() + "@test.com");
        driver.findElement(By.id("phone")).sendKeys("1234567890");
        driver.findElement(By.id("password")).sendKeys("weak"); // Too weak
        driver.findElement(By.id("confirmPassword")).sendKeys("weak");
        
        // Try to click submit
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Should still be on register page (not redirected)
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/register") : "Weak password was accepted";
        
        System.out.println("✓ Test Passed: Weak Password Rejected");
    }
    
    // Test 3: User cannot register with mismatched passwords
    @Test
    public void testPasswordMismatchValidation() {
        driver.get("http://localhost:3000/register");
        
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name")));
        
        driver.findElement(By.id("name")).sendKeys("Bob Smith");
        driver.findElement(By.id("email")).sendKeys("bob" + System.currentTimeMillis() + "@test.com");
        driver.findElement(By.id("phone")).sendKeys("1234567890");
        driver.findElement(By.id("password")).sendKeys("ValidPass@123");
        driver.findElement(By.id("confirmPassword")).sendKeys("DifferentPass@123");
        
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Should stay on register page
        String currentUrl = driver.getCurrentUrl();
        assert currentUrl.contains("/register") : "Mismatched passwords were accepted";
        
        System.out.println("✓ Test Passed: Password Mismatch Rejected");
    }
}
