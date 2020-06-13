const request = require('supertest');
const express = require('express');
const server = require('../api/server');
const db = require("../database/dbConfig");
const Users = require("../users/users-model");

describe('auth stuff', () => {
    const new_user1 = { username: "EricTest", password: "password123"};
    const new_user2 = { username: "EricTest2", password: "password321"};

    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('users').truncate();
      });
      
      
    describe("Registration", () => {
        it("should give back the created user name", async () => {
            return await request(server).post('/api/auth/register').send(new_user1).then(res => {test = expect(res.body.created_user.username).toBe(new_user1.username)});
        });

        it("should return status 201", async () => {
            return await request(server).post('/api/auth/register').send(new_user1).then(res => expect(res.status).toBe(201));
        });
    });

    describe("Login", () => {
        it("should give back the user name", async () => {
            await request(server).post('/api/auth/register').send(new_user2);
            return await request(server).post('/api/auth/login').send(new_user2).then(res => expect(res.body.username).toBe(new_user2.username));
        });

        it("return status 200", async () => {
            await request(server).post('/api/auth/register').send(new_user2);
            return await request(server).post('/api/auth/login').send(new_user2).then(res => expect(res.status).toBe(200));
        });
    });
})
