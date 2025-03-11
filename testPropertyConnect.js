const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {
    // Set up Chrome options
    let options = new chrome.Options();
    options.addArguments('--start-maximized');

    // Initialize WebDriver
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Open the test page
        await driver.get('file:///C:/Users/T470S/Desktop/seleniumDemo/testPropertyConect.html'); // Replace with the actual file path

        // Test 1: User Login
        await testUserLogin(driver);

        // Test 2: Search Property by Location
        await testSearchProperty(driver);

        // Test 3: Add Property
        await testAddProperty(driver);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Test 1: User Login
async function testUserLogin(driver) {
    console.log('Running Test: User Login');
    await driver.findElement(By.id('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('password')).sendKeys('password123', Key.RETURN);

    // Wait for success message
    await driver.wait(until.elementTextContains(driver.findElement(By.id('login-message')), 'Login successful'));
    console.log('✅ User Login Test Passed');
}

// Test 2: Search Property by Location
async function testSearchProperty(driver) {
    console.log('Running Test: Search Property by Location');
    await driver.findElement(By.id('location')).sendKeys('New York');
    await driver.findElement(By.id('search-form')).submit();

    // Wait for search results
    await driver.wait(until.elementLocated(By.className('property-list')), 5000);
    console.log('✅ Search Property by Location Test Passed');
}

// Test 3: Add Property
async function testAddProperty(driver) {
    console.log('Running Test: Add Property');
    await driver.findElement(By.id('title')).sendKeys('Beautiful Apartment');
    await driver.findElement(By.id('price')).sendKeys('1500');
    await driver.findElement(By.id('property-location')).sendKeys('New York');
    await driver.findElement(By.id('add-property-form')).submit();

    // Wait for success message
    await driver.wait(until.elementTextContains(driver.findElement(By.id('add-property-message')), 'Property added successfully'));
    console.log('✅ Add Property Test Passed');
}

// Run the tests
runTests();