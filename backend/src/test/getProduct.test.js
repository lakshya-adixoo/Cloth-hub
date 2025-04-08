import { getProduct } from "../controller/productController.js";
import * as db from "../datasource/connect.database.js";

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getProduct Controller", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should return 200 and list of products", async () => {
    const mockProducts = [
      { id: 1, name: "Product A" },
      { id: 2, name: "Product B" },
    ];


    db.ProductModel = { findAll: jest.fn().mockResolvedValue(mockProducts) };

    const req = {};
    const res = mockRes();

    await getProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      Products: mockProducts,
    });
  });

  it("should return 500 if ProductModel is not initialized", async () => {
    db.ProductModel = undefined;

    const req = {};
    const res = mockRes();

    await getProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error",
      })
    );
  });

  it("should return 500 if ProductModel.findAll throws an error", async () => {
    db.ProductModel = {
      findAll: jest.fn().mockRejectedValue(new Error("Database error")),
    };

    const req = {};
    const res = mockRes();

    await getProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Internal server error",
      })
    );
  });
});
