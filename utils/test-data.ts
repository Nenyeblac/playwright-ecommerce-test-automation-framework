// Centralised test data management for all test suites

export class TestData {

    // Saucedemo valid users
    static readonly USERS = {
        STANDARD: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        LOCKED: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        },
        PROBLEM: {
            username: 'problem_user',
            password: 'secret_sauce'
        },
        PERFORMANCE: {
            username: 'performance_glitch_user',
            password: 'secret_sauce'
        },
        VISUAL: {
            username: 'visual_user',
            password: 'secret_sauce'
        },
        ERROR: {
            username: 'error_user',
            password: 'secret_sauce'
        },

    };

    // Saucedemo invalid users
    static readonly INVALID_USERS = {
        WRONG_USERNAME: {
            username: 'invalid_user',
            password: 'secret_sauce'
        },
        WRONG_PASSWORD: {
            username: 'standard_user',
            password: 'wrong_password'
        },
        EMPTY_USERNAME: {
            username: '',
            password: 'secret_sauce'
        },
        EMPTY_PASSWORD: {
            username: 'standard_user',
            password: ''
        },
        BOTH_EMPTY: {
            username: '',
            password: ''
        }
    };

    // Product data
    static readonly PRODUCTS = {
        BACKPACK: {
            name: 'Sauce Labs Backpack',
            price: '$29.99'
        },
        BIKE_LIGHT: {
            name: 'Sauce Labs Bike Light',
            price: '$9.99'
        },
        BOLT_TSHIRT: {
            name: 'Sauce Labs Bolt T-Shirt',
            price: '$15.99'
        },
        FLEECE_JACKET: {
            name: 'Sauce Labs Fleece Jacket',
            price: '$49.99'
        },
        ONESIE: {
            name: 'Sauce Labs Onesie',
            price: '$7.99'
        },
        TSHIRT_RED: {
            name: 'Test.allTheThings() T-Shirt (Red)',
            price: '$15.99'
        }
    };

    // Checkout information
    static readonly CHECKOUT_INFO = {
        VALID: {
            firstName: 'John',
            lastName: 'Doe',
            postCode: '12345'
        },
        MISSING_FIRSTNAME: {
            firstName: '',
            lastName: 'Doe',
            postCode: '12345'
        },
        MISSING_LASTNAME: {
            firstName: 'John',
            lastName: '',
            postCode: '12345'
        },
        MISSING_POSTCODE: {
            firstName: 'John',
            lastName: 'Doe',
            postCode: ''
        }
    };

    // API test data
    static readonly API_USERS = {
        VALID: {
            email: 'test@example.com',
            password: 'testpassword123'
        },
        INVALID: {
            email: 'invalid@example.com',
            password: 'wrongpassword'
        },
    };

    // Helper methods
    static generateRandomEmail(): string {
        const timestamp = Date.now();
        return `test${timestamp}@example.com`;
    };

    static generateRandomUsername(): string {
        const timestamp = Date.now();
        return `users${timestamp}`;
    };

    static getCurrentDate(): string {
        return new Date().toISOString().split('T')[0];
    };

    static getFutureDate(daysFromNow: number): string {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    };
}

export default TestData;