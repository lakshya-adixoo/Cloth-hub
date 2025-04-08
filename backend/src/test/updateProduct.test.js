import { updateProduct } from "../controller/productController.js";
import * as database from "../datasource/connect.database.js";

describe("updateProduct Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {
        title: "Updated Product",
        price: 100,
        description: "Updated description",
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

  it("should update product successfully and return 200", async () => {
    database.ProductModel = {
      update: jest.fn().mockResolvedValue([1]), 
      findOne: jest.fn().mockResolvedValue({
        id: "1",
        title: "Updated Product",
        price: 100,
        description: "Updated description",
      }),
    };

    await updateProduct(req, res);

    expect(database.ProductModel.update).toHaveBeenCalledWith(req.body, { where: { id: "1" } });
    expect(database.ProductModel.findOne).toHaveBeenCalledWith({ where: { id: "1" } });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Product updated successfully",
      product: {
        id: "1",
        title: "Updated Product",
        price: 100,
        description: "Updated description",
      },
    });
  });

  it("should return 404 if product not found or not updated", async () => {
    database.ProductModel = {
      update: jest.fn().mockResolvedValue([0]), 
    };

    await updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Product not found or no changes applied",
    });
  });

  it("should return 500 on internal server error", async () => {
    database.ProductModel = {
      update: jest.fn().mockRejectedValue(new Error("DB failure")),
    };

    await updateProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error",
      })
    );
  });
});
