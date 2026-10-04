# SauceDemo E-commerce Test Plan

## Application Overview

Functional test plan for the SauceDemo web storefront, navigated through the project's configured BASE_URL. Covers authentication, inventory browsing and sorting, cart management, checkout validation and completion, logout, and account-specific behaviors. Each test starts in a fresh browser context with no existing authenticated session or cart contents; credentials and BASE_URL should be read from the project's configured test data/environment rather than duplicated in test code.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Log in with a valid standard user

**File:** `tests/saucedemo/auth/login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to BASE_URL.
    - expect: The SauceDemo login page is displayed.
  2. Enter the configured standard-user username and password, then submit the login form.
    - expect: The inventory page opens successfully.
    - expect: The inventory heading and product cards are visible.

#### 1.2. Reject invalid and incomplete credentials

**File:** `tests/saucedemo/auth/login-invalid.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to BASE_URL and submit the login form with both fields empty.
    - expect: Login is blocked and a visible validation message explains that the username is required.
  2. Dismiss the message, enter an invalid username with the configured password, and submit.
    - expect: Login is blocked and a visible error message identifies the credential failure.
  3. Dismiss the message, enter the configured username with an incorrect password, and submit.
    - expect: Login is blocked and a visible error message identifies the credential failure.

#### 1.3. Prevent login for a locked-out user

**File:** `tests/saucedemo/auth/locked-out-user.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to BASE_URL, enter the configured locked-out username and valid password, and submit.
    - expect: The user remains on the login page.
    - expect: A visible message explains that the account is locked out.

#### 1.4. Log out and prevent return to authenticated inventory

**File:** `tests/saucedemo/auth/logout.spec.ts`

**Steps:**
  1. Log in as the configured standard user, open the navigation menu, and choose Logout.
    - expect: The login page is displayed and the session is ended.
  2. Use browser back navigation.
    - expect: Protected inventory content is not available without logging in again.

### 2. Inventory and Cart

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse inventory and open the cart

**File:** `tests/saucedemo/inventory/product-catalog.spec.ts`

**Steps:**
  1. Log in as the configured standard user.
    - expect: The inventory listing displays product names, descriptions, prices, and add-to-cart controls.
  2. Open the cart without adding any products.
    - expect: The cart page is displayed with no line items and no nonzero cart badge.
  3. Return to inventory using the storefront navigation.
    - expect: The inventory listing is displayed again.

#### 2.2. Sort inventory by name and price

**File:** `tests/saucedemo/inventory/sort.spec.ts`

**Steps:**
  1. Log in as the configured standard user and record the displayed product names and prices.
    - expect: The initial product list is visible.
  2. Select Name (A to Z), then verify the displayed names are in ascending alphabetical order.
    - expect: Products are ordered alphabetically from A to Z.
  3. Select Name (Z to A), then verify the displayed names are in descending alphabetical order.
    - expect: Products are ordered alphabetically from Z to A.
  4. Select Price (low to high), then verify prices are in ascending numeric order.
    - expect: Products are ordered from lowest to highest price.
  5. Select Price (high to low), then verify prices are in descending numeric order.
    - expect: Products are ordered from highest to lowest price.

#### 2.3. Add and remove products from the cart

**File:** `tests/saucedemo/cart/add-remove.spec.ts`

**Steps:**
  1. Log in as the configured standard user and add Sauce Labs Backpack to the cart.
    - expect: The product button changes to Remove.
    - expect: The cart badge shows 1.
  2. Add Sauce Labs Bike Light and open the cart.
    - expect: The cart badge shows 2.
    - expect: Both products appear in the cart with their expected names, descriptions, and prices.
  3. Remove Sauce Labs Backpack from the cart.
    - expect: The backpack is removed, the bike light remains, and the cart badge updates to 1.
  4. Remove the remaining item.
    - expect: The cart is empty and the cart badge is cleared.

#### 2.4. Open a product detail and add it to the cart

**File:** `tests/saucedemo/inventory/product-detail.spec.ts`

**Steps:**
  1. Log in as the configured standard user and open the Sauce Labs Backpack product detail from its listing.
    - expect: The detail page shows the matching product name, description, price, image, and cart control.
  2. Add the product and return to inventory.
    - expect: The cart badge shows 1 and the product control reflects its added state.

### 3. Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Complete checkout with valid customer details

**File:** `tests/saucedemo/checkout/complete-order.spec.ts`

**Steps:**
  1. Log in as the configured standard user, add Sauce Labs Backpack, and open the cart.
    - expect: The cart contains the backpack and its displayed price.
  2. Continue to checkout and enter valid first name, last name, and postal code, then continue.
    - expect: The overview page displays the customer/order summary, item total, tax, and total.
  3. Verify the total equals the item subtotal plus displayed tax, then finish the order.
    - expect: The checkout-complete page displays an order confirmation and thank-you message.
  4. Return to inventory.
    - expect: The inventory page is displayed and the completed cart is cleared.

#### 3.2. Validate required checkout information

**File:** `tests/saucedemo/checkout/required-fields.spec.ts`

**Steps:**
  1. Log in as the configured standard user, add one product, open the cart, and continue to checkout information.
    - expect: The checkout information form is displayed.
  2. Submit the form with all fields empty.
    - expect: The form does not advance and a visible message identifies the required first name.
  3. Enter only a first name and submit.
    - expect: The form does not advance and a visible message identifies the required last name.
  4. Enter first and last names but omit the postal code, then submit.
    - expect: The form does not advance and a visible message identifies the required postal code.

#### 3.3. Cancel checkout without placing an order

**File:** `tests/saucedemo/checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Log in as the configured standard user, add Sauce Labs Backpack, open the cart, and continue to checkout.
    - expect: The checkout information form is displayed.
  2. Choose Cancel.
    - expect: The cart or inventory page is displayed without an order being placed.
    - expect: The item remains in the cart unless the storefront's documented behavior explicitly clears it.

### 4. Account-Specific Behavior and Resilience

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify storefront behavior for the problem user

**File:** `tests/saucedemo/accounts/problem-user.spec.ts`

**Steps:**
  1. In a fresh browser context, log in using the configured problem-user credentials.
    - expect: Authentication outcome is visible and the inventory page is reachable.
  2. Inspect product images and product details, then add a product and open the cart.
    - expect: UI behavior and product/cart data are recorded; deviations from the standard user's expected product-to-image mappings are surfaced rather than mistaken for successful standard behavior.

#### 4.2. Verify performance-glitch account completes core shopping flow

**File:** `tests/saucedemo/accounts/performance-glitch-user.spec.ts`

**Steps:**
  1. In a fresh browser context, log in using the configured performance-glitch-user credentials.
    - expect: Login eventually succeeds and inventory becomes usable within the suite's configured timeout.
  2. Add a product, proceed through checkout with valid customer information, and finish the order.
    - expect: The shopping flow completes successfully without duplicate submissions or loss of cart state.

#### 4.3. Require authentication for protected routes

**File:** `tests/saucedemo/auth/session-protection.spec.ts`

**Steps:**
  1. In a fresh browser context without logging in, navigate directly to the inventory and cart routes.
    - expect: Unauthenticated access is redirected to or blocked by the login page.
