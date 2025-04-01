import { signupPage } from "../controller/userController"; 
import { UserModel } from "../datasource/connect.database";
import express from "express";
import request from "supertest";

jest.mock("../datasource/connect.database", () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.post("/signup", signupPage);

describe("Signup Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test("should create a new user when email does not exist", async () => {
    UserModel.findOne.mockResolvedValue(null);

    UserModel.create.mockResolvedValue({
      email: "test@example.com",
      password: "password123",
    });

    const response = await request(app)
      .post("/signup")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User added successfully");
    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
    expect(UserModel.create).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
  });

  test("should return a 200 status if the user already exists", async () => {
    UserModel.findOne.mockResolvedValue({
      email: "test@example.com",
    });

    const response = await request(app)
      .post("/signup")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User already exists");
    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
  });

  test("should return a 500 status if there is an error", async () => {
    UserModel.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post("/signup")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Internal server error");
    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
  });
});
