// // ✅ Declare mockCreate before using it
// const mockCreate = jest.fn();

// // ✅ Mock productSchema
// jest.mock('../model/productSchema.js', () => ({
//   __esModule: true,
//   default: {
//     create: mockCreate,
//   }
// }));

// // ✅ Import after the mock is declared
// import { addProduct } from '../controller/productController.js';
// import * as ProductModelModule from '../model/productSchema.js';
// ProductModelModule.default = { create: mockCreate };

// describe('addProduct controller', () => {
//   let req;
//   let res;

//   beforeEach(() => {
//     req = {
//       body: {
//         title: 'Test Product',
//         price: 99.99,
//         description: 'This is a test product.',
//         category: 'electronics',
//         image: 'http://example.com/test.jpg',
//         rating_rate: 4.5,
//         rating_count: 100,
//       },
//     };

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     mockCreate.mockReset();
//   });

//   it('should return 201 and the created product on success', async () => {
//     const mockProduct = { id: 1, ...req.body };
//     mockCreate.mockResolvedValue(mockProduct);

//     await addProduct(req, res);

//     expect(mockCreate).toHaveBeenCalledWith(req.body);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: 'Product added successfully',
//       product: mockProduct,
//     });
//   });

//   it('should return 500 if an error occurs during creation', async () => {
//     const mockError = new Error('Database error');
//     mockCreate.mockRejectedValue(mockError);

//     await addProduct(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Internal server error',
//       err: mockError,
//     });
//   });
// });
