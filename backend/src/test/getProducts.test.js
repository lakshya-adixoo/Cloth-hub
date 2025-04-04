// const mockFindAll = jest.fn();

// jest.mock('../model/productSchema.js', () => ({
//   __esModule: true,
//   default: {
//     findAll: mockFindAll,
//   },
// }));

// import { getProduct } from '../controller/productController.js';
// import * as ProductModelModule from '../model/productSchema.js';
// ProductModelModule.default = { findAll: mockFindAll };

// describe('getProduct controller', () => {
//   let req;
//   let res;

//   beforeEach(() => {
//     req = {};

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     mockFindAll.mockReset();
//   });

//   it('should return 200 and a list of products on success', async () => {
//     const mockProducts = [
//       { id: 1, title: 'Product A' },
//       { id: 2, title: 'Product B' },
//     ];

//     mockFindAll.mockResolvedValue(mockProducts);

//     await getProduct(req, res);

//     expect(mockFindAll).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       Products: mockProducts,
//     });
//   });

//   it('should return 500 and error message if an error occurs', async () => {
//     const error = new Error('DB error');
//     mockFindAll.mockRejectedValue(error);

//     await getProduct(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Internal server error',
//       err: error,
//     });
//   });
// });
