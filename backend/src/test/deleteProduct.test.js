import { deleteProduct } from "../controller/productController.js";
import * as database from "../datasource/connect.database.js";

describe("deleteProduct Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "1" },
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

  it("should delete product successfully and return 200", async () => {
    database.ProductModel = {
      destroy: jest.fn().mockResolvedValue(1), 
    };

    await deleteProduct(req, res);

    expect(database.ProductModel.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Product deleted successfully",
    });
  });

  it("should return 404 if product not found", async () => {
    database.ProductModel = {
      destroy: jest.fn().mockResolvedValue(0), 
    };

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Product not found",
    });
  });

  it("should return 500 on internal error", async () => {
    database.ProductModel = {
      destroy: jest.fn().mockRejectedValue(new Error("DB error")),
    };

    await deleteProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error",
      })
    );
  });
});
