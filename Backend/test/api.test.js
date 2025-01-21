const request = require('supertest');
const app = require('../index');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzdhNDRkYjE1ZGNiMDU4MmYyNjc3YSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTkxMTY5MTd9.PW_sApOco2ixoGNxvPA6bIBllk43xGg802nIgvEM2_c'

describe('Testing API', () => {
    it('GET /test | Response with text', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('Test API is Working!...');
    });

    //Register
    it('POST /api/user/register | Response with body', async () => {
        const response = await request(app).post('/api/user/register').send({
            "fname": "John",
            "lname": "Doe",
            "email": "John@gmail.com",
            "phone": "1234567890",
            "height": "170",
            "weight": "70",
            "age": "25",
            "gender": "male",
            "password": "123456",
            "confirmPassword": "123456"
        });

        //if condition:
        if (!response.body.success) {
            expect(response.body.message).toEqual('User Already Exists!');
        } else {
            expect(response.body.message).toEqual('User Created Successfully!');
        }
    })

    //Login testing
    it('POST api/user/login | Response with body', async () => {
        const response = await request(app).post('/api/user/login').send({
            "email": "John@gmail.com",
            "password": "123456"
        });

        //if condition:
        if (!response.body.success) {
            expect(response.body.message).toEqual("User doesn't exist!!");
        } else {
            expect(response.body.message).toEqual("User Logged in Successfully");
            expect(response.body.userData.fname).toEqual("John");
        }
    })

    //Get All Exercises
    it('GET /api/exercise/get_all_exercises | Fetch all exercises', async () => {
        const response = await request(app).get('/api/exercise/get_all_exercises').set('authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

    //Get All Meals
    it('GET /api/meal/get_all_meals | Fetch all meals', async () => {
        const response = await request(app).get('/api/meal/get_all_meals').set('authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    })

    //Get single exercise
    it('GET /api/exercise/get_single_exercise | Fetch single exercise', async () => {
        const response = await request(app).get('/api/exercise/get_single_exercise/60f7b3b3b3b3b3b3b3b3b3b3').set('authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(404);
    })

})

