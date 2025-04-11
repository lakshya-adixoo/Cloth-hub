import { LoginPage } from "../controller/userController.js";
import { UserModel } from "../datasource/connect.database.js";
import bcrypt from "bcryptjs";

jest.mock("../datasource/connect.database.js", () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock("bcryptjs");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("LoginPage controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email or password is missing", async () => {
    const req = {
      body: {
        email: "",
        password: "",
      },
    };

    const res = mockResponse();

    await LoginPage(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Email and password are required",
    });
  });

  it("should return 404 if user not found", async () => {
    const req = {
      body: {
        email: "notfound@example.com",
        password: "password123",
      },
    };
    const res = mockResponse();

    UserModel.findOne.mockResolvedValue(null);

    await LoginPage(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      where: { email: "notfound@example.com" },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found",
    });
  });

  it("should return 401 if password does not match", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "wrongPassword",
      },
    };
    const res = mockResponse();

    UserModel.findOne.mockResolvedValue({
      id: 1,
      email: "test@example.com",
      password: "hashedPwd",
    });
    bcrypt.compare.mockResolvedValue(false);

    await LoginPage(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith("wrongPassword", "hashedPwd");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid email or password",
    });
  });

  it("should return 200 on successful login", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "correctPassword",
      },
    };

    const res = mockResponse();

    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "hashedPwd",
    };

    UserModel.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await LoginPage(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Login successful",
      user: {
        id: mockUser.id,
        email: mockUser.email,
      },
    });
  });

  it("should handle internal server error", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    const res = mockResponse();

    UserModel.findOne.mockRejectedValue(new Error("DB Error"));

    await LoginPage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
      err: expect.any(Error),
    });
  });
});
