import { test, expect } from '@playwright/test';
import TestData from '../../utils/test-data';
import { request } from 'node:http';
import { Product } from '../../types/Product';
import { Cart } from '../../types/Cart';

// FakestoreAPI Testing Suite

const BASE_URL = 'https://fakestoreapi.com';

test.describe('FakestoreAPI - Authentication Tests', () => {

    //const BASE_URL = 'https://fakestoreapi.com';

    test('should successfully login with valid credentials', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: TestData.API_USERS.VALID.username,
                password: TestData.API_USERS.VALID.password
            }
        });

        // console.log('Status:', response.status());
        // console.log('Response body:', await response.text());

        expect(response.ok()).toBe(true);
        expect(response).toBeOK();

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
        expect(responseBody.token).toBeTruthy();
        expect(typeof responseBody.token).toBe('string');

        console.log('✓ user authenticated successfully');
        console.log('✓ Token received:', responseBody.token.substring(0, 20) + '...');
    });

    test('should return error for invalid credentials', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: TestData.API_USERS.INVALID.username,
                password: TestData.API_USERS.INVALID.password
            }
        });

        const responseBody = await response.text();

        // console.log('Status:', response.status());
        // console.log('Response Body:', responseBody);

        // Validate response structure
        expect(response.status()).toBe(401);
        expect(response.ok()).toBeFalsy();
        expect(responseBody).toBeDefined();

        console.log('✓ Invalid credentials handled');
        console.log('✓ Response status:', response.status());
    });
});

test.describe('Fakestore API - Product Tests', () => {

    //const BASE_URL = 'https://fakestoreapi.com';

    test('should get all products', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/products`);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        //expect(response).toBeOK();

        const products = await response.json();
        //console.log('Response body:', products);
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toBeGreaterThan(0);

        // Validate produc structure
        const firstProduct = products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('title');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('description');
        expect(firstProduct).toHaveProperty('category');
        expect(firstProduct).toHaveProperty('image');

        console.log(`✓ Retrieved ${products.length} products`);
        console.log('✓ Sample product:', firstProduct.title);
    });

    test('should get single product by ID', async ({ request }) => {
        const productId = 1;
        const response = await request.get(`${BASE_URL}/products/${productId}`);
        expect(response.ok()).toBeTruthy
        expect(response.status()).toBe(200);

        const product = await response.json();
        expect(product.id).toBe(productId);
        expect(product.title).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.category).toBeTruthy();

        console.log('✓ Product retrieved successfully')
        console.log('✓ Product:', product.title);
        console.log('✓ Product:', product.price);
        console.log('✓ Product:', product.category);
    });

    test('should get all products categories', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/products/categories`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const categories = await response.json();
        expect(Array.isArray(categories)).toBeTruthy()
        expect(categories.length).toBeGreaterThan(0);

        // Validate expected categories
        expect(categories).toContain('electronics');
        expect(categories).toContain('jewelery');

        console.log(`✓ Retrieved ${categories.length} categories`);
        console.log('✓ Categories:', categories.join(', '));
    });

    test('should get products by category', async ({ request }) => {
        const category = 'electronics';
        const response = await request.get(`${BASE_URL}/products/category/${category}`);
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);

        const products: Product[] = await response.json();
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);

        // Verify all products belong to the specified category
        products.forEach(product => {
            expect(product.category).toBe(category);
        });

        console.log(`✓ Retrived ${products.length} products in category ${category}`);
        console.log('✓ First product: ', products[0].title);
    });

    test('should get limited number of products', async ({ request }) => {
        const limit = 5;

        const response = await request.get(`${BASE_URL}/products?limit=${limit}`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const products: Product[] = await response.json();
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toBe(limit);

        console.log(`✓ Successfully limited results to ${limit} products`);
        console.log('✓ Product titles: ');
        products.forEach((product, index) => {
            console.log(` ${index + 1}. ${product.title}`);
        });
    });
});

