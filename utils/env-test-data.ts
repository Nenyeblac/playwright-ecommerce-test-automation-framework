// Load environment variables
import * as dotenv from 'dotenv';

dotenv.config();

export const SauceDemoUsers = {

    Valid_Users: {
        standard: {
            username: process.env.SAUCEDEMO_STANDARD_USER || 'standard_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },

        problem: {
            username: process.env.SAUCEDEMO_PROBLEM_USER || 'problem_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },
        
        performance: {
            username: process.env.SAUCEDEMO_PERFORMANCE_USER || 'performance_glitch_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },
        
        error: {
            username: process.env.SAUCEDEMO_ERROR_USER || 'error_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },
        
        visual: {
            username: process.env.SAUCEDEMO_VISUAL_USER || 'visual_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        }
        
    },
    
    Invalid_Users: {
        locked: {
            username: process.env.SAUCEDEMO_LOCKED_USER || 'locked_out_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },
        invalid_username: {
            username: process.env.SAUCEDEMO_WRONG_USERNAME || 'invalid_user',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },
        invalid_password: {
            username: process.env.SAUCEDEMO_STANDARD_USER || 'standard_user',
            password: process.env.SAUCEDEMO_WRONG_PASSWORD || 'wrong_password'
        },
        empty_username: {
            username: process.env.SAUCEDEMO_EMPTY_USERNAME|| '',
            password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce'
        },
        empty_password: {
            username: process.env.SAUCEDEMO_STANDARD_USER|| 'standard_user',
            password:process.env.SAUCEDEMO_EMPTY_PASSWORD || ''
        },
        both_empty: {
            username: process.env.SAUCEDEMO_EMPTY_USERNAME || '',
            password: process.env.SAUCEDEMO_EMPTY_PASSWORD || ''
        }
    }
    
};

export const TestURLs = {

    sauceDemo: process.env.BASE_URL || 'https://www.saucedemo.com'
};

export const APIEndpoints = {

    jsonPlaceholder: process.env.JSONPLACEHOLDER_API || 'https://jsonplaceholder.typicode.com',
    fakeStoreAPI: process.env.FAKESTOREAPI_URL || 'https://fakestoreapi.com',
    reqres: process.env.REQRES_API || 'https://reqres.in/api'
};