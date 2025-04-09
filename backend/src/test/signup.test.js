import { signupPage } from '../controller/userController.js'; 
import { UserModel } from '../datasource/connect.database.js';
import bcrypt from 'bcryptjs';

jest.mock('../datasource/connect.database.js', () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcryptjs');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('signupPage controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user if not exists', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = mockResponse();

    UserModel.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    UserModel.create.mockResolvedValue({ id: 1, email: 'test@example.com' });

    await signupPage(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(UserModel.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'hashedPassword123' });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'User added successfully',
      newUser: { id: 1, email: 'test@example.com' },
    });
  });

  it('should return 200 and message if user already exists', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = mockResponse();

    UserModel.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

    await signupPage(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'User already exists',
    });
  });

  it('should handle internal server error', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = mockResponse();

    UserModel.findOne.mockRejectedValue(new Error('DB error'));

    await signupPage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      msg: 'Internal server error',
      err: expect.any(Error),
    });
  });
});