test.describe('FakeStoreAPI - Cart Tests', () => {

    test('should get all carts', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/carts`);
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);

        const carts = await response.json();
        //console.log(carts)
        expect(Array.isArray(carts)).toBe(true);
        expect(carts.length).toBeGreaterThan(0);

        //validate cart structure
        const firstCart = carts[0];
        expect(firstCart).toHaveProperty('id');
        expect(firstCart).toHaveProperty('userId');
        expect(firstCart).toHaveProperty('date');
        expect(firstCart).toHaveProperty('products');
        expect(Array.isArray(firstCart.products)).toBeTruthy();

        console.log(`✓ Retrieved ${carts.length} carts`);
        console.log('✓ First cart has', firstCart.products.length, 'products');
    });

    test('should get single cart by ID', async ({ request }) => {
        const cartId = 1;

        const response = await request.get(`${BASE_URL}/carts/${cartId}`);
        expect(response).toBeOK();
        expect(response.status() === 200).toBe(true);

        const cart = await response.json();
        expect(cart.id).toBe(cartId);
        expect(cart.userId).toBeTruthy();
        expect(cart.products).toBeTruthy();
        expect(Array.isArray(cart.products)).toBe(true);

        //validate product structure in cart
        if (cart.products.length > 0) {
            const product = cart.products[0];
            expect(product).toHaveProperty('productId');
            expect(product).toHaveProperty('quantity');
        }

        console.log('✓ Cart retrieved successfully');
        console.log('✓ UserId:', cart.userId);
        console.log('✓ Number of products:', cart.products.length);
        console.log('✓ Cart date:', cart.date);
    });

    test('should create new cart', async ({ request }) => {
        const newCart = {
            userId: 5,
            date: new Date().toISOString().split('T')[0],
            products: [
                { productId: 1, quantity: 2 },
                { productId: 5, quantity: 1 }
            ]
        };

        const response = await request.post(`${BASE_URL}/carts`, {
            data: newCart
        });

        //console.log('Status:', response.status());

        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(201);

        const createdCart = await response.json();
        expect(createdCart).toHaveProperty('id');
        expect(createdCart.id).toBeTruthy();

        console.log('Cart created successfully');
        console.log('✓ New cart ID:', createdCart.id);
        console.log('✓ User ID:', newCart.userId);
        console.log('✓ Products in cart:', newCart.products.length);
    });

    test('should update existing cart', async ({ request }) => {
        const cartId = 1;

        const updatedCart = {
            userId: 3,
            date: new Date().toISOString().split('T')[0],
            products: [
                { productId: 1, quantity: 5 }
            ]
        };

        const response = await request.put(`${BASE_URL}/carts/${cartId}`, {
            data: updatedCart
        });
        expect(response.ok()).toBe(true);
        expect(response.status() === 200).toBe(true);

        const result = await response.json();
        expect(result.id).toBe(cartId);

        console.log('✓ Cart updated successfully');
        console.log('✓ Updated cart ID:', cartId);
        console.log('✓ New user ID:', updatedCart.userId);
        console.log('✓ Updated products:', updatedCart.products.length);
    });

    test('should delete cart', async ({ request }) => {
        const cartId = 1;

        const response = await request.delete(`${BASE_URL}/carts/${cartId}`);
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);

        const result = await response.json();
        expect(result).toBeTruthy();

        console.log('✓ Cart deleted successfully');
        console.log('✓ Deleted cart ID:', cartId);
    });
});

test.describe('FakeStoreAPI - User Tests', () => {

    test('should get all users', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users`);
        expect(response.ok()).toBe(true);
        expect(response.status() === 200).toBe(true);

        const users = await response.json();
        //console.log(users)
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);

        // Validate user structure
        const firstUser = users[0];
        expect(firstUser).toHaveProperty('id');
        expect(firstUser).toHaveProperty('email');
        expect(firstUser).toHaveProperty('username');
        expect(firstUser).toHaveProperty('name');
        expect(firstUser).toHaveProperty('address');
        expect(firstUser).toHaveProperty('phone');

        console.log(`✓ Retrieved ${users.length} users`);
        console.log('✓ First user:', firstUser.name.firstname, firstUser.name.lastname);
    });

    test('should get single user by ID', async ({ request }) => {
        const userId = 1;

        const response = await request.get(`${BASE_URL}/users/${userId}`);
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.id).toBe(userId);
        expect(user.email).toBeTruthy();
        expect(user.username).toBeTruthy();
        expect(user.name).toBeTruthy();
        expect(user.address).toBeTruthy();
        expect(user.phone).toBeTruthy();

        // Validate nested structures
        expect(user.name).toHaveProperty('firstname');
        expect(user.name).toHaveProperty('lastname');
        expect(user.address).toHaveProperty('city');
        expect(user.address).toHaveProperty('street');
        expect(user.address).toHaveProperty('zipcode');

        console.log('✓ User retrieved successfully');
        console.log(`✓ Name: ${user.name.firstname} ${user.name.lastname}`);
        console.log('✓ Email:', user.email);
        console.log('✓City:', user.address.city);
    });

    test('should get carts for a specific user', async ({ request }) => {
        const userId = 1;

        const response = await request.get(`${BASE_URL}/carts/user/${userId}`);
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);

        const carts: Cart[] = await response.json();
        expect(Array.isArray(carts)).toBeTruthy();

        // Validate that all carts belong to the user
        carts.forEach(cart => {
            expect(cart.userId).toBe(userId);
        });

        console.log(`✓ Retrieved ${carts.length} carts for user ${userId}`);

        if (carts.length > 0) {
            console.log('✓ First cart date:', carts[0].date);
            console.log('✓ Products in first cart:', carts[0].products.length);
        }

    })
})