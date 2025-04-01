import { LoginPage } from "../controller/userController";
 import { UserModel } from "../datasource/connect.database";
 import express from "express";
 import request from "supertest";
 
 jest.mock("../datasource/connect.database", () => ({
   UserModel: {
     findOne: jest.fn(),
   },
 }));
 
 const app = express();
 app.use(express.json());
 app.post("/login", LoginPage);
 
 describe("Login Controller", () => {
   afterEach(() => {
     jest.clearAllMocks();
   });
 
   test("should return 400 if email or password is missing", async () => {
     const response = await request(app)
       .post("/login")
       .send({ email: "test@example.com" });
 
     expect(response.status).toBe(400);
     expect(response.body.success).toBe(false);
     expect(response.body.message).toBe("Email and password are required");
   });
 
   test("should return 404 if user is not found", async () => {
     UserModel.findOne.mockResolvedValue(null);
 
     const response = await request(app)
       .post("/login")
       .send({ email: "test@example.com", password: "password123" });
 
     expect(response.status).toBe(404);
     expect(response.body.success).toBe(false);
     expect(response.body.message).toBe("User not found");
   });
 
   test("should return 401 if password is incorrect", async () => {
     UserModel.findOne.mockResolvedValue({
       id: 1,
       email: "test@example.com",
       password: "wrongpassword",
     });
 
     const response = await request(app)
       .post("/login")
       .send({ email: "test@example.com", password: "password123" });
 
     expect(response.status).toBe(401);
     expect(response.body.success).toBe(false);
     expect(response.body.message).toBe("Invalid email or password");
   });
 
   test("should return 200 and user data if login is successful", async () => {
     UserModel.findOne.mockResolvedValue({
       id: 1,
       email: "test@example.com",
       password: "password123",
     });
 
     const response = await request(app)
       .post("/login")
       .send({ email: "test@example.com", password: "password123" });
 
     expect(response.status).toBe(200);
     expect(response.body.success).toBe(true);
     expect(response.body.message).toBe("Login successful");
     expect(response.body.user).toEqual({ id: 1, email: "test@example.com" });
   });
 
   test("should return 500 if there is a server error", async () => {
     UserModel.findOne.mockRejectedValue(new Error("Database error"));
 
     const response = await request(app)
       .post("/login")
       .send({ email: "test@example.com", password: "password123" });
 
     expect(response.status).toBe(500);
     expect(response.body.success).toBe(false);
     expect(response.body.message).toBe("Internal server error");
   });
 });