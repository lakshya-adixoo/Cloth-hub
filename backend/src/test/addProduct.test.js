import { addProduct } from "../controller/productController.js";
import * as database from "../datasource/connect.database.js";

describe("addProduct Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Product",
        price: 19.99,
        description: "A sample product",
        category: "Test Category",
        image: "image.jpg",
        rating_rate: 4.5,
        rating_count: 100
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should add a product and return 201", async () => {
    const mockProduct = { id: 1, ...req.body };
    database.ProductModel = {
      create: jest.fn().mockResolvedValue(mockProduct),
    };

    await addProduct(req, res);

    expect(database.ProductModel.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Product added successfully",
      product: mockProduct,
    });
  });

  it("should return 500 if ProductModel is not initialized", async () => {
    database.ProductModel = undefined;

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error",
      })
    );
  });

  it("should return 500 if create throws an error", async () => {
    database.ProductModel = {
      create: jest.fn().mockRejectedValue(new Error("Create failed")),
    };

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error",
      })
    );
  });
});
